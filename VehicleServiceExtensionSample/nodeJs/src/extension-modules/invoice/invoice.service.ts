import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { map, lastValueFrom } from 'rxjs';
import { CasesService } from '../../cns-modules/cases/cases.service';
import { ServerException } from '../../common/filters/server-exception';
import { DocumentServiceApi } from '../common/open-api/client/document-service/document-service-api';
import { UtilsService } from '../../utils/utils.service';
import { JobCardService } from '../job-card/job-card.service';
import { MESSAGES, SESSION } from '../../common/constants';
import { REQUEST } from '@nestjs/core';
// eslint-disable-next-line
const PDFDocument = require('pdfkit-table');

@Injectable()
export class InvoiceService {
  private sscDestination: string;
  private userToken: string;
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private jobCardService: JobCardService,
    private httpService: HttpService,
    private caseService: CasesService,
    private utilService: UtilsService,
  ) {
    this.sscDestination = this.request[SESSION].sscDestination;
    this.userToken = this.request[SESSION].userToken;
  }
  private caseDisplayId: string;

  // Generate invoice using PDF document
  async generateInvoice(query): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise(async (resolve, reject) => {
      try {
        const result = await this.jobCardService.findAll(query, true);
        if (!result || result.length === 0) {
          return reject(new Error(MESSAGES.JOBCARD_NOT_FOUND));
        }
        const jobCard = result[0];
        const doc = new PDFDocument({
          size: 'C3',
          bufferPages: true,
        });
        this.caseDisplayId = jobCard.caseDisplayId;
        doc.fontSize(18).font('Times-Bold').text('Vehicle Service - Invoice', {
          align: 'center',
          underline: true,
        });
        doc.moveDown();
        doc.fontSize(13).font('Times-Roman');
        doc.text(
          `ID - ${jobCard.displayId}        External ID - ${
            jobCard.caseDisplayId
          }       Date of Purchase - ${this.utilService.getDateTime(
            jobCard.registeredProduct['dateOfPurchase'],
          )}`,
        );
        doc.moveDown();
        doc.text(
          `Created On - ${this.utilService.getDateTime(
            jobCard.createdOn,
          )}       Estimated Completion Date - ${this.utilService.getDateTime(
            jobCard.estimatedCompletionDate,
          )}`,
        );
        doc.moveDown();
        doc.font('Times-Bold').text('Vehicle:');
        doc
          .font('Times-Roman')
          .text(
            `Model - ${jobCard.registeredProduct['model']}      VIN - ${jobCard.registeredProduct['vehicleNumber']}       Milometer - ${jobCard['milometer']}`,
          );
        doc.moveDown();
        doc.font('Times-Bold').text('Customer:');
        doc
          .font('Times-Roman')
          .text(
            `Customer - ${jobCard.customerDetails['name']}       Contact - ${jobCard.customerDetails['contactNumber']}`,
          );
        doc.moveDown();
        doc.text(`Service Advisor - ${jobCard.serviceAdvisor}`);
        doc.moveDown();
        doc.fontSize(16).font('Times-Bold').text('Service Selected:');
        doc.moveDown(0.5);
        const services = [];
        let totalPrice = 0;
        jobCard.servicesSelected.forEach((item, index) => {
          const arr = [
            index + 1,
            item.service ? item.service : '-',
            item.technician ? item.technician.name : '-',
            item.status ? item.status : '-',
            this.utilService.getDateTime(item.startTime),
            this.utilService.getDateTime(item.endTime),
            item.notes ? item.notes : '-',
            item.observation ? item.observation : '-',
            item.price ? item.price : '-',
          ];
          services.push(arr);
          if (item.price) {
            totalPrice += Number(item.price);
          }
        });

        const complaints = [];
        if (Array.isArray(jobCard.customerComplaints)) {
          jobCard.customerComplaints.forEach((item) => {
            if (item.trim()) {
              complaints.push(item);
            }
          });
        }
        const tableJson = {
          headers: [
            {
              label: 'S.No',
              property: 'sNo',
              width: 50,
            },
            {
              label: 'Service Description',
              property: 'serviceDesc',
              width: 100,
            },
            {
              label: 'Assigned Technician',
              property: 'assignedTech',
              width: 100,
            },
            { label: 'Status', property: 'status', width: 100 },
            { label: 'Start Date/Time', property: 'startDate', width: 100 },
            { label: 'End Date/Time', property: 'endDate', width: 100 },
            { label: 'Notes', property: 'notes', width: 100 },
            { label: 'Observation', property: 'observation', width: 100 },
            { label: 'Price', property: 'price', width: 100 },
          ],
          rows: services,
          options: {
            width: 300,
          },
        };
        doc.table(tableJson);
        if (complaints.length) {
          doc.fontSize(15).font('Times-Bold').text('Customer complaints:-');
          doc.fontSize(13).font('Times-Roman').list(complaints);
        }
        doc.moveDown();
        doc
          .fontSize(15)
          .font('Times-Bold')
          .text(`Total (Rs) = ${Math.round(totalPrice)}`, {
            align: 'right',
          });
        const buffer = [];
        doc.on('data', buffer.push.bind(buffer));
        doc.on('end', () => {
          const data = Buffer.concat(buffer);
          resolve(data);
        });
        doc.end();
      } catch (error) {
        reject(new Error(MESSAGES.ERR_IN_INVOICE));
      }
    });
    return pdfBuffer;
  }

  // Create new document by using document service
  async createDocument(docData: Record<string, any>) {
    try {
      const responseData =
        await DocumentServiceApi.createdocumentserviceDocument(docData).execute(
          {
            destinationName: this.sscDestination,
            jwt: this.userToken,
          },
        );
      return responseData;
    } catch (error) {
      const docError = new Error(
        error.response?.data?.error?.message || error.message,
      );
      throw new ServerException(
        docError,
        InvoiceService.name,
        this.createDocument.name,
      );
    }
  }

  // Upload the created document using uploadUrl
  async uploadDocument(file: Buffer, uploadUrl: string): Promise<any> {
    const oRequestConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/pdf',
      },
    };

    try {
      const uploadDocResponse = await lastValueFrom(
        this.httpService.put(uploadUrl, file, oRequestConfig).pipe(
          map((response) => {
            return response?.status;
          }),
        ),
      );
      return uploadDocResponse;
    } catch (error) {
      throw new ServerException(
        error,
        InvoiceService.name,
        this.uploadDocument.name,
      );
    }
  }

  // Update the created document with Case
  async updateCaseWithInvoice(caseId: string, createDocResult: any) {
    try {
      const docId = createDocResult.value.id;
      const updateAttachment = {
        attachments: [{ id: docId }],
      };

      const updateCaseResult = await this.caseService.updateCase(
        caseId,
        updateAttachment,
      );
      return updateCaseResult;
    } catch (error) {
      throw new ServerException(
        error,
        InvoiceService.name,
        this.updateCaseWithInvoice.name,
      );
    }
  }

  // Generate and attach the invoice document with case
  async createInvoice(query) {
    try {
      const result = await this.generateInvoice(query);
      if (result && result instanceof Buffer) {
        const docData = {
          category: 'DOCUMENT',
          fileName: `vehicle_invoice_${this.caseDisplayId}.pdf`,
          isSelected: false,
          type: '10001',
        };
        const createDocResult = await this.createDocument(docData);
        if (createDocResult.value?.uploadUrl) {
          const uploadDocStatus = await this.uploadDocument(
            result,
            createDocResult.value.uploadUrl,
          );

          let updateCase = false;
          if (uploadDocStatus === 200) {
            const updateCaseRes = await this.updateCaseWithInvoice(
              query.caseId,
              createDocResult,
            );
            updateCase = updateCaseRes.value?.attachments ? true : false;
          }
          return { status: updateCase };
        }
      }
      return result;
    } catch (error) {
      throw new ServerException(
        error,
        InvoiceService.name,
        this.createInvoice.name,
      );
    }
  }
}
