import { JCStatus, SFStatus } from './enums';

export interface RegisteredProduct {
  vehicleNumber: string;
  dateOfPurchase: string;
  model: string;
}

interface InspectionItem {
  id: string;
  description: string;
  isSelected: boolean;
}

interface ServiceProposed {
  id: string;
  service: string;
  price: string;
  isSelected: boolean;
}

export interface CustomerDetails {
  name: string;
  contactNumber: string;
  serviceAdvisor: string;
}

interface CommonFields {
  caseId: string;
  caseDisplayId: string;
  registeredProduct: RegisteredProduct;
  milometer: number;
}

export interface ServiceFormType extends CommonFields {
  inspectionItems: InspectionItem[];
  servicesProposed: ServiceProposed[];
  notes?: string[];
  customerComplaints?: string[];
  status: SFStatus;
}

export interface JobCardType extends CommonFields {
  estimatedCompletionDate: Date;
  servicesSelected: any;
  customerComplaints: string[];
  status: JCStatus;
}

export interface CodeList {
  code: string;
  description: string;
}

export interface ValidationErrorObjectType {
  code: string;
  message: string;
  target: string;
}
