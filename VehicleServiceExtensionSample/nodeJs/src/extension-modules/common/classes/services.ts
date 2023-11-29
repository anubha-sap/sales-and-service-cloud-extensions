import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { AdminData } from '../entities/admin-data.entity';

export abstract class ServicesColumns extends AdminData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  service: string;

  @Column()
  price: string;
}
