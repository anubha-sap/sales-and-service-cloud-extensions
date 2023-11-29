import { ApiResponseProperty } from '@nestjs/swagger';
import { InspectionItemDto } from './inspection-item.dto';
import { AdminDataDto } from '../../../extension-modules/common/dto/admin-data.dto';
import { InspectionItem } from '../entities/inspection-item.entity';

export class InspectionItemResponseDto extends InspectionItemDto {
  constructor(partial: Partial<InspectionItemResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  adminData: AdminDataDto;

  public static toDto(inspectionItem: InspectionItem) {
    return new InspectionItemResponseDto({
      id: inspectionItem.id,
      description: inspectionItem.description,
      isSelected: inspectionItem.isSelected,
      adminData: new AdminDataDto({
        createdOn: inspectionItem.createdOn,
        updatedOn: inspectionItem.updatedOn,
        createdBy: inspectionItem.createdBy,
        updatedBy: inspectionItem.updatedBy,
      }),
    });
  }
}
