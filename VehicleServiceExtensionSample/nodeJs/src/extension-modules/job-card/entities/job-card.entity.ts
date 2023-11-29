import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { JobCardServices } from './job-card-services.entity';
import { CommonColumns } from '../../common/classes/serviceform-jobcard';
import { JCStatus } from '../../common/enums';
import { JobCardType } from '../../common/interfaces';
import { ServiceForm } from '../../service-form/entities/service-form.entity';

@Entity()
export class JobCard extends CommonColumns {
  constructor(partial: Partial<JobCard>) {
    super();
    Object.assign(this, partial);
  }

  @OneToMany(() => JobCardServices, (service) => service.jobCard, {
    eager: true,
    cascade: true,
  })
  servicesSelected: JobCardServices[];

  @Column({ type: 'timestamp', default: '' })
  estimatedCompletionDate: Date;

  @Column()
  status: JCStatus;

  @OneToOne(() => ServiceForm, (serviceForm) => serviceForm.jobCard)
  serviceForm: ServiceForm;

  public static toEntity(oJobCard: JobCardType, createdBy: string) {
    return new JobCard({
      caseId: oJobCard.caseId,
      caseDisplayId: oJobCard.caseDisplayId,
      status: oJobCard.status,
      registeredProduct: JSON.stringify(oJobCard.registeredProduct),
      customerComplaints: JSON.stringify(oJobCard.customerComplaints),
      servicesSelected: oJobCard.servicesSelected,
      estimatedCompletionDate: oJobCard.estimatedCompletionDate,
      milometer: oJobCard.milometer,
      createdBy: createdBy,
    });
  }
}
