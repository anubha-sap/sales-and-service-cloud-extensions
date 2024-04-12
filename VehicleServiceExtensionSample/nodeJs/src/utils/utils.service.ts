import { Injectable } from '@nestjs/common';
import { MESSAGES, CUSTOM_LOGIC_ERROR_CODE } from '../common/constants';
import { ValidationErrorObjectType } from '../extension-modules/common/interfaces';
import { ServerException } from '../common/filters/server-exception';
import { ILike, IsNull, Not } from 'typeorm';

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

  handleQueryParams($filter: string, $search: string) {
    if ($search) {
      return this.processSearchQuery($search);
    }
    if ($filter) {
      return this.processFilterQuery($filter);
    }
    return {};
  }

  processSearchQuery(sQuery: string) {
    sQuery = sQuery.replace(/["']/g, '');
    return [
      { displayId: Number(sQuery) || -1 },
      { vehicleNumber: ILike(`%${sQuery}%`) },
      { model: ILike(`%${sQuery}%`) },
      { status: ILike(`%${sQuery}%`) },
    ];
  }

  processFilterQuery(sQuery: string) {
    const oOrParts = sQuery.split('or').map((part: string) => part.trim());
    if (oOrParts.length > 1) {
      const oFinalQuery = [];
      for (let i = 0; i < oOrParts.length; i++) {
        oFinalQuery.push(this.parseFilterString(oOrParts[i]));
      }
      return oFinalQuery;
    }

    const oAndParts = sQuery.split('and').map((part: string) => part.trim());
    if (oAndParts.length > 1) {
      let oFinalQuery = {};
      for (let i = 0; i < oAndParts.length; i++) {
        oFinalQuery = Object.assign(
          oFinalQuery,
          this.parseFilterString(oAndParts[i]),
        );
      }
      return oFinalQuery;
    }

    return this.parseFilterString(sQuery);
  }

  /**
   * Currently supporting only "eq" and "ne" operators
   */
  parseFilterString(filterString: string) {
    try {
      // Split the string by "eq"/"ne" and trim spaces
      const EqParts = filterString
        .split('eq')
        .map((part: string) => part.trim());
      const NeParts = filterString
        .split('ne')
        .map((part: string) => part.trim());

      const cTParts = filterString
        .split('ct')
        .map((part: string) => part.trim());

      const result = {};

      // Check if the split resulted in two parts
      if (EqParts.length === 2) {
        if (EqParts[0].includes('.')) {
          return this.processNestedField(EqParts[0], EqParts[1]);
        }
        const { field, value } = this.processValue(EqParts);
        // Create and return the object
        result[field] = value;
      } else if (NeParts.length == 2) {
        const { field, value } = this.processValue(NeParts);
        // Create and return the object
        result[field] = Not(value);
      } else if (cTParts.length == 2) {
        const { field, value } = this.processValue(cTParts);
        // Create and return the object
        result[field] = ILike(`%${value}%`);
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

  processNestedField(field, value) {
    const fieldParts = field.split('.').map((part: string) => part.trim());
    value = value.replace(/[']/g, ''); // Remove surrounding single quotes
    let originalObj = {};
    let obj = {};
    originalObj = obj;
    for (let i = 0; i < fieldParts.length; i++) {
      if (i === fieldParts.length - 1) {
        obj[fieldParts[i]] = value;
      } else {
        obj[fieldParts[i]] = {};
      }
      obj = obj[fieldParts[i]];
    }
    return originalObj;
  }
}
