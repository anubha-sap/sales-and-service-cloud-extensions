package com.sap.extensionmodules.dtos.query;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import lombok.*;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@NoArgsConstructor(force = true)
@AllArgsConstructor
@JsonInclude(Include.NON_EMPTY)
public class QueryRequestDTO {

    @Getter(AccessLevel.PUBLIC)
    private String searchString;

    @Setter(AccessLevel.PUBLIC)
    @Getter(AccessLevel.PUBLIC)
    private QueryFilterOptions filterOptions;

}
