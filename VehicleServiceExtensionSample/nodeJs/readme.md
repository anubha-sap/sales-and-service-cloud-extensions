# TASKS Entity
Specific actions or procedures that are performed on a vehicle during a service appointment. Tasks are typically associated with a specific service package and may be performed by one or more service providers.

## API Description of Tasks APIs
---

| Endpoint                                                         | Method | Description                                      |
| ---------------------------------------------------------------- | ------ | ------------------------------------------------ |
| /task                                                            | GET    | Fetches list of all tasks                        |
| /task                                                            | POST   | Creates a task                                   |
| /task/:id                                                        | PATCH  | Updates a task with given id.                    |
| /task/:id                                                        | GET    | Reads a task with given id.                      |
| /task/:id                                                        | DELETE | Deletes a task with given id.                    |

## Endpoints for task api
___
1. ### List of tasks

    * ```Method: GET```
    * ```API Endpoint: /vehicle-service/vehicle-service/task```

    * Kyma url

      ```https://vehicle-service.c7faf5c.kyma.ondemand.com/vehicle-service/task```

   #### Sample Response
   ```
    [
        {
            "taskId": "ae493b37-4dc9-44c0-a611-ee791753aed0",
            "task": "REPLACE_OIL_FILTER",
            "taskDescription": "Replace oil filter",
            "assignee": "Smith",
            "status": "OPEN"
        },
        {
            "taskId": "3aa43df7-3559-43c7-9072-bd955cf41019",
            "task": "REFILL_ENGINE_WITH_NEW_OIL",
            "taskDescription": "Refill engine with new oil",
            "assignee": "Chris",
            "status": "OPEN"
        },
        {
            "taskId": "3cd28a84-c1e9-4eca-8d98-6a52622065b3",
            "task": "DRAIN_OLD_ENGINE_OIL",
            "taskDescription": "Drain old engine oil - update",
            "assignee": "Will",
            "status": "OPEN"
        }
    ]
   ```

   #### Response Fields Description
   ___

   | Fields                     | Description                                | Type    |
   | -------------------------- | ------------------------------------------ | ------- |
   | taskId                     | Id of the task                             | string  |
   | task                       | Type of task                               | string  |
   | taskDescription            | Description of the task                    | string  |
   | assignee                   | Technician who will be handling the task   | string  |
   | status                     | Status of the task                         | string  |

2. ### Create a tast

    * ```Method: POST```
    * ```API Endpoint: /vehicle-service/task```
    * Kyma example url

      ```URL: https://vehicle-service.c7faf5c.kyma.ondemand.com/vehicle-service/task```
    #### Example payload with minimum required fields:

    ```
    {
        "task": "REPLACE_OIL_FILTER",
        "taskDescription": "Replace oil filter",
        "assignee": "Smith",
        "status": "OPEN"
    }
    ```
    #### Request Fields Description
    ---

   | Fields                                     | Description                                   | Type    |
   | ------------------------------------------ | --------------------------------------------- | ------- |
   | task                                       | Type of task                                  | string  |
   | assignee                                   | Technician who will be handling the task      | string  |
   | taskDescription                            | Description of the task                       | string  |
   | status                                     | Status of the task                            | string  |

    #### Sample Response
    ```
    {
        "taskId": "e23dff09-0ede-49bd-b197-331fe551afbe",
        "task": "REPLACE_OIL_FILTER",
        "taskDescription": "Replace oil filter",
        "assignee": "Smith",
        "status": "OPEN"
    }
    ```
    #### Response Fields Description
    ---
    | Fields                        | Description                                          | Type     |
    | ----------------------------- | ---------------------------------------------------- | -------- |
    | taskId                        | Id of the task                                       | string   |
    | task                          | Type of task                                         | string   |
    | taskDescription               | Description of the task                              | string   |
    | assignee                      | Technician who will be handling the task             | string   |
    | status                        | Status of the task                                   | string   |

3. ### Reading a tast
    * ``` Method: GET```
    * ``` API Endpoint: /vehicle-service/tast/:taskId```
    * Kyma example url

      ```URL: https://vehicle-service.c7faf5c.kyma.ondemand.com/vehicle-service/task/e23dff09-0ede-49bd-b197-331fe551afbe```

    
    #### Sample Response
    ```
    {
        "taskId": "e23dff09-0ede-49bd-b197-331fe551afbe",
        "task": "REPLACE_OIL_FILTER",
        "taskDescription": "Replace oil filter",
        "assignee": "Smith",
        "status": "OPEN"
    }
    ```
