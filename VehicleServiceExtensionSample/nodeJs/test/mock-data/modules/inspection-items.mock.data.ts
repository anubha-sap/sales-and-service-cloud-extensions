import { InspectionItemDto } from '../../../src/extension-modules/inspection-items/dto/inspection-item.dto';
import { AdminData } from '../common.mock.data';

export const InspectionItemsDTO: InspectionItemDto = {
  description: 'Check for Tooltik',
  isSelected: false,
};

export const InspectionItemsResponse = {
  id: '123',
  ...InspectionItemsDTO,
  ...AdminData,
};

export const InspectionItemsResponseDTO = {
  id: '123',
  ...InspectionItemsDTO,
  adminData: AdminData,
};
