## Search And Filter
In the JobCard portal page, we have added the ability to search/filter JobCards.

Query Param used to search within JobCard:

| Query Parameter | Description                                       |
| --------------- | ------------------------------------------------- |
| $search         | Indicates the search expression |

Example

```
Search for `exfs` within JobCards
GET /leads?$search="exfs"
```

To see the implementation of search, please see the function processSearchQuery() in "src/utils/utils.service.ts". In this function, we create the query, which is then passed to the service layer and then to the DB as query. Please note that the search happens only on the following fields:
- displayId
- vehicleNumber
- model
- status\

We do not search in CNS fields because of performance issues.

Query Param used to filter JobCard:
| Query Parameter | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| $filter         | Indicates the filter expression |   

Following are the list of operators that are to be supported.

| Filter Operation | Example |
|----|----|
| Equals | `$filter=field1 eq 10` |
| Not equal to | `filter=field1 ne 42` |
| Contains | `$filter=city ct 'Fran'` |
| And | `$filter=field1 eq 'A' and field2 eq 14` |
| Or | `$filter=countryCode eq 'ES' or countryCode eq 'US'` |

To see the implementation of filter, please see the function processFilterQuery() in "src/utils/utils.service.ts". In this function, we create the query, which is then passed to the service layer and then to the DB as query