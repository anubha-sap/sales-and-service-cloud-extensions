# Vehicle Service Extension Scenario
<!-- Please include descriptive title -->

<!--- Register repository https://api.reuse.software/register, then add REUSE badge:
[![REUSE status](https://api.reuse.software/badge/github.com/SAP-samples/REPO-NAME)](https://api.reuse.software/info/github.com/SAP-samples/REPO-NAME)
-->

## Description
This sample demonstrates side by side extension on SSC v2 for vehicle service scenario. Please refer to below section "Reference Scenario" for scenario details.

In rhis external application, service is developed using nestJS/node.js and is interacting with SAP sales and Service cloud using SAP Cloud SDK. Service is deployed in BTP Kyma instance. UI is developed using SAP BuildApps which is no code low tool.
External UI is embedded in SSC via mashups


## Key Features
The key extension features covered in this implementation are - 
* Embedding external application in SAP sales and service cloud via mashup
* External custom logic (validations/determinations) implementation using external hooks
* Few basic Extension configurations in SAP Sales and Service Cloud 
* User propagation across different applications

## Prerequisites
For creating similar sample , below are the prerequisites along with link where you can learn more about them-
* Account and subaccount in SAP BTP , Kyma Instance runtime.
   * Refer [here](https://help.sap.com/docs/sap-hana-spatial-services/onboarding/introduction) to create account in BTP
   * Refer [here](https://discovery-center.cloud.sap/missiondetail/3019/3016/) to learn BTP
   * Refer [here](https://github.com/SAP-samples/kyma-runtime-extension-samples/tree/main/prerequisites#kyma) to know more about Kyma
* Kubectl - Install kubectl from below link
   * [Windows](https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/)
   * [MacOS](https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/)
* kubelogin plugin is required to proceed with Kubernetes authentication 
   * Homebrew (macOS and Linux) - brew install int128/kubelogin/kubelogin 
   * Chocolatey (Windows) - choco install kubelogin
   * Install krew from [here](https://krew.sigs.k8s.io/docs/user-guide/setup/install/)
   * Run - "kubectl krew install oidc-login"
* Install [Skaffold](https://skaffold.dev/docs/install/)
* Install Docker
* SAP BuildApps set up in BTP Account. Helpful links for setup
   * https://discovery-center.cloud.sap/serviceCatalog/sap-build-apps/?region=all
   * https://www.sap.com/india/products/technology-platform/low-code-app-builder.html
* NodeJS and NestJS Framework
* Cloud SDK. Learn from [here](https://sap.github.io/cloud-sdk/)
* Users in both SSC and BTP respectively
* HANA DB Account in BTP. 

## Refernce Scenario
Details of sample reference scenario is mentioned [here](./Files/scenario.md).

## Running the application
Please follow below mentioned steps to run this application. 
* [Configurations in sales and service cloud](./Files/ssc_configuration.md)

* [Run Backend service](./Files/service.md)
   * [Download and Deploy node JS application](./Files/service.md#download-and-deploy-service-in-kyma)
   * [Add Authentication](./Files/service.md#add-authentication)
   * [Run service API using postman](./Files/service.md#running-backend-api-using-postman)
   * [Code structure details](./Files/service.md#code-folder-structure)

* [Run BuildApps application](./Files/buildapps.md)
* [Embed external UI application via mashup](./Files/EmbedMashup.md)
* [Custom logic implementation using external hooks](./Files/externalHooks.md)

#### Validations via External hooks

We have implemented validation in our external application. If any user is changing the case status to closed/completed, we are validating if tasks are completed by technicians or not. If tasks are not completed, which means case status is not- service completed, we are not allowing, case to be closed in SSC. this validation is done in service via external hooks. 

Please refer this document for details on external hooks and how it can be configured.


