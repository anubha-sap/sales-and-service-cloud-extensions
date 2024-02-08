

package com.sap.cnsmodules.api;

import com.sap.cloud.sdk.services.openapi.core.OpenApiRequestException;
import com.sap.cloud.sdk.services.openapi.core.OpenApiResponse;
import com.sap.cloud.sdk.services.openapi.core.AbstractOpenApiService;
import com.sap.cloud.sdk.services.openapi.apiclient.ApiClient;

import com.sap.cnsmodules.model.Error ; //NOPMD
import java.time.OffsetDateTime ; //NOPMD
import com.sap.cnsmodules.model.RegisteredProductcreaterequest ; //NOPMD
import com.sap.cnsmodules.model.RegisteredProductfile ; //NOPMD
import com.sap.cnsmodules.model.RegisteredProductpatchupdaterequest ; //NOPMD
import com.sap.cnsmodules.model.RegisteredProductqueryresponse ; //NOPMD
import com.sap.cnsmodules.model.RegisteredProductupdaterequest ; //NOPMD
import java.util.UUID ; //NOPMD

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

public class RegisteredProductApi extends AbstractOpenApiService {
    /**
    * Instantiates this API class to invoke operations on the Registered Product Service.
    *
    * @param httpDestination The destination that API should be used with
    */
    public RegisteredProductApi( @Nonnull final HttpDestinationProperties httpDestination )
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
    public RegisteredProductApi( @Nonnull final ApiClient apiClient )
    {
         super(apiClient);
    }

    
    /**
     * <p>Create a new registered product</p>
     *<p>Creates a new registered product entity with the details send in the request.</p>
     * <p><b>201</b> - Registered product created.
     * <p><b>400</b> - Bad Request.  The server cannot process the request due to a client error. For example, an invalid request.
     * <p><b>401</b> - Unauthorized.  This error is caused when the request has not been applied because there are no valid authentication credentials for the target resource.
     * <p><b>403</b> - Forbidden.  This client error code indicates that the server understood the request but refuses to authorize it.
     * <p><b>500</b> - Internal Server Error.  Failed to create the registered product.
     * @param xSapCrmToken  (required)
        The value for the parameter xSapCrmToken
     * @param registeredProductcreaterequest  (optional)
        The value for the parameter registeredProductcreaterequest
     * @return RegisteredProductfile
     * @throws OpenApiRequestException if an error occurs while attempting to invoke the API
     */
    @Nullable  public RegisteredProductfile createregisteredproductservice( @Nonnull final String xSapCrmToken,  @Nullable final RegisteredProductcreaterequest registeredProductcreaterequest) throws OpenApiRequestException {
        final Object localVarPostBody = registeredProductcreaterequest;
        
        // verify the required parameter 'xSapCrmToken' is set
        if (xSapCrmToken == null) {
            throw new OpenApiRequestException("Missing the required parameter 'xSapCrmToken' when calling createregisteredproductservice");
        }
        
        final String localVarPath = UriComponentsBuilder.fromPath("/sap/c4c/api/v1/registered-product-service/registeredProducts").build().toUriString();

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

        final ParameterizedTypeReference<RegisteredProductfile> localVarReturnType = new ParameterizedTypeReference<RegisteredProductfile>() {};
        return apiClient.invokeAPI(localVarPath, HttpMethod.POST, localVarQueryParams, localVarPostBody, localVarHeaderParams, localVarFormParams, localVarAccept, localVarContentType, localVarAuthNames, localVarReturnType);
    }

