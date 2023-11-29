import { CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

export abstract class AdminData {
  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;

  @Column({ nullable: true, default: '' })
  createdBy: string;

  @Column({ nullable: true, default: '' })
  updatedBy: string;
}
