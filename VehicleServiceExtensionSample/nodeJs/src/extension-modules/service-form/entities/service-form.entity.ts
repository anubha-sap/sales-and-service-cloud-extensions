import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { CommonColumns } from '../../common/classes/serviceform-jobcard';
import { SFStatus } from '../../common/enums';
import { ServiceFormType } from '../../common/interfaces';
import { JobCard } from '../../job-card/entities/job-card.entity';

@Entity()
export class ServiceForm extends CommonColumns {
  constructor(partial: Partial<ServiceForm>) {
    super();
    Object.assign(this, partial);
  }
  @Column({ type: 'clob' })
  servicesProposed: string;

  @Column({ type: 'clob' })
  inspectionItems: string;

  @Column({ type: 'clob', nullable: true })
  notes: string;

  @Column()
  status: SFStatus;

  @OneToOne(() => JobCard, (jobCard) => jobCard.serviceForm, { eager: true })
  @JoinColumn()
  jobCard: JobCard;

  public static toEntity(oServiceForm: ServiceFormType, createdBy: string) {
    return new ServiceForm({
      caseId: oServiceForm.caseId,
      caseDisplayId: oServiceForm.caseDisplayId,
      status: oServiceForm.status,
      registeredProduct: JSON.stringify(oServiceForm.registeredProduct),
      servicesProposed: JSON.stringify(oServiceForm.servicesProposed),
      inspectionItems: JSON.stringify(oServiceForm.inspectionItems),
      notes: JSON.stringify(oServiceForm.notes),
      milometer: oServiceForm.milometer,
      createdBy: createdBy,
    });
  }
}
