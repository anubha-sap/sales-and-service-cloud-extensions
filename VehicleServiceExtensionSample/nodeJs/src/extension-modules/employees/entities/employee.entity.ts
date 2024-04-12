import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeDto } from '../dto/employee.dto';
import { AdminData } from '../../common/entities/admin-data.entity';

@Entity()
export class Employee extends AdminData {
  constructor(partial: Partial<Employee>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  btpUserId: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  public static toEntity(oEmployee: EmployeeDto, createdBy: string) {
    return new Employee({
      btpUserId: oEmployee.btpUserId,
      email: oEmployee.email,
      name: oEmployee.name,
      createdBy: createdBy,
    });
  }
}
