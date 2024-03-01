export enum SFStatus {
  Z01 = 'Z01', //Draft
  Z02 = 'Z02', //Booked
}

export enum JCStatus {
  Z11 = 'Z11', //Booked
  Z12 = 'Z12', //In Progress
  Z13 = 'Z13', //Completed
}

export enum ServiceStatus {
  Z21 = 'Z21', //New
  Z22 = 'Z22', //In Progress
  Z23 = 'Z23', //Completed
}

export enum RoleCodes {
  R21 = 'R21', //Service Advisor
  R22 = 'R22', //Service Manager
  R23 = 'R23', //Service Technician
}

export enum SourceType {
  SERVICE_FORM = 'service-form',
}

export enum Roles {
  SERVICE_ADVISOR = 'Service Advisor',
  SERVICE_MANAGER = 'Service Manager',
  SERVICE_TECHNICIAN = 'Service Technician',
}

export enum Scope {
  CreateJobCard = 'CreateJobCard',
  ViewJobCard = 'ViewJobCard',
  EditJobCardService = 'EditJobCardService',
  DeleteJobCard = 'DeleteJobCard',
  CreateServiceForm = 'CreateServiceForm',
  ViewServiceForm = 'ViewServiceForm',
  UpdateServiceForm = 'UpdateServiceForm',
  DeleteServiceForm = 'DeleteServiceForm',
  MasterData = 'MasterData',
  EditTask = 'EditTask',
  GenerateInvoice = 'GenerateInvoice',
}
