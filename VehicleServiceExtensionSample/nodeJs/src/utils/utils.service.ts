import { Injectable } from '@nestjs/common';
import { MESSAGES, CUSTOM_LOGIC_ERROR_CODE } from '../common/constants';
import { ValidationErrorObjectType } from '../extension-modules/common/interfaces';
import { ServerException } from '../common/filters/server-exception';
import { IsNull, Not } from 'typeorm';

@Injectable()
export class UtilsService {
  stringifyServiceFormDto(oServiceForm) {
    if (oServiceForm.servicesProposed) {
      oServiceForm.servicesProposed = JSON.stringify(
        oServiceForm.servicesProposed,
      );
    }
    if (oServiceForm.inspectionItems) {
      oServiceForm.inspectionItems = JSON.stringify(
        oServiceForm.inspectionItems,
      );
    }
    if (oServiceForm.customerComplaints) {
      oServiceForm.customerComplaints = JSON.stringify(
        oServiceForm.customerComplaints,
      );
    }
    if (oServiceForm.notes) {
      oServiceForm.notes = JSON.stringify(oServiceForm.notes);
    }
    return oServiceForm;
  }

  getCustomLogicErrorDetails(
    error: Array<ValidationErrorObjectType>,
    target: string,
    message: string,
  ) {
    error.push({
      code: `${CUSTOM_LOGIC_ERROR_CODE.CASE_SERVICE}.${target}`,
      message: message ? message : MESSAGES.CASE_STATUS_DISABLED,
      target: target ? `caseId/${target}` : '',
    });
    return error;
  }

  getDateTime(dateStr: string | Date) {
    if (dateStr) {
      const date = new Date(dateStr);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    } else {
      return '-';
    }
  }

  /**
   * Currently supporting only "eq" and "ne" operators
   */
  parseFilterString(filterString) {
    try {
      if (!filterString) {
        return {};
      }
      // Split the string by "eq"/"ne" and trim spaces
      const EqParts = filterString.split('eq').map((part) => part.trim());
      const NeParts = filterString.split('ne').map((part) => part.trim());

      const result = {};

      // Check if the split resulted in two parts
      if (EqParts.length === 2) {
        const { field, value } = this.processValue(EqParts);
        // Create and return the object
        result[field] = value;
      } else if (NeParts.length == 2) {
        const { field, value } = this.processValue(NeParts);
        // Create and return the object
        result[field] = Not(value);
      }
      return result;
    } catch (error) {
      throw new ServerException(
        error,
        UtilsService.name,
        this.parseFilterString.name,
      );
    }
  }

  processValue(parts) {
    const field = parts[0];
    let value = parts[1].replace(/["']/g, ''); // Remove surrounding double or single quotes and replace with single quotes

    // Convert the value to a number if it's numeric
    if (!isNaN(value)) {
      value = parseFloat(value);
    }

    if (value === 'null') {
      value = IsNull();
    }
    return { field, value };
  }
}
