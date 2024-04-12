import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeeDto } from './dto/employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { QueryParamsDTO } from '../common/dto/query-param.dto';
import { UtilsService } from '../../utils/utils.service';
import { Scopes } from '../../common/decorators/scopes.decorator';
import { Scope } from '../common/enums';
import { AuthGuard } from '../../common/guards/auth-guard/auth.guard';

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly utilService: UtilsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @Scopes(Scope.MasterData)
  create(@Body() createEmployeeDto: EmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  findAll(@Query() { $filter }: QueryParamsDTO) {
    const oQuery = this.utilService.parseFilterString($filter);
    return this.employeesService.findAll(oQuery);
  }

  @Get('/currentUserInfo')
  findCurrentUser() {
    return this.employeesService.getCurrentUserInfo();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @Scopes(Scope.MasterData)
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Scopes(Scope.MasterData)
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Scopes(Scope.MasterData)
  remove(@Param('id') id: string) {
    return this.employeesService.remove(id);
  }
}
