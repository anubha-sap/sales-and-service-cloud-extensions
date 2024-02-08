package com.sap.extensionmodules.Utils;

import com.sap.extensionmodules.dtos.query.QueryFilterOptions;
import com.sap.extensionmodules.entity.JobCard;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@RunWith(MockitoJUnitRunner.class)
@ExtendWith(MockitoExtension.class)
class JobCardSpecificationTest {

    @Mock
    private QueryFilterOptions criteria;

    @Mock
    private Root<JobCard> root;

    @Mock
    private CriteriaQuery<?> query;

    @Mock
    private CriteriaBuilder builder;

    @InjectMocks
    JobCardSpecification specification;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);

    }
    @Test
    public void testToPredicateForEqualOperator() {
        when(criteria.getOperator()).thenReturn(QueryFilterOptions.QueryFilterOperator.EQ);
        when(criteria.getSelectAttributeName()).thenReturn("serviceName");
        when(criteria.getSelectValue()).thenReturn("Oil Change");

        Predicate predicate = specification.toPredicate(root, query, builder);

        verify(builder).equal(root.get("serviceName"), "Oil Change");
    }

    @Test
    public void testToPredicateForNotEqualOperator() {
        when(criteria.getOperator()).thenReturn(QueryFilterOptions.QueryFilterOperator.NE);
        when(criteria.getSelectAttributeName()).thenReturn("serviceName");
        when(criteria.getSelectValue()).thenReturn("Brake Repair");

        Predicate predicate = specification.toPredicate(root, query, builder);

        verify(builder).notEqual(root.get("serviceName"), "Brake Repair");
    }

    @Test
    public void testToPredicateForGreaterThanOperator() {
        when(criteria.getOperator()).thenReturn(QueryFilterOptions.QueryFilterOperator.GT);
        when(criteria.getSelectAttributeName()).thenReturn("mileage");
        when(criteria.getSelectValue()).thenReturn("50000");

        Predicate predicate = specification.toPredicate(root, query, builder);

        verify(builder).greaterThan(root.get("mileage"), "50000");
    }
    @Test
    public void testToPredicateForGreaterThanOrEqualToOperator() {
        when(criteria.getOperator()).thenReturn(QueryFilterOptions.QueryFilterOperator.GE);
        when(criteria.getSelectAttributeName()).thenReturn("mileage");
        when(criteria.getSelectValue()).thenReturn("50000");

        Predicate predicate = specification.toPredicate(root, query, builder);

        verify(builder).greaterThanOrEqualTo(root.get("mileage"), "50000");
    }

    @Test
    public void testToPredicateForLessThanOperator() {
        when(criteria.getOperator()).thenReturn(QueryFilterOptions.QueryFilterOperator.LT);
        when(criteria.getSelectAttributeName()).thenReturn("mileage");
        when(criteria.getSelectValue()).thenReturn("50000");

        Predicate predicate = specification.toPredicate(root, query, builder);

        verify(builder).lessThan(root.get("mileage"), "50000");
    }
    @Test
    public void testToPredicateForLessThanOrEqualToOperator() {
        when(criteria.getOperator()).thenReturn(QueryFilterOptions.QueryFilterOperator.LE);
        when(criteria.getSelectAttributeName()).thenReturn("mileage");
        when(criteria.getSelectValue()).thenReturn("50000");

        Predicate predicate = specification.toPredicate(root, query, builder);

        verify(builder).lessThanOrEqualTo(root.get("mileage"), "50000");
    }

    @Test
    public void testDataFromStringForBooleanAttribute() {
        when(criteria.getSelectAttributeName()).thenReturn("servicesProposed.isSelected");
        when(criteria.getSelectValue()).thenReturn("true");

        Object data = specification.dataFromString(criteria);

        assertEquals(true, data);
    }

    @Test
    public void testDataFromStringForIntegerAttribute() {
        when(criteria.getSelectAttributeName()).thenReturn("milometer");
        when(criteria.getSelectValue()).thenReturn("50000");

        Object data = specification.dataFromString(criteria);

        assertEquals(50000, data);
    }
}