4. ### Updating a task
    * ``` Method: PATCH```
    * ``` API Endpoint: /vehicle-service/task/:taskId```
    * Kyma example url

      ```URL: https://vehicle-service.c7faf5c.kyma.ondemand.com/vehicle-service/task/e23dff09-0ede-49bd-b197-331fe551afbe```

    #### Sample Payload: 
    ```
    {
        "status":"IN_PROCESS",
    }        
    ```

    #### Sample Response
    ```
    {
        "taskId": "e23dff09-0ede-49bd-b197-331fe551afbe",
        "task": "REPLACE_OIL_FILTER",
        "taskDescription": "Replace oil filter",
        "assignee": "Smith",
        "status": "IN_PROCESS"
    } 
    ```
5. ### Deleting a task
    * ``` Method: DELETE```
    * ``` API Endpoint: /vehicle-service/task/:taskId```
    * Kyma example url

      ```URL: https://vehicle-service.c7faf5c.kyma.ondemand.com/vehicle-service/task/e23dff09-0ede-49bd-b197-331fe551afbe```

   #### Sample Response
      ``` 
    {
        "deletedTaskId": [
            "e23dff09-0ede-49bd-b197-331fe551afbe"
        ]
    }    
      ```
# Service Package Entity
Collection of tasks that are bundled together and offered to customers as a single package

## API Description of Service Package APIs
---

| Endpoint                      | Method | Description                               |
| ------------------------------|--------|-------------------------------------------|
| /service-package              | GET    | Fetches list of all service packages      |
| /service-package              | POST   | Creates a service package                 |
| /service-package/:id          | PATCH  | Updates a service package with given id.  |
| /service-package/:id          | GET    | Reads a service package with given id.    |
| /service-package/:id          | DELETE | Deletes a service package with given id.  |

## Endpoints for Service Package APIs
___
1. ### List of Service Packages

    * ```Method: GET```
    * ```API Endpoint: /vehicle-service/service-package```

    * Kyma url

      ```https://vehicle-service.c7faf5c.kyma.ondemand.com/vehicle-service/service-package```

   #### Sample Response
   ```
    [
        {
            "servicePackageId": "8ab6b38a-92ec-428a-8c26-df6e1e3aee8b",
            "servicePackage": "TUNE_UP",
            "price": "1499",
            "tasks": [
                {
                    "taskId": "3cd28a84-c1e9-4eca-8d98-6a52622065b3",
                    "task": "DRAIN_OLD_ENGINE_OIL",
                    "taskDescription": "Drain old engine oil - update",
                    "assignee": "Will",
                    "status": "OPEN"
                },
                {
                    "taskId": "3aa43df7-3559-43c7-9072-bd955cf41019",
                    "task": "REFILL_ENGINE_WITH_NEW_OIL",
                    "taskDescription": "Refill engine with new oil",
                    "assignee": "Chris",
                    "status": "OPEN"
                }
            ]
        },
        {
            "servicePackageId": "6cee7775-aaab-43f2-9266-0a68503cd140",
            "servicePackage": "BASIC",
            "price": "499",
            "tasks": [
                {
                    "taskId": "ae493b37-4dc9-44c0-a611-ee791753aed0",
                    "task": "REPLACE_OIL_FILTER",
                    "taskDescription": "Replace oil filter",
                    "assignee": "Smith",
                    "status": "OPEN"
                }
            ]
        }
    ]
   ```

   #### Response Fields Description
   ___

   | Fields                         | Description                                | Type            |
   | ------------------------------ | ------------------------------------------ | --------------- |
   | servicePackageId               | Id of the task                             | string          |
   | servicePackage                 | Type of service package                    | string          |
   | tasks                          | List of Tasks                              | Array of Tasks  |
   | price                          | Estimated Price of the service package     | string          |

