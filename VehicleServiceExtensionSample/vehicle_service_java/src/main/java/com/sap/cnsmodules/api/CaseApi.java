

package com.sap.cnsmodules.api;

import com.sap.cloud.sdk.services.openapi.core.OpenApiRequestException;
import com.sap.cloud.sdk.services.openapi.core.OpenApiResponse;
import com.sap.cloud.sdk.services.openapi.core.AbstractOpenApiService;
import com.sap.cloud.sdk.services.openapi.apiclient.ApiClient;

import com.sap.cnsmodules.model.CaseCreateRequest ; //NOPMD
import com.sap.cnsmodules.model.CasePatchResponse ; //NOPMD
import com.sap.cnsmodules.model.CasePatchUpdateRequest ; //NOPMD
import com.sap.cnsmodules.model.CasePostResponse ; //NOPMD
import com.sap.cnsmodules.model.CasePutResponse ; //NOPMD
import com.sap.cnsmodules.model.CaseQueryResponse ; //NOPMD
import com.sap.cnsmodules.model.CaseReadResponse ; //NOPMD
import com.sap.cnsmodules.model.CaseUpdateRequest ; //NOPMD
import java.time.OffsetDateTime ; //NOPMD
import com.sap.cnsmodules.model.Querycaseservicecase500Response ; //NOPMD
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
* Case Service in version 1.0.0.
*
* Cases are records of service or support requests from an account or individual customer used to track interactions with the requestor. Cases also record details like how much time has passed since the case was created, what actions were taken to resolve the issue, priority or associated products, and much more.  Use this API to view, create, and manage your cases.
*/

public class CaseApi extends AbstractOpenApiService {
    /**
    * Instantiates this API class to invoke operations on the Case Service.
    *
    * @param httpDestination The destination that API should be used with
    */
    public CaseApi( @Nonnull final HttpDestinationProperties httpDestination )
    {
        super(httpDestination);
    }

    /**
    * Instantiates this API class to invoke operations on the Case Service based on a given {@link ApiClient}.
    *
    * @param apiClient
    *            ApiClient to invoke the API on
    */
    @Beta
    public CaseApi( @Nonnull final ApiClient apiClient )
    {
         super(apiClient);
    }

    
    /**
     * <p>Create data</p>
     *<p>Send case information to the system to create a new case entity.</p>
     * <p><b>201</b> - Case created.
     * <p><b>400</b> - Bad Request.  The server cannot process the request due to a client error. For example, an invalid request.
     * <p><b>401</b> - Unauthorized.  This error is caused when the request has not been applied because there are no valid authentication credentials for the target resource.
     * <p><b>403</b> - Forbidden.  This client error code indicates that the server understood the request but refuses to authorize it.
     * <p><b>500</b> - Internal Server Error.  Failed to create the case.
     * @param xSapCrmToken  (required)
        The value for the parameter xSapCrmToken
     * @param caseCreateRequest  (optional)
        The value for the parameter caseCreateRequest
     * @return CasePostResponse
     * @throws OpenApiRequestException if an error occurs while attempting to invoke the API
     */
    @Nullable  public CasePostResponse createcaseservicecase( @Nonnull final String xSapCrmToken,  @Nullable final CaseCreateRequest caseCreateRequest) throws OpenApiRequestException {
        final Object localVarPostBody = caseCreateRequest;
        
        // verify the required parameter 'xSapCrmToken' is set
        if (xSapCrmToken == null) {
            throw new OpenApiRequestException("Missing the required parameter 'xSapCrmToken' when calling createcaseservicecase");
        }
        
        final String localVarPath = UriComponentsBuilder.fromPath("/sap/c4c/api/v1/case-service/cases").build().toUriString();

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

        final ParameterizedTypeReference<CasePostResponse> localVarReturnType = new ParameterizedTypeReference<CasePostResponse>() {};
        return apiClient.invokeAPI(localVarPath, HttpMethod.POST, localVarQueryParams, localVarPostBody, localVarHeaderParams, localVarFormParams, localVarAccept, localVarContentType, localVarAuthNames, localVarReturnType);
    }

