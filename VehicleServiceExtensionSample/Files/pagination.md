## Pagination
In the JobCard Portal page, we have implemented pagination. Pagination is primarily client-driven i.e., the client has to request for the pages from the API and the API responds accordingly. Following query parameter is used for pagination:

| Query Parameter | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| $top            | Indicates page size. <br />**Default Page Size**: 30<br />
| $skip           | Indicates offset (number of items). For e.g. if page size is 100 and the user is navigating to 10th page, then offset ($skip) would be 900 (9 * 100) |

Example: 

```
Retrieve first page of JobCards
GET /job-cards?$top=20

Retrieve 10 page of JobCards
GET /job-cards?$top=20&$skip=180
```