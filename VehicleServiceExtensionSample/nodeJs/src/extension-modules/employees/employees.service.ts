import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { EmployeeDto } from './dto/employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesRepository } from './repository/employees.repository';
import { REQUEST } from '@nestjs/core';
import { Employee } from './entities/employee.entity';
import { MESSAGES, SESSION } from '../../common/constants';
import { EmployeeResponseDto } from './dto/response-employee.dto';
import { ServerException } from '../../common/filters/server-exception';
import { DeleteResult, FindManyOptions, FindOptionsWhere } from 'typeorm';

@Injectable()
export class EmployeesService {
  private userId: string;

  constructor(
    private readonly employeesRepository: EmployeesRepository,
    @Inject(REQUEST) private readonly request: Request,
  ) {
    this.userId = this.request[SESSION].userId;
  }

  async create(createEmployeeDto: EmployeeDto) {
    let result: Employee;
    try {
      const oEmployee = Employee.toEntity(createEmployeeDto, this.userId);
      result = await this.employeesRepository.save(oEmployee);
      return EmployeeResponseDto.toDto(result);
    } catch (error) {
      throw new ServerException(error, EmployeesService.name, this.create.name);
    }
  }

  async findAll(
    query: FindOptionsWhere<Employee>[] | FindOptionsWhere<Employee>,
  ) {
    let oEmployees = new Array<EmployeeResponseDto>();
    try {
      const oQuery: FindManyOptions<Employee> = {
        where: query,
      };
      oEmployees = await this.employeesRepository.findAllEmployees(oQuery);
    } catch (error) {
      throw new ServerException(
        error,
        EmployeesService.name,
        this.findAll.name,
      );
    }
    return oEmployees;
  }

  async findOne(id: string) {
    let result: EmployeeResponseDto;
    try {
      result = await this.employeesRepository.findOneEmployee(id);
    } catch (error) {
      throw new ServerException(
        error,
        EmployeesService.name,
        this.findOne.name,
      );
    }
    return result;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    let result: EmployeeResponseDto;
    try {
      if (Object.keys(updateEmployeeDto).length === 0) {
        throw new InternalServerErrorException(MESSAGES.NO_UPDATE_DATA);
      }
      result = await this.employeesRepository.updateEmployee(
        id,
        updateEmployeeDto,
        this.userId,
      );
    } catch (error) {
      throw new ServerException(error, EmployeesService.name, this.update.name);
    }
    return result;
  }

  async remove(id: string) {
    let result: DeleteResult;
    try {
      result = await this.employeesRepository.delete(id);
    } catch (error) {
      throw new ServerException(error, EmployeesService.name, this.remove.name);
    }
    return result;
  }

  async getCurrentUserInfo() {
    try {
      return {
        userName: this.request[SESSION].userName,
        userId: this.request[SESSION].userId,
        scopes: this.request[SESSION].scopes,
      };
    } catch (error) {
      throw new ServerException(
        error,
        EmployeesService.name,
        this.getCurrentUserInfo.name,
      );
    }
  }
}