    /**
    * <p>Create data</p>
     *<p>Send case information to the system to create a new case entity.</p>
     * <p><b>201</b> - Case created.
     * <p><b>400</b> - Bad Request.  The server cannot process the request due to a client error. For example, an invalid request.
     * <p><b>401</b> - Unauthorized.  This error is caused when the request has not been applied because there are no valid authentication credentials for the target resource.
     * <p><b>403</b> - Forbidden.  This client error code indicates that the server understood the request but refuses to authorize it.
     * <p><b>500</b> - Internal Server Error.  Failed to create the case.
* @param xSapCrmToken
            The value for the parameter xSapCrmToken
* @return CasePostResponse
* @throws OpenApiRequestException if an error occurs while attempting to invoke the API
     */
    @Nullable   public CasePostResponse createcaseservicecase( @Nonnull final String xSapCrmToken) throws OpenApiRequestException {
        return createcaseservicecase(xSapCrmToken, null);
    }

    /**
     * <p>Update or Modify data</p>
     *<p>Update case attributes in the system.</p>
     * <p><b>200</b> - Case updated.  The case was updated successfully.
     * <p><b>400</b> - Bad Request.  The server cannot process the request due to a client error. For example, an invalid request.
     * <p><b>401</b> - Unauthorized.  This error is caused when the request has not been applied because there are no valid authentication credentials for the target resource.
     * <p><b>403</b> - Forbidden.  This client error code indicates that the server understood the request but refuses to authorize it.
     * <p><b>404</b> - Case not found.
     * <p><b>412</b> - Precondition failed.
     * <p><b>428</b> - Precondition required.
     * <p><b>500</b> - Internal Server Error.  Failed to update the case.
     * @param xSapCrmToken  (required)
        The value for the parameter xSapCrmToken
     * @param ifMatch  (required)
        Used for conflict management when a consumer tries to update a resource. This parameter checks if the state of the resource known to the client (etag) matches the state on the server and if true, allows the update to continue.
     * @param id  (required)
        Case ID
     * @param casePatchUpdateRequest  (optional)
        The value for the parameter casePatchUpdateRequest
     * @return CasePatchResponse
     * @throws OpenApiRequestException if an error occurs while attempting to invoke the API
     */
    @Nullable  public CasePatchResponse modifycaseservicecase( @Nonnull final String xSapCrmToken,  @Nonnull final OffsetDateTime ifMatch,  @Nonnull final UUID id,  @Nullable final CasePatchUpdateRequest casePatchUpdateRequest) throws OpenApiRequestException {
        final Object localVarPostBody = casePatchUpdateRequest;
        
        // verify the required parameter 'xSapCrmToken' is set
        if (xSapCrmToken == null) {
            throw new OpenApiRequestException("Missing the required parameter 'xSapCrmToken' when calling modifycaseservicecase");
        }
        
        // verify the required parameter 'ifMatch' is set
        if (ifMatch == null) {
            throw new OpenApiRequestException("Missing the required parameter 'ifMatch' when calling modifycaseservicecase");
        }
        
        // verify the required parameter 'id' is set
        if (id == null) {
            throw new OpenApiRequestException("Missing the required parameter 'id' when calling modifycaseservicecase");
        }
        
        // create path and map variables
        final Map<String, Object> localVarPathParams = new HashMap<String, Object>();
        localVarPathParams.put("id", id);
        final String localVarPath = UriComponentsBuilder.fromPath("/sap/c4c/api/v1/case-service/cases/{id}").buildAndExpand(localVarPathParams).toUriString();

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

        final ParameterizedTypeReference<CasePatchResponse> localVarReturnType = new ParameterizedTypeReference<CasePatchResponse>() {};
        return apiClient.invokeAPI(localVarPath, HttpMethod.PATCH, localVarQueryParams, localVarPostBody, localVarHeaderParams, localVarFormParams, localVarAccept, localVarContentType, localVarAuthNames, localVarReturnType);
    }

