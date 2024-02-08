package com.sap.extensionmodules.dtos;

import lombok.*;


import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class CustomerDetails implements Serializable {
    private String name;
    private String contactNumber;


}
