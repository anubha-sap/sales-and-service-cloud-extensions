/* eslint-disable @typescript-eslint/no-empty-interface */
import { BaseRepositoryInterface } from '../../../common/repository/base/base-repository.interface';
import { Employee } from '../entities/employee.entity';

export interface EmployeesRepositoryInterface
  extends BaseRepositoryInterface<Employee> {}