    /**
    * <p>Update or Modify data</p>
     *<p>Update case attributes in the system.</p>
     * <p><b>200</b> - Case updated.  The case was updated successfully.
     * <p><b>400</b> - Bad Request.  The server cannot process the request due to a client error. For example, an invalid request.
     * <p><b>401</b> - Unauthorized.  This error is caused when the request has not been applied because there are no valid authentication credentials for the target resource.
     * <p><b>403</b> - Forbidden.  This client error code indicates that the server understood the request but refuses to authorize it.
     * <p><b>404</b> - Case not found.
     * <p><b>412</b> - Precondition failed.
     * <p><b>428</b> - Precondition required.
     * <p><b>500</b> - Internal Server Error.  Failed to update the case.
* @param xSapCrmToken
            The value for the parameter xSapCrmToken
* @param ifMatch
        Used for conflict management when a consumer tries to update a resource. This parameter checks if the state of the resource known to the client (etag) matches the state on the server and if true, allows the update to continue.
* @param id
        Case ID
* @return CasePatchResponse
* @throws OpenApiRequestException if an error occurs while attempting to invoke the API
     */
    @Nullable   public CasePatchResponse modifycaseservicecase( @Nonnull final String xSapCrmToken,  @Nonnull final OffsetDateTime ifMatch,  @Nonnull final UUID id) throws OpenApiRequestException {
        return modifycaseservicecase(xSapCrmToken, ifMatch, id, null);
    }

    /**
     * <p>Read data</p>
     *<p>Specify query parameters to return desired case records from the system.</p>
     * <p><b>200</b> - Retrieved cases.
     * <p><b>401</b> - Unauthorized.  This error is caused when the request has not been applied because there are no valid authentication credentials for the target resource.
     * <p><b>403</b> - Forbidden.  This client error code indicates that the server understood the request but refuses to authorize it.
     * <p><b>500</b> - Internal Server Error.  Failed to query cases.
     * @param xSapCrmToken  (required)
        The value for the parameter xSapCrmToken
     * @param $top  (optional)
        Show only the first n cases.
     * @param $skip  (optional)
        Skip the first n cases.
     * @param $search  (optional)
        Search for a string within case.
     * @param $orderby  (optional)
        Order cases by attribute.
     * @param $filter  (optional)
        Filter cases by attribute.
     * @param $select  (optional)
        Select attributes to be returned.
     * @param $exclude  (optional)
        Exclude attributes from response.
     * @param $count  (optional)
        Indicates if count of cases to be returned.
     * @param $query  (optional)
        Indicates the query to be used by case service.
     * @return CaseQueryResponse
     * @throws OpenApiRequestException if an error occurs while attempting to invoke the API
     */
    @Nullable  public CaseQueryResponse querycaseservicecase( @Nonnull final String xSapCrmToken,  @Nullable final Integer $top,  @Nullable final Integer $skip,  @Nullable final String $search,  @Nullable final String $orderby,  @Nullable final String $filter,  @Nullable final String $select,  @Nullable final String $exclude,  @Nullable final Boolean $count,  @Nullable final String $query) throws OpenApiRequestException {
        final Object localVarPostBody = null;
        
        // verify the required parameter 'xSapCrmToken' is set
        if (xSapCrmToken == null) {
            throw new OpenApiRequestException("Missing the required parameter 'xSapCrmToken' when calling querycaseservicecase");
        }
        
        final String localVarPath = UriComponentsBuilder.fromPath("/sap/c4c/api/v1/case-service/cases").build().toUriString();

        final MultiValueMap<String, String> localVarQueryParams = new LinkedMultiValueMap<String, String>();
        final HttpHeaders localVarHeaderParams = new HttpHeaders();
        final MultiValueMap<String, Object> localVarFormParams = new LinkedMultiValueMap<String, Object>();

        localVarQueryParams.putAll(apiClient.parameterToMultiValueMap(null, "$top", $top));
        localVarQueryParams.putAll(apiClient.parameterToMultiValueMap(null, "$skip", $skip));
        localVarQueryParams.putAll(apiClient.parameterToMultiValueMap(null, "$search", $search));
        localVarQueryParams.putAll(apiClient.parameterToMultiValueMap(null, "$orderby", $orderby));
        localVarQueryParams.putAll(apiClient.parameterToMultiValueMap(null, "$filter", $filter));
        localVarQueryParams.putAll(apiClient.parameterToMultiValueMap(null, "$select", $select));
        localVarQueryParams.putAll(apiClient.parameterToMultiValueMap(null, "$exclude", $exclude));
        localVarQueryParams.putAll(apiClient.parameterToMultiValueMap(null, "$count", $count));
        localVarQueryParams.putAll(apiClient.parameterToMultiValueMap(null, "$query", $query));

        if (xSapCrmToken != null)
            localVarHeaderParams.add("x-sap-crm-token", apiClient.parameterToString(xSapCrmToken));

        final String[] localVarAccepts = { 
            "application/json"
        };
        final List<MediaType> localVarAccept = apiClient.selectHeaderAccept(localVarAccepts);
        final String[] localVarContentTypes = { };
        final MediaType localVarContentType = apiClient.selectHeaderContentType(localVarContentTypes);

        final String[] localVarAuthNames = new String[] { "basicAuthentication" };

        final ParameterizedTypeReference<CaseQueryResponse> localVarReturnType = new ParameterizedTypeReference<CaseQueryResponse>() {};
        return apiClient.invokeAPI(localVarPath, HttpMethod.GET, localVarQueryParams, localVarPostBody, localVarHeaderParams, localVarFormParams, localVarAccept, localVarContentType, localVarAuthNames, localVarReturnType);
    }

