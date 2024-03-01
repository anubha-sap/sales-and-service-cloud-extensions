import { EmployeesRepositoryInterface } from './employees.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { BaseRepository } from '../../../common/repository/base/base-repository';
import { Employee } from '../entities/employee.entity';
import { EmployeeResponseDto } from '../dto/response-employee.dto';
import { REQUEST } from '@nestjs/core';
import { SESSION } from '../../../common/constants';
import { CustomLogger } from '../../../logger/logger.service';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';

@Injectable()
export class EmployeesRepository
  extends BaseRepository<Employee>
  implements EmployeesRepositoryInterface
{
  private requestId: string;

  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    private readonly logger: CustomLogger,
  ) {
    super(employeeRepository);
    this.logger.setClassName(EmployeesRepository.name);
    this.requestId = this.request[SESSION].reqId;
  }

  public async findOneEmployee(id: string): Promise<EmployeeResponseDto> {
    const startTime = new Date().getTime();
    const result = await this.findOne(id);
    const endTime = new Date().getTime();
    this.logger.debug(
      `Time taken by request ${
        this.requestId
      } to get the employee ${id} from DB: ${
        (endTime - startTime) / 1000
      } seconds`,
    );
    return EmployeeResponseDto.toDto(result);
  }

  public async findAllEmployees(
    options?: FindManyOptions<Employee>,
  ): Promise<EmployeeResponseDto[]> {
    const startTime = new Date().getTime();
    const oEmployeesArray = await this.findAll(options);
    const endTime = new Date().getTime();
    this.logger.debug(
      `Time taken by request ${this.requestId} to get all employees from DB ${
        (endTime - startTime) / 1000
      } seconds`,
    );
    const oEmployees: Array<EmployeeResponseDto> = [];
    for (const oEmployee of oEmployeesArray) {
      oEmployees.push(EmployeeResponseDto.toDto(oEmployee));
    }
    return oEmployees;
  }

  public async updateEmployee(
    id: string,
    updateData: UpdateEmployeeDto,
    updatedBy: string,
  ): Promise<EmployeeResponseDto> {
    const startTime = new Date().getTime();
    const oUpdateData = await this.update(id, updateData, updatedBy);
    const endTime = new Date().getTime();
    this.logger.debug(
      `Time taken by request ${
        this.requestId
      } to update the employee ${id} in DB: ${
        (endTime - startTime) / 1000
      } seconds`,
    );
    return EmployeeResponseDto.toDto(oUpdateData);
  }
}
