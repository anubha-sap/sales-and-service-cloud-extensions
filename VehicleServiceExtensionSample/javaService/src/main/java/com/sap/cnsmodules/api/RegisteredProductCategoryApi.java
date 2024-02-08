

package com.sap.cnsmodules.api;

import com.sap.cloud.sdk.services.openapi.core.OpenApiRequestException;
import com.sap.cloud.sdk.services.openapi.core.OpenApiResponse;
import com.sap.cloud.sdk.services.openapi.core.AbstractOpenApiService;
import com.sap.cloud.sdk.services.openapi.apiclient.ApiClient;

import com.sap.cnsmodules.model.Error ; //NOPMD
import com.sap.cnsmodules.model.RegisteredProductCategorycreaterequest ; //NOPMD
import com.sap.cnsmodules.model.RegisteredProductCategoryfile ; //NOPMD
import com.sap.cnsmodules.model.RegisteredProductCategoryqueryresponse ; //NOPMD
import com.sap.cnsmodules.model.RegisteredProductCategoryupdaterequest ; //NOPMD

import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import com.google.common.annotations.Beta;

import com.sap.cloud.sdk.cloudplatform.connectivity.HttpDestinationProperties;

/**
* Registered Product Service in version 1.0.0.
*
* The registered product is an instance of a product associated with a customer and generally has a serial ID. Registered product contains information describing its physical location, parties involved, such as the customer or employee responsible, product, and warranty.
*/

public class RegisteredProductCategoryApi extends AbstractOpenApiService {
    /**
    * Instantiates this API class to invoke operations on the Registered Product Service.
    *
    * @param httpDestination The destination that API should be used with
    */
    public RegisteredProductCategoryApi( @Nonnull final HttpDestinationProperties httpDestination )
    {
        super(httpDestination);
    }

    /**
    * Instantiates this API class to invoke operations on the Registered Product Service based on a given {@link ApiClient}.
    *
    * @param apiClient
    *            ApiClient to invoke the API on
    */
    @Beta
    public RegisteredProductCategoryApi( @Nonnull final ApiClient apiClient )
    {
         super(apiClient);
    }

    
    /**
     * <p>Create a new registered product category</p>
     *<p>Creates a new registered product category with the details send in the request.</p>
     * <p><b>201</b> - Registered product category created.
     * <p><b>400</b> - Bad Request.  The server cannot process the request due to a client error. For example, an invalid request.
     * <p><b>401</b> - Unauthorized.  This error is caused when the request has not been applied because there are no valid authentication credentials for the target resource.
     * <p><b>403</b> - Forbidden.  This client error code indicates that the server understood the request but refuses to authorize it.
     * <p><b>500</b> - Internal Server Error.  Failed to create the registered product category.
     * @param xSapCrmToken  (required)
        The value for the parameter xSapCrmToken
     * @param registeredProductCategorycreaterequest  (optional)
        The value for the parameter registeredProductCategorycreaterequest
     * @return RegisteredProductCategoryfile
     * @throws OpenApiRequestException if an error occurs while attempting to invoke the API
     */
    @Nullable  public RegisteredProductCategoryfile createregisteredproductserviceCategory( @Nonnull final String xSapCrmToken,  @Nullable final RegisteredProductCategorycreaterequest registeredProductCategorycreaterequest) throws OpenApiRequestException {
        final Object localVarPostBody = registeredProductCategorycreaterequest;
        
        // verify the required parameter 'xSapCrmToken' is set
        if (xSapCrmToken == null) {
            throw new OpenApiRequestException("Missing the required parameter 'xSapCrmToken' when calling createregisteredproductserviceCategory");
        }
        
        final String localVarPath = UriComponentsBuilder.fromPath("/sap/c4c/api/v1/registered-product-service/registeredProductCategories").build().toUriString();

        final MultiValueMap<String, String> localVarQueryParams = new LinkedMultiValueMap<String, String>();
        final HttpHeaders localVarHeaderParams = new HttpHeaders();
        final MultiValueMap<String, Object> localVarFormParams = new LinkedMultiValueMap<String, Object>();

        if (xSapCrmToken != null)
            localVarHeaderParams.add("x-sap-crm-token", apiClient.parameterToString(xSapCrmToken));

        final String[] localVarAccepts = { 
            "application/json"
        };
        final List<MediaType> localVarAccept = apiClient.selectHeaderAccept(localVarAccepts);
        final String[] localVarContentTypes = { 
            "application/json"
        };
        final MediaType localVarContentType = apiClient.selectHeaderContentType(localVarContentTypes);

        final String[] localVarAuthNames = new String[] { "basicAuthentication" };

        final ParameterizedTypeReference<RegisteredProductCategoryfile> localVarReturnType = new ParameterizedTypeReference<RegisteredProductCategoryfile>() {};
        return apiClient.invokeAPI(localVarPath, HttpMethod.POST, localVarQueryParams, localVarPostBody, localVarHeaderParams, localVarFormParams, localVarAccept, localVarContentType, localVarAuthNames, localVarReturnType);
    }