    /**
    * <p>Read data</p>
     *<p>Specify query parameters to return desired case records from the system.</p>
     * <p><b>200</b> - Retrieved cases.
     * <p><b>401</b> - Unauthorized.  This error is caused when the request has not been applied because there are no valid authentication credentials for the target resource.
     * <p><b>403</b> - Forbidden.  This client error code indicates that the server understood the request but refuses to authorize it.
     * <p><b>500</b> - Internal Server Error.  Failed to query cases.
* @param xSapCrmToken
            The value for the parameter xSapCrmToken
* @return CaseQueryResponse
* @throws OpenApiRequestException if an error occurs while attempting to invoke the API
     */
    @Nullable   public CaseQueryResponse querycaseservicecase( @Nonnull final String xSapCrmToken) throws OpenApiRequestException {
        return querycaseservicecase(xSapCrmToken, null, null, null, null, null, null, null, null, null);
    }
    /**
    * <p>Read a specific data</p>
     *<p>Query the system for a specific case using the case ID.</p>
     * <p><b>200</b> - Retrieved case.
     * <p><b>401</b> - Unauthorized.  This error is caused when the request has not been applied because there are no valid authentication credentials for the target resource.
     * <p><b>403</b> - Forbidden  This client error code indicates that the server understood the request but refuses to authorize it.
     * <p><b>404</b> - Case not found.
     * <p><b>500</b> - Internal Server Error.  Failed to read the case.
* @param xSapCrmToken
            The value for the parameter xSapCrmToken
* @param id
        Case ID
* @return CaseReadResponse
* @throws OpenApiRequestException if an error occurs while attempting to invoke the API
     */
    @Nullable   public CaseReadResponse readcaseservicecase( @Nonnull final String xSapCrmToken,  @Nonnull final UUID id) throws OpenApiRequestException {
        final Object localVarPostBody = null;
        
        // verify the required parameter 'xSapCrmToken' is set
        if (xSapCrmToken == null) {
            throw new OpenApiRequestException("Missing the required parameter 'xSapCrmToken' when calling readcaseservicecase");
        }
        
        // verify the required parameter 'id' is set
        if (id == null) {
            throw new OpenApiRequestException("Missing the required parameter 'id' when calling readcaseservicecase");
        }
        
        // create path and map variables
        final Map<String, Object> localVarPathParams = new HashMap<String, Object>();
        localVarPathParams.put("id", id);
        final String localVarPath = UriComponentsBuilder.fromPath("/sap/c4c/api/v1/case-service/cases/{id}").buildAndExpand(localVarPathParams).toUriString();

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

        final ParameterizedTypeReference<CaseReadResponse> localVarReturnType = new ParameterizedTypeReference<CaseReadResponse>() {};
        return apiClient.invokeAPI(localVarPath, HttpMethod.GET, localVarQueryParams, localVarPostBody, localVarHeaderParams, localVarFormParams, localVarAccept, localVarContentType, localVarAuthNames, localVarReturnType);
    }

