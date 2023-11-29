### Add external application UI via mashup in SAP Sales and Service Cloud
**Step 1:** Go to SSC Application  
 
**Step 2:** In the settings, navigate to "Mashup Authoring" and create a new mashup (Service Form). 
 ![Case ExtensionField ](../Images/SBA5.png "Case fields")
 
**Step 3:** In the URL field of the mashup, add the deployed URL of Service Form BuildApps application. Also, add a parameter, "caseId." Save the mashup. 
![Case ExtensionField ](../Images/SBA6.png "Case fields")

**Step 4:** Go to "Case," open CaseUI , and start adaption. 
 
**Step 5:** Create a new tab  and add the mashup you created in step 3. Map the parameter (e.g., caseId = case/Id).
![Case ExtensionField ](../Images/SBA7.png "Case fields") 

**Step 6:** Follow the same steps for "Job card" as described above. 

Refer [this](https://help.sap.com/docs/CX_NG_SALES/ea5ff8b9460a43cb8765a3c07d3421fe/007ce4c89b6a45a39cff5d26186dfab0.html?locale=en-US&q=create%20extension%20fields%20in%20sales%20and%20service%20cloud%20verion%202) help document for more information on mashups
