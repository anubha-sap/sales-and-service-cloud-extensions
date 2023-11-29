import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DeleteResult, FindManyOptions } from 'typeorm';
import { InspectionItemDto } from './dto/inspection-item.dto';
import { UpdateInspectionItemDto } from './dto/update-inspection-item.dto';
import { InspectionItem } from './entities/inspection-item.entity';
import { ServerException } from '../../common/filters/server-exception';
import { MESSAGES, SESSION } from '../../common/constants';
import { InspectionItemsRepository } from './repository/inspection-items.repository';
import { InspectionItemResponseDto } from './dto/response-inspection-item.dto';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class InspectionItemsService {
  constructor(
    private readonly inspectionItemRepository: InspectionItemsRepository,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async create(createInspectionItem: InspectionItemDto) {
    let result: InspectionItem;
    try {
      const userId = this.request[SESSION].userId;
      const oInspectionItem = InspectionItem.toEntity(
        createInspectionItem,
        userId,
      );
      result = await this.inspectionItemRepository.save(oInspectionItem);
      return InspectionItemResponseDto.toDto(result);
    } catch (error) {
      throw new ServerException(
        error,
        InspectionItemsService.name,
        this.create.name,
      );
    }
  }

  async findAll(query?: FindManyOptions<InspectionItem>) {
    let result: InspectionItem[];
    try {
      result = await this.inspectionItemRepository.findAll(query);
    } catch (error) {
      throw new ServerException(
        error,
        InspectionItemsService.name,
        this.findAll.name,
      );
    }
    return result;
  }

  async findOne(id: string) {
    let result: InspectionItem;
    try {
      result = await this.inspectionItemRepository.findOne(id);
      return InspectionItemResponseDto.toDto(result);
    } catch (error) {
      throw new ServerException(
        error,
        InspectionItemsService.name,
        this.findOne.name,
      );
    }
  }

  async update(id: string, updateInspectionItemDto: UpdateInspectionItemDto) {
    let result: InspectionItem;
    try {
      if (Object.keys(updateInspectionItemDto).length === 0) {
        throw new InternalServerErrorException(MESSAGES.NO_UPDATE_DATA);
      }
      const userId = this.request[SESSION].userId;
      result = await this.inspectionItemRepository.update(
        id,
        updateInspectionItemDto,
        userId,
      );
    } catch (error) {
      throw new ServerException(
        error,
        InspectionItemsService.name,
        this.update.name,
      );
    }
    return InspectionItemResponseDto.toDto(result);
  }

  async remove(id: string) {
    let result: DeleteResult;
    try {
      result = await this.inspectionItemRepository.delete(id);
    } catch (error) {
      throw new ServerException(
        error,
        InspectionItemsService.name,
        this.remove.name,
      );
    }
    return result;
  }
}
