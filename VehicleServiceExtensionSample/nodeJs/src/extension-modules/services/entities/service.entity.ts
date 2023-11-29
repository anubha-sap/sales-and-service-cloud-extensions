import { Entity, Column } from 'typeorm';
import { ServicesColumns } from '../../common/classes/services';
import { ServicesDto } from '../dto/service.dto';

@Entity()
export class Services extends ServicesColumns {
  constructor(partial: Partial<Services>) {
    super();
    Object.assign(this, partial);
  }

  @Column()
  minMileage: number;

  @Column()
  maxMileage: number;

  @Column()
  isSelected: boolean;

  public static toEntity(service: ServicesDto, createdBy: string) {
    return new Services({
      service: service.service,
      price: service.price,
      minMileage: service.minMileage,
      maxMileage: service.maxMileage,
      isSelected: service.isSelected,
      createdBy: createdBy,
    });
  }
}