    /**
    * <p>Create a new registered product category</p>
     *<p>Creates a new registered product category with the details send in the request.</p>
     * <p><b>201</b> - Registered product category created.
     * <p><b>400</b> - Bad Request.  The server cannot process the request due to a client error. For example, an invalid request.
     * <p><b>401</b> - Unauthorized.  This error is caused when the request has not been applied because there are no valid authentication credentials for the target resource.
     * <p><b>403</b> - Forbidden.  This client error code indicates that the server understood the request but refuses to authorize it.
     * <p><b>500</b> - Internal Server Error.  Failed to create the registered product category.
* @param xSapCrmToken
            The value for the parameter xSapCrmToken
* @return RegisteredProductCategoryfile
* @throws OpenApiRequestException if an error occurs while attempting to invoke the API
     */
    @Nullable   public RegisteredProductCategoryfile createregisteredproductserviceCategory( @Nonnull final String xSapCrmToken) throws OpenApiRequestException {
        return createregisteredproductserviceCategory(xSapCrmToken, null);
    }
    /**
    * <p>Delete a registered product category</p>
     *<p>Deletes the registered product category for the given registered product category code.</p>
     * <p><b>204</b> - Registered product category deleted.
     * <p><b>401</b> - Unauthorized.  This error is caused when the request has not been applied because there are no valid authentication credentials for the target resource.
     * <p><b>403</b> - Forbidden.  This client error code indicates that the server understood the request but refuses to authorize it.
     * <p><b>404</b> - Registered product category not found.
     * <p><b>500</b> - Internal Server Error.  Failed to delete the registered product category.
* @param xSapCrmToken
            The value for the parameter xSapCrmToken
* @param id
        Registered product category code
* @return An OpenApiResponse containing the status code of the HttpResponse.
* @throws OpenApiRequestException if an error occurs while attempting to invoke the API
     */
     @Nonnull  public OpenApiResponse deleteregisteredproductserviceCategory( @Nonnull final String xSapCrmToken,  @Nonnull final String id) throws OpenApiRequestException {
        final Object localVarPostBody = null;
        
        // verify the required parameter 'xSapCrmToken' is set
        if (xSapCrmToken == null) {
            throw new OpenApiRequestException("Missing the required parameter 'xSapCrmToken' when calling deleteregisteredproductserviceCategory");
        }
        
        // verify the required parameter 'id' is set
        if (id == null) {
            throw new OpenApiRequestException("Missing the required parameter 'id' when calling deleteregisteredproductserviceCategory");
        }
        
        // create path and map variables
        final Map<String, Object> localVarPathParams = new HashMap<String, Object>();
        localVarPathParams.put("id", id);
        final String localVarPath = UriComponentsBuilder.fromPath("/sap/c4c/api/v1/registered-product-service/registeredProductCategories/{id}").buildAndExpand(localVarPathParams).toUriString();

        final MultiValueMap<String, String> localVarQueryParams = new LinkedMultiValueMap<String, String>();
        final HttpHeaders localVarHeaderParams = new HttpHeaders();
        final MultiValueMap<String, Object> localVarFormParams = new LinkedMultiValueMap<String, Object>();

        if (xSapCrmToken != null)
        localVarHeaderParams.add("x-sap-crm-token", apiClient.parameterToString(xSapCrmToken));

        final String[] localVarAccepts = { 
            "application/json"
        };
        final List<MediaType> localVarAccept = apiClient.selectHeaderAccept(localVarAccepts);
        final String[] localVarContentTypes = { };
        final MediaType localVarContentType = apiClient.selectHeaderContentType(localVarContentTypes);

        final String[] localVarAuthNames = new String[] { "basicAuthentication" };

        final ParameterizedTypeReference<Void> localVarReturnType = new ParameterizedTypeReference<Void>() {};
        apiClient.invokeAPI(localVarPath, HttpMethod.DELETE, localVarQueryParams, localVarPostBody, localVarHeaderParams, localVarFormParams, localVarAccept, localVarContentType, localVarAuthNames, localVarReturnType);
        return new OpenApiResponse(apiClient);
    }
    /**
    * <p>Get all registered product categories</p>
     *<p>Shows all registered product categories in the system.</p>
     * <p><b>200</b> - Retrieved all registered product categories.
     * <p><b>401</b> - Unauthorized.  This error is caused when the request has not been applied because there are no valid authentication credentials for the target resource.
     * <p><b>403</b> - Forbidden.  This client error code indicates that the server understood the request but refuses to authorize it.
     * <p><b>500</b> - Internal Server Error.  Failed to get all registered product categories.
* @param xSapCrmToken
            The value for the parameter xSapCrmToken
* @return RegisteredProductCategoryqueryresponse
* @throws OpenApiRequestException if an error occurs while attempting to invoke the API
     */
    @Nullable   public RegisteredProductCategoryqueryresponse queryregisteredproductserviceCategory( @Nonnull final String xSapCrmToken) throws OpenApiRequestException {
        final Object localVarPostBody = null;
        
        // verify the required parameter 'xSapCrmToken' is set
        if (xSapCrmToken == null) {
            throw new OpenApiRequestException("Missing the required parameter 'xSapCrmToken' when calling queryregisteredproductserviceCategory");
        }
        
        final String localVarPath = UriComponentsBuilder.fromPath("/sap/c4c/api/v1/registered-product-service/registeredProductCategories").build().toUriString();

        final MultiValueMap<String, String> localVarQueryParams = new LinkedMultiValueMap<String, String>();
        final HttpHeaders localVarHeaderParams = new HttpHeaders();
        final MultiValueMap<String, Object> localVarFormParams = new LinkedMultiValueMap<String, Object>();

        if (xSapCrmToken != null)
        localVarHeaderParams.add("x-sap-crm-token", apiClient.parameterToString(xSapCrmToken));

        final String[] localVarAccepts = { 
            "application/json"
        };
        final List<MediaType> localVarAccept = apiClient.selectHeaderAccept(localVarAccepts);
        final String[] localVarContentTypes = { };
        final MediaType localVarContentType = apiClient.selectHeaderContentType(localVarContentTypes);

        final String[] localVarAuthNames = new String[] { "basicAuthentication" };

        final ParameterizedTypeReference<RegisteredProductCategoryqueryresponse> localVarReturnType = new ParameterizedTypeReference<RegisteredProductCategoryqueryresponse>() {};
        return apiClient.invokeAPI(localVarPath, HttpMethod.GET, localVarQueryParams, localVarPostBody, localVarHeaderParams, localVarFormParams, localVarAccept, localVarContentType, localVarAuthNames, localVarReturnType);
    }