2. ### Create a Service Package

    * ```Method: POST```
    * ```API Endpoint: /vehicle-service/service-package```
    * Kyma example url

      ```URL: https://vehicle-service.c7faf5c.kyma.ondemand.com/vehicle-service/service-package```

    #### Example payload with minimum required fields:
    ```
    {
        "servicePackage": "BASIC",
        "price":"5000",
        "taskIds": ["ae493b37-4dc9-44c0-a611-ee791753aed0", "3aa43df7-3559-43c7-9072-bd955cf41019"]
    }
    ```
    #### Request Fields Description
    ---

   | Fields                                     | Description                                                               | Type               |
   | ------------------------------------------ | --------------------------------------------------------------------------| ------------------ |
   | servicePackage                             | Type of service package                                                   | string             |
   | taskIds                                    | List of Task Ids                                                          | Array of TasksIds  |
   | price                                      | Estimated Price of the service package                                    | Array of Tasks     |

    #### Sample Response
    ```
    {
        "servicePackageId": "1230d0ac-0114-486c-82e3-d2f903d1eeeb",
        "servicePackage": "BASIC",
        "price":"5000",
        "tasks": [
            {
                "taskId": "3cd28a84-c1e9-4eca-8d98-6a52622065b3",
                "task": "DRAIN_OLD_ENGINE_OIL",
                "taskDescription": "Drain old engine oil - update",
                "assignee": "Will",
                "status": "OPEN"
            },
            {
                "taskId": "3aa43df7-3559-43c7-9072-bd955cf41019",
                "task": "REFILL_ENGINE_WITH_NEW_OIL",
                "taskDescription": "Refill engine with new oil",
                "assignee": "Chris",
                "status": "OPEN"
            }
        ]
    }
    ```
    #### Response Fields Description
    ---
    | Fields                                    | Description                                          | Type            |
    | ----------------------------------------- | ---------------------------------------------------- | --------------- |
    | servicePackage                            | Type of service package                              | string          |
    | tasks                                     | List of Tasks                                        | Array of Tasks  |
    | price                                     | Estimated Price of the service package               | string          |

3. ### Reading a Service Package
    * ``` Method: GET```
    * ``` API Endpoint: /vehicle-service/service-package/:servicePackageId```
    * Kyma example url

      ```URL: https://vehicle-service.c7faf5c.kyma.ondemand.com/vehicle-service/service-package/1230d0ac-0114-486c-82e3-d2f903d1eeeb```

    
    #### Sample Response
    ```
    {
        "servicePackageId": "1230d0ac-0114-486c-82e3-d2f903d1eeeb",
        "servicePackage": "BASIC",
        "price":"5000",
        "tasks": [
            {
                "taskId": "3cd28a84-c1e9-4eca-8d98-6a52622065b3",
                "task": "DRAIN_OLD_ENGINE_OIL",
                "taskDescription": "Drain old engine oil - update",
                "assignee": "Will",
                "status": "OPEN"
            },
            {
                "taskId": "3aa43df7-3559-43c7-9072-bd955cf41019",
                "task": "REFILL_ENGINE_WITH_NEW_OIL",
                "taskDescription": "Refill engine with new oil",
                "assignee": "Chris",
                "status": "OPEN"
            }
        ]
    }
    ```
4. ### Updating a Service Package
    * ``` Method: PATCH```
    * ``` API Endpoint: /vehicle-service/service-package/:servicePackageId```
    * Kyma example url

      ```URL: https://vehicle-service.c7faf5c.kyma.ondemand.com/vehicle-service/service-package/1230d0ac-0114-486c-82e3-d2f903d1eeeb```

    #### Sample Payload: 
    ```
    {
        "price":"2499"
    }       
    ```

    #### Sample Response
    ```
    {
        "servicePackageId": "1230d0ac-0114-486c-82e3-d2f903d1eeeb",
        "servicePackage": "BASIC_PLUS",
        "price":"2499",
        "tasks": [
            {
                "taskId": "53fb5dfa-7298-45ea-9d5b-e8af616d9cfb",
                "task": "Check tire pressure and tread depth",
                "assignee": "Raghu",
                "status":"open",
            },
            {
                "taskId": "60dade32-5381-47d4-a6d3-00ac2d574089",
                "task": "Inspect windshield wipers, lights, and other safety features",
                "assignee": "Prashanth",
                "status":"open",
            }
        ]
    }
    ```