    /**
    * <p>Create a new registered product</p>
     *<p>Creates a new registered product entity with the details send in the request.</p>
     * <p><b>201</b> - Registered product created.
     * <p><b>400</b> - Bad Request.  The server cannot process the request due to a client error. For example, an invalid request.
     * <p><b>401</b> - Unauthorized.  This error is caused when the request has not been applied because there are no valid authentication credentials for the target resource.
     * <p><b>403</b> - Forbidden.  This client error code indicates that the server understood the request but refuses to authorize it.
     * <p><b>500</b> - Internal Server Error.  Failed to create the registered product.
* @param xSapCrmToken
            The value for the parameter xSapCrmToken
* @return RegisteredProductfile
* @throws OpenApiRequestException if an error occurs while attempting to invoke the API
     */
    @Nullable   public RegisteredProductfile createregisteredproductservice( @Nonnull final String xSapCrmToken) throws OpenApiRequestException {
        return createregisteredproductservice(xSapCrmToken, null);
    }
    /**
    * <p>Delete a registered product</p>
     *<p>Deletes the registered product entity for the given registered product ID.</p>
     * <p><b>204</b> - Registered product deleted.
     * <p><b>401</b> - Unauthorized.  This error is caused when the request has not been applied because there are no valid authentication credentials for the target resource.
     * <p><b>403</b> - Forbidden.  This client error code indicates that the server understood the request but refuses to authorize it.
     * <p><b>404</b> - Registered product not found.
     * <p><b>500</b> - Internal Server Error.  Failed to delete the registered product.
* @param xSapCrmToken
            The value for the parameter xSapCrmToken
* @param id
        Registered product ID
* @return An OpenApiResponse containing the status code of the HttpResponse.
* @throws OpenApiRequestException if an error occurs while attempting to invoke the API
     */
     @Nonnull  public OpenApiResponse deleteregisteredproductservice( @Nonnull final String xSapCrmToken,  @Nonnull final UUID id) throws OpenApiRequestException {
        final Object localVarPostBody = null;
        
        // verify the required parameter 'xSapCrmToken' is set
        if (xSapCrmToken == null) {
            throw new OpenApiRequestException("Missing the required parameter 'xSapCrmToken' when calling deleteregisteredproductservice");
        }
        
        // verify the required parameter 'id' is set
        if (id == null) {
            throw new OpenApiRequestException("Missing the required parameter 'id' when calling deleteregisteredproductservice");
        }
        
        // create path and map variables
        final Map<String, Object> localVarPathParams = new HashMap<String, Object>();
        localVarPathParams.put("id", id);
        final String localVarPath = UriComponentsBuilder.fromPath("/sap/c4c/api/v1/registered-product-service/registeredProducts/{id}").buildAndExpand(localVarPathParams).toUriString();

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
     * <p>Modify a registered product</p>
     *<p>Modifies the registered product entity for the given registered product ID.</p>
     * <p><b>200</b> - Registered product updated.
     * <p><b>204</b> - Successful response without content.  Update request had no effective change to make on resource.
     * <p><b>400</b> - Bad Request.  The server cannot process the request due to a client error. For example, an invalid request.
     * <p><b>401</b> - Unauthorized.  This error is caused when the request has not been applied because there are no valid authentication credentials for the target resource.
     * <p><b>403</b> - Forbidden.  This client error code indicates that the server understood the request but refuses to authorize it.
     * <p><b>404</b> - Registered product not found.
     * <p><b>412</b> - Precondition failed.
     * <p><b>428</b> - Precondition required.
     * <p><b>500</b> - Internal Server Error.  Failed to update the registered product.
     * @param xSapCrmToken  (required)
        The value for the parameter xSapCrmToken
     * @param ifMatch  (required)
        Used for conflict management when a consumer tries to update a resource. This parameter checks if the state of the resource known to the client (etag) matches the state on the server and if true, allows the update to continue.
     * @param id  (required)
        Registered product ID
     * @param registeredProductpatchupdaterequest  (optional)
        The value for the parameter registeredProductpatchupdaterequest
     * @return RegisteredProductfile
     * @throws OpenApiRequestException if an error occurs while attempting to invoke the API
     */
    @Nullable  public RegisteredProductfile modifyregisteredproductservice( @Nonnull final String xSapCrmToken,  @Nonnull final OffsetDateTime ifMatch,  @Nonnull final UUID id,  @Nullable final RegisteredProductpatchupdaterequest registeredProductpatchupdaterequest) throws OpenApiRequestException {
        final Object localVarPostBody = registeredProductpatchupdaterequest;
        
        // verify the required parameter 'xSapCrmToken' is set
        if (xSapCrmToken == null) {
            throw new OpenApiRequestException("Missing the required parameter 'xSapCrmToken' when calling modifyregisteredproductservice");
        }
        
        // verify the required parameter 'ifMatch' is set
        if (ifMatch == null) {
            throw new OpenApiRequestException("Missing the required parameter 'ifMatch' when calling modifyregisteredproductservice");
        }
        
        // verify the required parameter 'id' is set
        if (id == null) {
            throw new OpenApiRequestException("Missing the required parameter 'id' when calling modifyregisteredproductservice");
        }
        
        // create path and map variables
        final Map<String, Object> localVarPathParams = new HashMap<String, Object>();
        localVarPathParams.put("id", id);
        final String localVarPath = UriComponentsBuilder.fromPath("/sap/c4c/api/v1/registered-product-service/registeredProducts/{id}").buildAndExpand(localVarPathParams).toUriString();

        final MultiValueMap<String, String> localVarQueryParams = new LinkedMultiValueMap<String, String>();
        final HttpHeaders localVarHeaderParams = new HttpHeaders();
        final MultiValueMap<String, Object> localVarFormParams = new LinkedMultiValueMap<String, Object>();

        if (xSapCrmToken != null)
            localVarHeaderParams.add("x-sap-crm-token", apiClient.parameterToString(xSapCrmToken));
        if (ifMatch != null)
            localVarHeaderParams.add("If-Match", apiClient.parameterToString(ifMatch));

        final String[] localVarAccepts = { 
            "application/json"
        };
        final List<MediaType> localVarAccept = apiClient.selectHeaderAccept(localVarAccepts);
        final String[] localVarContentTypes = { 
            "application/json"
        };
        final MediaType localVarContentType = apiClient.selectHeaderContentType(localVarContentTypes);

        final String[] localVarAuthNames = new String[] { "basicAuthentication" };

        final ParameterizedTypeReference<RegisteredProductfile> localVarReturnType = new ParameterizedTypeReference<RegisteredProductfile>() {};
        return apiClient.invokeAPI(localVarPath, HttpMethod.PATCH, localVarQueryParams, localVarPostBody, localVarHeaderParams, localVarFormParams, localVarAccept, localVarContentType, localVarAuthNames, localVarReturnType);
    }

    /**
    * <p>Modify a registered product</p>
     *<p>Modifies the registered product entity for the given registered product ID.</p>
     * <p><b>200</b> - Registered product updated.
     * <p><b>204</b> - Successful response without content.  Update request had no effective change to make on resource.
     * <p><b>400</b> - Bad Request.  The server cannot process the request due to a client error. For example, an invalid request.
     * <p><b>401</b> - Unauthorized.  This error is caused when the request has not been applied because there are no valid authentication credentials for the target resource.
     * <p><b>403</b> - Forbidden.  This client error code indicates that the server understood the request but refuses to authorize it.
     * <p><b>404</b> - Registered product not found.
     * <p><b>412</b> - Precondition failed.
     * <p><b>428</b> - Precondition required.
     * <p><b>500</b> - Internal Server Error.  Failed to update the registered product.
* @param xSapCrmToken
            The value for the parameter xSapCrmToken
* @param ifMatch
        Used for conflict management when a consumer tries to update a resource. This parameter checks if the state of the resource known to the client (etag) matches the state on the server and if true, allows the update to continue.
* @param id
        Registered product ID
* @return RegisteredProductfile
* @throws OpenApiRequestException if an error occurs while attempting to invoke the API
     */
    @Nullable   public RegisteredProductfile modifyregisteredproductservice( @Nonnull final String xSapCrmToken,  @Nonnull final OffsetDateTime ifMatch,  @Nonnull final UUID id) throws OpenApiRequestException {
        return modifyregisteredproductservice(xSapCrmToken, ifMatch, id, null);
    }

    /**
     * <p>Query registered products</p>
     *<p>Shows all registered product entities that matches the supplied query parameters.</p>
     * <p><b>200</b> - Retrieved registered products.
     * <p><b>401</b> - Unauthorized.  This error is caused when the request has not been applied because there are no valid authentication credentials for the target resource.
     * <p><b>403</b> - Forbidden.  This client error code indicates that the server understood the request but refuses to authorize it.
     * <p><b>500</b> - Internal Server Error.  Failed to query registered products.
     * @param xSapCrmToken  (required)
        The value for the parameter xSapCrmToken
     * @param $top  (optional)
        Show only the first n registered products.
     * @param $skip  (optional)
        Skip the first n registered products.
     * @param $search  (optional)
        Search for a string within a registered product.
     * @param $orderby  (optional)
        Order registered products by attribute.
     * @param $filter  (optional)
        Filter registered products by attribute.
     * @param $select  (optional)
        Select attributes to be returned.
     * @param $count  (optional)
        Indicates if count of registered products needs to be returned.
     * @return RegisteredProductqueryresponse
     * @throws OpenApiRequestException if an error occurs while attempting to invoke the API
     */
    @Nullable  public RegisteredProductqueryresponse queryregisteredproductservice( @Nonnull final String xSapCrmToken,  @Nullable final Integer $top,  @Nullable final Integer $skip,  @Nullable final String $search,  @Nullable final String $orderby,  @Nullable final String $filter,  @Nullable final String $select,  @Nullable final Boolean $count) throws OpenApiRequestException {
        final Object localVarPostBody = null;
        
        // verify the required parameter 'xSapCrmToken' is set
        if (xSapCrmToken == null) {
            throw new OpenApiRequestException("Missing the required parameter 'xSapCrmToken' when calling queryregisteredproductservice");
        }
        
        final String localVarPath = UriComponentsBuilder.fromPath("/sap/c4c/api/v1/registered-product-service/registeredProducts").build().toUriString();

        final MultiValueMap<String, String> localVarQueryParams = new LinkedMultiValueMap<String, String>();
        final HttpHeaders localVarHeaderParams = new HttpHeaders();
        final MultiValueMap<String, Object> localVarFormParams = new LinkedMultiValueMap<String, Object>();

        localVarQueryParams.putAll(apiClient.parameterToMultiValueMap(null, "$top", $top));
        localVarQueryParams.putAll(apiClient.parameterToMultiValueMap(null, "$skip", $skip));
        localVarQueryParams.putAll(apiClient.parameterToMultiValueMap(null, "$search", $search));
        localVarQueryParams.putAll(apiClient.parameterToMultiValueMap(null, "$orderby", $orderby));
        localVarQueryParams.putAll(apiClient.parameterToMultiValueMap(null, "$filter", $filter));
        localVarQueryParams.putAll(apiClient.parameterToMultiValueMap(null, "$select", $select));
        localVarQueryParams.putAll(apiClient.parameterToMultiValueMap(null, "$count", $count));

        if (xSapCrmToken != null)
            localVarHeaderParams.add("x-sap-crm-token", apiClient.parameterToString(xSapCrmToken));

        final String[] localVarAccepts = { 
            "application/json"
        };
        final List<MediaType> localVarAccept = apiClient.selectHeaderAccept(localVarAccepts);
        final String[] localVarContentTypes = { };
        final MediaType localVarContentType = apiClient.selectHeaderContentType(localVarContentTypes);

        final String[] localVarAuthNames = new String[] { "basicAuthentication" };

        final ParameterizedTypeReference<RegisteredProductqueryresponse> localVarReturnType = new ParameterizedTypeReference<RegisteredProductqueryresponse>() {};
        return apiClient.invokeAPI(localVarPath, HttpMethod.GET, localVarQueryParams, localVarPostBody, localVarHeaderParams, localVarFormParams, localVarAccept, localVarContentType, localVarAuthNames, localVarReturnType);
    }

    /**
    * <p>Query registered products</p>
     *<p>Shows all registered product entities that matches the supplied query parameters.</p>
     * <p><b>200</b> - Retrieved registered products.
     * <p><b>401</b> - Unauthorized.  This error is caused when the request has not been applied because there are no valid authentication credentials for the target resource.
     * <p><b>403</b> - Forbidden.  This client error code indicates that the server understood the request but refuses to authorize it.
     * <p><b>500</b> - Internal Server Error.  Failed to query registered products.
* @param xSapCrmToken
            The value for the parameter xSapCrmToken
* @return RegisteredProductqueryresponse
* @throws OpenApiRequestException if an error occurs while attempting to invoke the API
     */
    @Nullable   public RegisteredProductqueryresponse queryregisteredproductservice( @Nonnull final String xSapCrmToken) throws OpenApiRequestException {
        return queryregisteredproductservice(xSapCrmToken, null, null, null, null, null, null, null);
    }
    /**
    * <p>View registered product by registered product ID</p>
     *<p>Shows the registered product entity for the given registered product ID.</p>
     * <p><b>200</b> - Retrieved registered product.
     * <p><b>401</b> - Unauthorized.  This error is caused when the request has not been applied because there are no valid authentication credentials for the target resource.
     * <p><b>403</b> - Forbidden.  This client error code indicates that the server understood the request but refuses to authorize it.
     * <p><b>404</b> - Registered product not found.
     * <p><b>500</b> - Internal Server Error.  Failed to read the registered product.
* @param xSapCrmToken
            The value for the parameter xSapCrmToken
* @param id
        Registered product ID
* @return RegisteredProductfile
* @throws OpenApiRequestException if an error occurs while attempting to invoke the API
     */
    @Nullable   public RegisteredProductfile readregisteredproductservice( @Nonnull final String xSapCrmToken,  @Nonnull final UUID id) throws OpenApiRequestException {
        final Object localVarPostBody = null;
        
        // verify the required parameter 'xSapCrmToken' is set
        if (xSapCrmToken == null) {
            throw new OpenApiRequestException("Missing the required parameter 'xSapCrmToken' when calling readregisteredproductservice");
        }
        
        // verify the required parameter 'id' is set
        if (id == null) {
            throw new OpenApiRequestException("Missing the required parameter 'id' when calling readregisteredproductservice");
        }
        
        // create path and map variables
        final Map<String, Object> localVarPathParams = new HashMap<String, Object>();
        localVarPathParams.put("id", id);
        final String localVarPath = UriComponentsBuilder.fromPath("/sap/c4c/api/v1/registered-product-service/registeredProducts/{id}").buildAndExpand(localVarPathParams).toUriString();

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

        final ParameterizedTypeReference<RegisteredProductfile> localVarReturnType = new ParameterizedTypeReference<RegisteredProductfile>() {};
        return apiClient.invokeAPI(localVarPath, HttpMethod.GET, localVarQueryParams, localVarPostBody, localVarHeaderParams, localVarFormParams, localVarAccept, localVarContentType, localVarAuthNames, localVarReturnType);
    }

    /**
     * <p>Update a registered product</p>
     *<p>Updates an entire registered product entity for the given registered product ID.</p>
     * <p><b>200</b> - Registered product updated.
     * <p><b>204</b> - Successful response without content.  Update request had no effective change to make on resource.
     * <p><b>400</b> - Bad Request.  The server cannot process the request due to a client error. For example, an invalid request.
     * <p><b>401</b> - Unauthorized.  This error is caused when the request has not been applied because there are no valid authentication credentials for the target resource.
     * <p><b>403</b> - Forbidden.  This client error code indicates that the server understood the request but refuses to authorize it.
     * <p><b>404</b> - Registered product not found.
     * <p><b>500</b> - Internal Server Error.  Failed to update the registered product.
     * @param xSapCrmToken  (required)
        The value for the parameter xSapCrmToken
     * @param id  (required)
        Registered product ID
     * @param registeredProductupdaterequest  (optional)
        The value for the parameter registeredProductupdaterequest
     * @return RegisteredProductfile
     * @throws OpenApiRequestException if an error occurs while attempting to invoke the API
     */
    @Nullable  public RegisteredProductfile updateregisteredproductservice( @Nonnull final String xSapCrmToken,  @Nonnull final UUID id,  @Nullable final RegisteredProductupdaterequest registeredProductupdaterequest) throws OpenApiRequestException {
        final Object localVarPostBody = registeredProductupdaterequest;
        
        // verify the required parameter 'xSapCrmToken' is set
        if (xSapCrmToken == null) {
            throw new OpenApiRequestException("Missing the required parameter 'xSapCrmToken' when calling updateregisteredproductservice");
        }
        
        // verify the required parameter 'id' is set
        if (id == null) {
            throw new OpenApiRequestException("Missing the required parameter 'id' when calling updateregisteredproductservice");
        }
        
        // create path and map variables
        final Map<String, Object> localVarPathParams = new HashMap<String, Object>();
        localVarPathParams.put("id", id);
        final String localVarPath = UriComponentsBuilder.fromPath("/sap/c4c/api/v1/registered-product-service/registeredProducts/{id}").buildAndExpand(localVarPathParams).toUriString();

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

        final ParameterizedTypeReference<RegisteredProductfile> localVarReturnType = new ParameterizedTypeReference<RegisteredProductfile>() {};
        return apiClient.invokeAPI(localVarPath, HttpMethod.PUT, localVarQueryParams, localVarPostBody, localVarHeaderParams, localVarFormParams, localVarAccept, localVarContentType, localVarAuthNames, localVarReturnType);
    }

    /**
    * <p>Update a registered product</p>
     *<p>Updates an entire registered product entity for the given registered product ID.</p>
     * <p><b>200</b> - Registered product updated.
     * <p><b>204</b> - Successful response without content.  Update request had no effective change to make on resource.
     * <p><b>400</b> - Bad Request.  The server cannot process the request due to a client error. For example, an invalid request.
     * <p><b>401</b> - Unauthorized.  This error is caused when the request has not been applied because there are no valid authentication credentials for the target resource.
     * <p><b>403</b> - Forbidden.  This client error code indicates that the server understood the request but refuses to authorize it.
     * <p><b>404</b> - Registered product not found.
     * <p><b>500</b> - Internal Server Error.  Failed to update the registered product.
* @param xSapCrmToken
            The value for the parameter xSapCrmToken
* @param id
        Registered product ID
* @return RegisteredProductfile
* @throws OpenApiRequestException if an error occurs while attempting to invoke the API
     */
    @Nullable   public RegisteredProductfile updateregisteredproductservice( @Nonnull final String xSapCrmToken,  @Nonnull final UUID id) throws OpenApiRequestException {
        return updateregisteredproductservice(xSapCrmToken, id, null);
    }
}
