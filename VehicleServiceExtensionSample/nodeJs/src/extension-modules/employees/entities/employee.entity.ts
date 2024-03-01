import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoleCodes, Roles } from '../../common/enums';
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

  @Column()
  roleName: Roles;

  @Column()
  roleCode: RoleCodes;

  public static toEntity(oEmployee: EmployeeDto, createdBy: string) {
    return new Employee({
      btpUserId: oEmployee.btpUserId,
      email: oEmployee.email,
      name: oEmployee.name,
      roleCode: oEmployee.roleCode,
      createdBy: createdBy,
      roleName: this.getRoleName(oEmployee.roleCode),
    });
  }

  public static getRoleName(roleCode: RoleCodes) {
    if (roleCode === RoleCodes.R21) {
      return Roles.SERVICE_ADVISOR;
    } else if (roleCode === RoleCodes.R22) {
      return Roles.SERVICE_MANAGER;
    } else if (roleCode === RoleCodes.R23) {
      return Roles.SERVICE_TECHNICIAN;
    }
  }
}