5. ### Deleting a Service Package
    * ``` Method: DELETE```
    * ``` API Endpoint: /vehicle-service/service-package/:servicePackageId```
    * Kyma example url

      ```URL: https://vehicle-service.c7faf5c.kyma.ondemand.com/vehicle-service/service-package/e23dff09-0ede-49bd-b197-331fe551afbe```

   #### Sample Response
      ``` 
    {
        "deletedServicePackageId": [
            "1230d0ac-0114-486c-82e3-d2f903d1eeeb"
        ]
    }    
      ```

# Job Cards Entity
Contains a combined list of tasks for a service request based on the service packages selected

## API Description of Job Card APIs
---

| Endpoint                                     | Method | Description                                                  |
| ---------------------------------------------| ------ | ------------------------------------------------------------ |
| /job-card                                    | GET    | Fetches list of all job cards                                |
| /job-card?caseId={caseId}                    | GET    | Fetches list of all job cards by caseId                      |
| /job-card                                    | POST   | Creates a job card                                           |
| /job-card/:jobCardId                         | PATCH  | Updates a job card with given jobCardId.                     |
| /job-card/:jobCardId                         | GET    | Reads a job card package with given jobCardId.               |
| /job-card/:jobCardId                         | DELETE | Deletes a job card package with given jobCardId.             |
| /job-card/:jobCardId/tasks                   | GET    | Fetches the tasks related to the jobCardId                   |
| /job-card/:jobCardId/tasks/:taskId           | GET    | Fetches a particular task related to the jobCard             |
| /job-card/:jobCardId/tasks/:taskId           | PATCH  | Updates a particular task related to the jobCard             |

## Endpoints for Job Card APIs
___
1. ### List of Job Cards

    * ```Method: GET```
    * ```API Endpoint: /vehicle-service/job-card```

    * Kyma url

      ```https://vehicle-service.c7faf5c.kyma.ondemand.com/vehicle-service/job-card```

   #### Sample Response
   ```
    [
        {
            "jobCardId": "65decd34-036c-441e-a12a-f676745c2a68",
            "caseId": "db7106bc-c6d3-11ed-862a-8bd675de062f",
            "vehicleNumber": "KA53HB9999",
            "status": "OPEN",
            "servicePackage": [
                "6cee7775-aaab-43f2-9266-0a68503cd140"
            ],
            "tasks": [
                {
                    "jobCardTaskId": "13d3bd6c-0289-4d67-8bcd-d2ff42de683e",
                    "task": "REPLACE_OIL_FILTER",
                    "taskDescription": "Replace oil filter",
                    "assignee": "Smith",
                    "status": "OPEN"
                }
            ]
        }
    ]
   ```

   #### Response Fields Description
   ___

   | Fields            | Description                                            | Type           |
   |-------------------| -------------------------------------------------------|----------------|
   | jobCardId         | Id of the Job Card                                     | string         |
   | caseId            | Id of the case which this job card is related to       | string         |
   | vehicleNumber     | Vehicle Number                                         | string         |
   | status            | Current status of Job Card                             | string         |
   | servicePackage    | Array of service package Ids related to this job card  | Array of string|
   | tasks             | List of associated tasks                               | Array of Tasks |

2. ### Get list of Job Cards by CaseId

    * ```Method: GET```
    * ```API Endpoint: /vehicle-service/job-card?caseId=db7106bc-c6d3-11ed-862a-8bd675de062f```

    * Kyma url

      ```https://vehicle-service.c7faf5c.kyma.ondemand.com/vehicle-service/job-card?caseId=db7106bc-c6d3-11ed-862a-8bd675de062f```

   #### Sample Response
   ```
    [
        {
            "jobCardId": "65decd34-036c-441e-a12a-f676745c2a68",
            "caseId": "db7106bc-c6d3-11ed-862a-8bd675de062f",
            "vehicleNumber": "KA53HB9999",
            "status": "OPEN",
            "servicePackage": [
                "6cee7775-aaab-43f2-9266-0a68503cd140"
            ],
            "tasks": [
                {
                    "jobCardTaskId": "13d3bd6c-0289-4d67-8bcd-d2ff42de683e",
                    "task": "REPLACE_OIL_FILTER",
                    "taskDescription": "Replace oil filter",
                    "assignee": "Smith",
                    "status": "OPEN"
                }
            ]
        }
    ]
   ```

