### Configurations in sales and service cloud
Before running this application, there are some configurations that needs to be done in Sales and Service Cloud.
* Create and Add below extension fields
   * Vehicle Number (VIN Number) – Created for Registered Product object and added in header section of Registered products object details screen. Screenshots below-

   ![Case ExtensionField ](../Images/SSC1.png "Case fields") 

   ![Case ExtensionField ](../Images/SSC2.png "Case fields")

   *  Service Form ID – Created for Case
   * Job Card ID – Created for Case
   * Milometer- Created for case . All these extension fields added in header section of case object details screen.
   ![Case ExtensionField ](../Images/SSC3.png "Case fields")

   ![Case ExtensionField ](../Images/SSC4.png "Case fields") 

  [Refer](https://help.sap.com/docs/CX_NG_SALES/ea5ff8b9460a43cb8765a3c07d3421fe/d3bdfac0c6b141c0bac27408c3ed159f.html?locale=en-US&q=create%20extension%20fields%20in%20sales%20and%20service%20cloud%20verion%202) to know about how to create extension fields.
* Create Custom Case type
  * For this reference implementation – “vehicle service Case Type” case type needs to be created.
  * [Refer](https://help.sap.com/docs/CX_NG_SVC/56436b4e8fa84dc8b4408c7795a012c4/016d3122e3d347feb329a3523b537ff3.html?locale=en-US&q=case%20type) to know how to create custom case type.
* Create custom case status
  * create these three custom status for case - Service Booked , service In Progress and Service Completed respectively. These custom status is created for custom case type - "vehicle service case type".

![Case ExtensionField ](../Images/SSC5.png "Case fields") 

  * In reference scenario, when job card is created,case status is updated to Service Booked.When technician starts the service, case status is updated to service in progress.When technician completes the service, case status is updated to service completed. This logic is written in external service.
  * [Refer](https://help.sap.com/docs/CX_NG_SVC/56436b4e8fa84dc8b4408c7795a012c4/be263fba54584ed6af0a670b4bfaafc2.html?locale=en-US&q=case%20status) to know how to create custom status.

**Please note the IDs of extension fields, case type and custom case status. It will be used furthur in service.**