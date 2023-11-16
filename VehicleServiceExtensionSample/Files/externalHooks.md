#### Validations via External hooks

We have implemented validation in our external application. If any user is changing the case status to closed/completed, we are validating if tasks are completed by technicians or not. If tasks are not completed, which means case status is not- service completed, we are not allowing, case to be closed in SSC. this validation is done in service via external hooks. 

Please refer this help document for details on external hooks and how it can be configured.