3. ### Create a Job Card

    * ```Method: POST```
    * ```API Endpoint: /vehicle-service/job-card```
    * Kyma example url

      ```URL: https://vehicle-service.c7faf5c.kyma.ondemand.com/vehicle-service/job-card```

    #### Example payload with minimum required fields:
    ```
    {
        "status": "OPEN",
        "caseId": "e5e43ae7-c936-11ed-b3de-f9163be8cae9",
        "servicePackages": ["8ab6b38a-92ec-428a-8c26-df6e1e3aee8b"]
    }
    ```
    #### Request Fields Description
    ---

   | Fields                       | Description                                             | Type            |
   | -----------------------------|---------------------------------------------------------|-----------------|
   | status                       | Current status of Job Card                              | string          |
   | caseId                       | Id of the case which this job card is related to        | string          |
   | servicePackages              | List of service packages selected                       | Array of string |


    #### Sample Response
    ```
    {
        "vehicleNumber": "KA53HB4898",
        "caseId": "db7106bc-c6d3-11ed-862a-8bd675de062f",
        "status": "OPEN",
        "servicePackage": [
            "8ab6b38a-92ec-428a-8c26-df6e1e3aee8b"
        ],
        "tasks": [
            {
                "task": "DRAIN_OLD_ENGINE_OIL",
                "taskDescription": "Drain old engine oil - update",
                "assignee": "Will",
                "status": "OPEN",
                "jobCardTaskId": "2308d1fe-9947-45d2-aa8b-6686ed3b3f2a"
            },
            {
                "task": "REFILL_ENGINE_WITH_NEW_OIL",
                "taskDescription": "Refill engine with new oil",
                "assignee": "Chris",
                "status": "OPEN",
                "jobCardTaskId": "51a527c6-715d-47a3-9a62-8108eca59871"
            }
        ],
        "jobCardId": "8b447eba-e944-4177-be98-948646a6cf50"
    }
    ```
    #### Response Fields Description
    ---
    | Fields                | Description                                           | Type           |
    |-----------------------|-------------------------------------------------------|----------------|
    | jobCardId             | Id of the Job Card                                    | string         |
    | status                | Current status of Job Card                            | string         |
    | caseId                | Id of the case which this job card is related to      | string         |
    | vehicleNumber         | Vehicle Number                                        | string         |
    | tasks                 | List of associated tasks                              | Array of Tasks |

4. ### Reading a Job Card
    * ``` Method: GET```
    * ``` API Endpoint: /vehicle-service/job-card/:jobCardId```
    * Kyma example url

      ```URL: https://vehicle-service.c7faf5c.kyma.ondemand.com/vehicle-service/job-card/8b447eba-e944-4177-be98-948646a6cf50```

    
    #### Sample Response
    ```
    {
        "jobCardId": "8b447eba-e944-4177-be98-948646a6cf50",
        "caseId": "db7106bc-c6d3-11ed-862a-8bd675de062f",
        "vehicleNumber": "KA53HB4898",
        "status": "OPEN",
        "servicePackage": [
            "8ab6b38a-92ec-428a-8c26-df6e1e3aee8b"
        ],
        "tasks": [
            {
                "jobCardTaskId": "2308d1fe-9947-45d2-aa8b-6686ed3b3f2a",
                "task": "DRAIN_OLD_ENGINE_OIL",
                "taskDescription": "Drain old engine oil - update",
                "assignee": "Will",
                "status": "OPEN"
            },
            {
                "jobCardTaskId": "51a527c6-715d-47a3-9a62-8108eca59871",
                "task": "REFILL_ENGINE_WITH_NEW_OIL",
                "taskDescription": "Refill engine with new oil",
                "assignee": "Chris",
                "status": "OPEN"
            }
        ]
    }
    ```
