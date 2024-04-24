import { AdminData } from '../common.mock.data';

export const EmployeesDTO = {
  name: 'Vijay Babu Krishnan',
  email: 'vijay.babu.krishnan@sap.com',
  btpUserId: '77b23468-e702-4f0a-af19-50bfe78cd304',
};

export const EmployeesResponse = {
  id: '123',
  ...EmployeesDTO,
  ...AdminData,
};

export const EmployeesResponseDto = {
  id: '123',
  ...EmployeesDTO,
  adminData: AdminData,
};