    /**
     * <p>Create or Update data</p>
     *<p>Add attributes to a specific case by ID.</p>
     * <p><b>200</b> - Case updated.
     * <p><b>400</b> - Bad Request.  The server cannot process the request due to a client error. For example, an invalid request.
     * <p><b>401</b> - Unauthorized.  This error is caused when the request has not been applied because there are no valid authentication credentials for the target resource.
     * <p><b>403</b> - Forbidden.  This client error code indicates that the server understood the request but refuses to authorize it.
     * <p><b>404</b> - Case not found.
     * <p><b>500</b> - Internal Server Error.  Failed to update the case.
     * @param xSapCrmToken  (required)
        The value for the parameter xSapCrmToken
     * @param id  (required)
        Case ID
     * @param caseUpdateRequest  (optional)
        The value for the parameter caseUpdateRequest
     * @return CasePutResponse
     * @throws OpenApiRequestException if an error occurs while attempting to invoke the API
     */
    @Nullable  public CasePutResponse updatecaseservicecase( @Nonnull final String xSapCrmToken,  @Nonnull final UUID id,  @Nullable final CaseUpdateRequest caseUpdateRequest) throws OpenApiRequestException {
        final Object localVarPostBody = caseUpdateRequest;
        
        // verify the required parameter 'xSapCrmToken' is set
        if (xSapCrmToken == null) {
            throw new OpenApiRequestException("Missing the required parameter 'xSapCrmToken' when calling updatecaseservicecase");
        }
        
        // verify the required parameter 'id' is set
        if (id == null) {
            throw new OpenApiRequestException("Missing the required parameter 'id' when calling updatecaseservicecase");
        }
        
        // create path and map variables
        final Map<String, Object> localVarPathParams = new HashMap<String, Object>();
        localVarPathParams.put("id", id);
        final String localVarPath = UriComponentsBuilder.fromPath("/sap/c4c/api/v1/case-service/cases/{id}").buildAndExpand(localVarPathParams).toUriString();

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

        final ParameterizedTypeReference<CasePutResponse> localVarReturnType = new ParameterizedTypeReference<CasePutResponse>() {};
        return apiClient.invokeAPI(localVarPath, HttpMethod.PUT, localVarQueryParams, localVarPostBody, localVarHeaderParams, localVarFormParams, localVarAccept, localVarContentType, localVarAuthNames, localVarReturnType);
    }

    /**
    * <p>Create or Update data</p>
     *<p>Add attributes to a specific case by ID.</p>
     * <p><b>200</b> - Case updated.
     * <p><b>400</b> - Bad Request.  The server cannot process the request due to a client error. For example, an invalid request.
     * <p><b>401</b> - Unauthorized.  This error is caused when the request has not been applied because there are no valid authentication credentials for the target resource.
     * <p><b>403</b> - Forbidden.  This client error code indicates that the server understood the request but refuses to authorize it.
     * <p><b>404</b> - Case not found.
     * <p><b>500</b> - Internal Server Error.  Failed to update the case.
* @param xSapCrmToken
            The value for the parameter xSapCrmToken
* @param id
        Case ID
* @return CasePutResponse
* @throws OpenApiRequestException if an error occurs while attempting to invoke the API
     */
    @Nullable   public CasePutResponse updatecaseservicecase( @Nonnull final String xSapCrmToken,  @Nonnull final UUID id) throws OpenApiRequestException {
        return updatecaseservicecase(xSapCrmToken, id, null);
    }
}
