package com.sap.extensionmodules.dtos.query;

import java.util.Locale;
import java.util.Optional;

import com.sap.extensionmodules.commons.Constants;
import com.sap.extensionmodules.exception.InvalidQueryParameterException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import com.sap.extensionmodules.dtos.query.QueryFilterOptions.QueryFilterOperator;

@Component
@Slf4j
public class QueryDTOHelper {

    public QueryRequestDTO buildRequestDTO(Optional<String> filter) {

        QueryRequestDTO.QueryRequestDTOBuilder requestDTOBuilder = QueryRequestDTO.builder();

        if (filter.isPresent()) {
            requestDTOBuilder.filterOptions(addFilterOption(filter.get()));
        }

        return requestDTOBuilder.build();
    }


    public QueryFilterOptions addFilterOption(String filterString){
        String[] selectOptionlist = filterString.split(Constants.SPACE_DELIMITER);
        QueryFilterOptions.QueryFilterOptionsBuilder selectOptionBuilder =
                QueryFilterOptions.builder()
                        .selectAttributeName(
                                selectOptionlist[0]
                                        .replace(Constants.QUOTES_DELIMITER, "")
                                        .replace(Constants.SINGLE_QUOTES_DELIMITER, "")) // remove surrounding quotes
                        .operator(getSelectOperator(selectOptionlist[1]))
                        .selectValue(
                                selectOptionlist[2]
                                        .replace(Constants.QUOTES_DELIMITER, "")
                                        .replace(Constants.SINGLE_QUOTES_DELIMITER, ""));
        return selectOptionBuilder.build();
    }

    public static QueryFilterOperator getSelectOperator(String operator) {

        QueryFilterOptions.QueryFilterOperator selectOperator;
        switch (operator.toUpperCase(Locale.ENGLISH)) {
            case ("EQ"):
                selectOperator = QueryFilterOperator.EQ;
                break;
            case ("NE"):
                selectOperator = QueryFilterOperator.NE;
                break;
            case ("LT"):
                selectOperator = QueryFilterOperator.LT;
                break;
            case ("GT"):
                selectOperator = QueryFilterOperator.GT;
                break;
            case ("GE"):
                selectOperator = QueryFilterOperator.GE;
                break;
            case ("LE"):
                selectOperator = QueryFilterOperator.LE;
                break;
            case ("LK"):
                selectOperator = QueryFilterOperator.LK;
                break;
            case ("BT"):
                selectOperator = QueryFilterOperator.BT;
                break;
            default:
                throw new InvalidQueryParameterException("Invalid filter operator : " + operator);
        }
        return selectOperator;
    }

}