    /**
     * <p>Update a registered product category</p>
     *<p>Updates an entire registered product category for the given registered product category code.</p>
     * <p><b>200</b> - Registered product category updated.
     * <p><b>400</b> - Bad Request.  The server cannot process the request due to a client error. For example, an invalid request.
     * <p><b>401</b> - Unauthorized.  This error is caused when the request has not been applied because there are no valid authentication credentials for the target resource.
     * <p><b>403</b> - Forbidden.  This client error code indicates that the server understood the request but refuses to authorize it.
     * <p><b>404</b> - Registered product category not found.
     * <p><b>500</b> - Internal Server Error.  Failed to update the registered product category.
     * @param xSapCrmToken  (required)
        The value for the parameter xSapCrmToken
     * @param id  (required)
        Registered product category code
     * @param registeredProductCategoryupdaterequest  (optional)
        The value for the parameter registeredProductCategoryupdaterequest
     * @return RegisteredProductCategoryfile
     * @throws OpenApiRequestException if an error occurs while attempting to invoke the API
     */
    @Nullable  public RegisteredProductCategoryfile updateregisteredproductserviceCategory( @Nonnull final String xSapCrmToken,  @Nonnull final String id,  @Nullable final RegisteredProductCategoryupdaterequest registeredProductCategoryupdaterequest) throws OpenApiRequestException {
        final Object localVarPostBody = registeredProductCategoryupdaterequest;
        
        // verify the required parameter 'xSapCrmToken' is set
        if (xSapCrmToken == null) {
            throw new OpenApiRequestException("Missing the required parameter 'xSapCrmToken' when calling updateregisteredproductserviceCategory");
        }
        
        // verify the required parameter 'id' is set
        if (id == null) {
            throw new OpenApiRequestException("Missing the required parameter 'id' when calling updateregisteredproductserviceCategory");
        }
        
        // create path and map variables
        final Map<String, Object> localVarPathParams = new HashMap<String, Object>();
        localVarPathParams.put("id", id);
        final String localVarPath = UriComponentsBuilder.fromPath("/sap/c4c/api/v1/registered-product-service/registeredProductCategories/{id}").buildAndExpand(localVarPathParams).toUriString();

        final MultiValueMap<String, String> localVarQueryParams = new LinkedMultiValueMap<String, String>();
        final HttpHeaders localVarHeaderParams = new HttpHeaders();
        final MultiValueMap<String, Object> localVarFormParams = new LinkedMultiValueMap<String, Object>();

        if (xSapCrmToken != null)
            localVarHeaderParams.add("x-sap-crm-token", apiClient.parameterToString(xSapCrmToken));

        final String[] localVarAccepts = { 
            "application/json"
        };
        final List<MediaType> localVarAccept = apiClient.selectHeaderAccept(localVarAccepts);
        final String[] localVarContentTypes = { 
            "application/json"
        };
        final MediaType localVarContentType = apiClient.selectHeaderContentType(localVarContentTypes);

        final String[] localVarAuthNames = new String[] { "basicAuthentication" };

        final ParameterizedTypeReference<RegisteredProductCategoryfile> localVarReturnType = new ParameterizedTypeReference<RegisteredProductCategoryfile>() {};
        return apiClient.invokeAPI(localVarPath, HttpMethod.PUT, localVarQueryParams, localVarPostBody, localVarHeaderParams, localVarFormParams, localVarAccept, localVarContentType, localVarAuthNames, localVarReturnType);
    }

    /**
    * <p>Update a registered product category</p>
     *<p>Updates an entire registered product category for the given registered product category code.</p>
     * <p><b>200</b> - Registered product category updated.
     * <p><b>400</b> - Bad Request.  The server cannot process the request due to a client error. For example, an invalid request.
     * <p><b>401</b> - Unauthorized.  This error is caused when the request has not been applied because there are no valid authentication credentials for the target resource.
     * <p><b>403</b> - Forbidden.  This client error code indicates that the server understood the request but refuses to authorize it.
     * <p><b>404</b> - Registered product category not found.
     * <p><b>500</b> - Internal Server Error.  Failed to update the registered product category.
* @param xSapCrmToken
            The value for the parameter xSapCrmToken
* @param id
        Registered product category code
* @return RegisteredProductCategoryfile
* @throws OpenApiRequestException if an error occurs while attempting to invoke the API
     */
    @Nullable   public RegisteredProductCategoryfile updateregisteredproductserviceCategory( @Nonnull final String xSapCrmToken,  @Nonnull final String id) throws OpenApiRequestException {
        return updateregisteredproductserviceCategory(xSapCrmToken, id, null);
    }
}