5. ### Updating a Job Card
    * ``` Method: PATCH```
    * ``` API Endpoint: /vehicle-service/job-card/:jobCardId```
    * Kyma example url

      ```URL: https://vehicle-service.c7faf5c.kyma.ondemand.com/vehicle-service/task/8b447eba-e944-4177-be98-948646a6cf50```

    #### Sample Payload: 
    ```
    {
        "status": "IN_PROCESS"
    }      
    ```

    #### Sample Response
    ```
    {
        "jobCardId": "8b447eba-e944-4177-be98-948646a6cf50",
        "vehicleNumber": "KA53HB4898",
        "status": "IN_PROCESS",
        "servicePackage": [
            "8ab6b38a-92ec-428a-8c26-df6e1e3aee8b"
        ],
        "tasks": [
            {
                "jobCardTaskId": "2308d1fe-9947-45d2-aa8b-6686ed3b3f2a",
                "task": "DRAIN_OLD_ENGINE_OIL",
                "taskDescription": "Drain old engine oil - update",
                "assignee": "Will",
                "status": "OPEN"
            },
            {
                "jobCardTaskId": "51a527c6-715d-47a3-9a62-8108eca59871",
                "task": "REFILL_ENGINE_WITH_NEW_OIL",
                "taskDescription": "Refill engine with new oil",
                "assignee": "Chris",
                "status": "OPEN"
            }
        ]
    }
    ```
6. ### Deleting a Job Card
    * ``` Method: DELETE```
    * ``` API Endpoint: /vehicle-service/job-card/:jobCardId```
    * Kyma example url

      ```URL: https://vehicle-service.c7faf5c.kyma.ondemand.com/vehicle-service/job-card/8b447eba-e944-4177-be98-948646a6cf50```

   #### Sample Response
      ``` 
    {
        "deletedJobCardId": [
            "f3ec5684-524c-4ea4-958f-a4109db485dd"
        ]
    }    
      ```
7. ### List of Tasks of a Job Card

    * ```Method: GET```
    * ```API Endpoint: /vehicle-service/job-card/:jobCardId/tasks```

    * Kyma url

      ```https://vehicle-service.c7faf5c.kyma.ondemand.com/vehicle-service/job-card/8b447eba-e944-4177-be98-948646a6cf50/tasks```

   #### Sample Response
   ```
    [
        {
            "jobCardTaskId": "2308d1fe-9947-45d2-aa8b-6686ed3b3f2a",
            "task": "DRAIN_OLD_ENGINE_OIL",
            "taskDescription": "Drain old engine oil - update",
            "assignee": "Will",
            "status": "OPEN"
        },
        {
            "jobCardTaskId": "51a527c6-715d-47a3-9a62-8108eca59871",
            "task": "REFILL_ENGINE_WITH_NEW_OIL",
            "taskDescription": "Refill engine with new oil",
            "assignee": "Chris",
            "status": "OPEN"
        }
    ]
   ```

8. ### Get a particular task of a Job Card

    * ```Method: GET```
    * ```API Endpoint: /vehicle-service/job-card/:jobCardId/tasks/:taskId```

    * Kyma url

      ```https://vehicle-service.c7faf5c.kyma.ondemand.com/vehicle-service/job-card/8b447eba-e944-4177-be98-948646a6cf50/tasks/2308d1fe-9947-45d2-aa8b-6686ed3b3f2a```

   #### Sample Response
   ```
    {
        "jobCardTaskId": "2308d1fe-9947-45d2-aa8b-6686ed3b3f2a",
        "task": "DRAIN_OLD_ENGINE_OIL",
        "taskDescription": "Drain old engine oil - update",
        "assignee": "Will",
        "status": "OPEN"
    }
   ```

9. ### Updating a task of a job card

    * ```Method: PATCH```
    * ```API Endpoint: /vehicle-service/job-card/:jobCardId/tasks/:taskId```

    * Kyma url

      ```https://vehicle-service.c7faf5c.kyma.ondemand.com/vehicle-service/job-card/8b447eba-e944-4177-be98-948646a6cf50/tasks/2308d1fe-9947-45d2-aa8b-6686ed3b3f2a```


    #### Sample Payload: 
    ```
    {
        "status": "IN_PROCESS"
    }      
    ```

   #### Sample Response
   ```
    {
        "jobCardTaskId": "2308d1fe-9947-45d2-aa8b-6686ed3b3f2a",
        "task": "DRAIN_OLD_ENGINE_OIL",
        "taskDescription": "Drain old engine oil - update",
        "assignee": "Will",
        "status": "IN_PROCESS"
    }
   ```

