import { ServicesDto } from '../../../src/extension-modules/services/dto/service.dto';
import { AdminData } from '../common.mock.data';

export const ServicesMockDTO: ServicesDto = {
  service: 'engine oil, power steering fluid, coolant',
  minMileage: 10,
  maxMileage: 5000,
  price: '3299',
  isSelected: true,
};

export const ServicesResponse = {
  id: '123',
  ...ServicesMockDTO,
  ...AdminData,
};

export const ServicesResponseDTO = {
  id: '123',
  ...ServicesMockDTO,
  adminData: AdminData,
};
