import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { InspectionItemDto } from '../dto/inspection-item.dto';
import { AdminData } from '../../common/entities/admin-data.entity';
@Entity()
export class InspectionItem extends AdminData {
  constructor(partial: Partial<InspectionItem>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  isSelected: boolean;

  public static toEntity(
    oInspectionItem: InspectionItemDto,
    createdBy: string,
  ) {
    return new InspectionItem({
      description: oInspectionItem.description,
      isSelected: oInspectionItem.isSelected,
      createdBy: createdBy,
    });
  }
}
