import { Column, Entity, ManyToOne } from 'typeorm';
import { JobCard } from './job-card.entity';
import { ServicesColumns } from '../../common/classes/services';
import { ServiceStatus } from '../../common/enums';
import { ApiResponseProperty } from '@nestjs/swagger';
import { AdminDataDto } from '../../../extension-modules/common/dto/admin-data.dto';

@Entity()
export class JobCardServices extends ServicesColumns {
  constructor(partial: Partial<JobCardServices>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ nullable: true })
  technician: string;

  @Column({ default: ServiceStatus.Z21 })
  status: ServiceStatus;

  @Column({ type: 'timestamp', nullable: true })
  startTime: string;

  @Column({ type: 'timestamp', nullable: true })
  endTime: string;

  @Column({ type: 'clob', nullable: true })
  notes: string;

  @Column({ type: 'clob', nullable: true })
  observation: string;

  @ManyToOne(() => JobCard, (jobCard) => jobCard.servicesSelected, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  jobCard: JobCard;

  @ApiResponseProperty()
  adminData: AdminDataDto;

  public static toEntity(oJobCardService) {
    return new JobCardServices({
      service: oJobCardService.service,
      price: oJobCardService.price,
      technician: oJobCardService.technician,
      status: oJobCardService.status,
      startTime: oJobCardService.startTime,
      endTime: oJobCardService.endTime,
      notes: oJobCardService.notes,
      observation: oJobCardService.observation,
    });
  }

  public static toDto(oJobCardService: JobCardServices) {
    return new JobCardServices({
      id: oJobCardService.id,
      service: oJobCardService.service,
      price: oJobCardService.price,
      technician: oJobCardService.technician,
      status: oJobCardService.status,
      startTime: oJobCardService.startTime,
      endTime: oJobCardService.endTime,
      notes: oJobCardService.notes,
      observation: oJobCardService.observation,
      adminData: new AdminDataDto({
        createdOn: oJobCardService.createdOn,
        updatedOn: oJobCardService.updatedOn,
        createdBy: oJobCardService.createdBy,
        updatedBy: oJobCardService.updatedBy,
      }),
    });
  }
}
