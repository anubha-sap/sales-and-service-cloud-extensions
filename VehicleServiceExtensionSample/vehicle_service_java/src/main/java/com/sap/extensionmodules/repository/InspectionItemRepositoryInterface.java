package com.sap.extensionmodules.repository;

import com.sap.extensionmodules.entity.InspectionItem;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InspectionItemRepositoryInterface extends CrudRepository<InspectionItem, Long> {
//    InspectionItem findByDescription(String description);

    InspectionItem findById(String id);
}
