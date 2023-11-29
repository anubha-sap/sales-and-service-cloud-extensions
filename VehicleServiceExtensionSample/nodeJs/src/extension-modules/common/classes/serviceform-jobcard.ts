import { PrimaryGeneratedColumn, Column, Generated } from 'typeorm';
import { AdminData } from '../entities/admin-data.entity';

export abstract class CommonColumns extends AdminData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @Generated('increment')
  displayId: number;

  @Column({ type: 'uuid', unique: true })
  caseId: string;

  @Column({ unique: true })
  caseDisplayId: string;

  @Column({ type: 'clob' })
  registeredProduct: string;

  @Column({ type: 'clob', nullable: true })
  customerComplaints: string;

  @Column()
  milometer: number;
}
