package com.sap.extensionmodules.security;

import com.sap.cloud.sdk.cloudplatform.connectivity.*;
import com.sap.cloud.security.config.ClientCredentials;
import com.sap.cloud.security.xsuaa.client.DefaultOAuth2TokenService;
import com.sap.cloud.security.xsuaa.client.OAuth2TokenResponse;
import com.sap.cloud.security.xsuaa.client.XsuaaDefaultEndpoints;
import com.sap.cloud.security.xsuaa.tokenflows.TokenFlowException;
import com.sap.cloud.security.xsuaa.tokenflows.XsuaaTokenFlows;
import com.sap.extensionmodules.commons.Constants;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;

@Component
public class DestinationInterceptor implements HandlerInterceptor {
    @Autowired Environment env;
    private CloseableHttpClient client;
    @Autowired RequestContextProvider requestContextProvider;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String userToken = requestContextProvider.getRequestContext().getUserToken();
        String jwtToken = fetchTokenForDestinationService();//fetching token to call destination service
        JSONObject resolvedDestination = resolveDestination(jwtToken, userToken);//getting destination details
        JSONObject destinationConfig = resolvedDestination.getJSONObject("destinationConfiguration");
        String authToken = resolvedDestination.getJSONArray("authTokens").getJSONObject(0).getString("value");
        DefaultHttpDestination destination =
                DefaultHttpDestination
                        .builder(destinationConfig.getString("URL"))
                        .authenticationType(AuthenticationType.OAUTH2_SAML_BEARER_ASSERTION)
                        .build();

        RequestContext requestContext = requestContextProvider.getRequestContext();
        requestContext.setAuthToken(authToken);
        requestContext.setDestination(destination);
        requestContextProvider.setRequestContext(requestContext);
        return true;
    }

    public String fetchTokenForDestinationService(){
        String clientId = env.getProperty("clientId");
        String clientSecret = env.getProperty("clientSecret");
        try {
            URI xsuaaUri = new URI(env.getProperty("tokenUrl"));
            // use the XSUAA client library to ease the implementation of the user token exchange flow
            XsuaaTokenFlows tokenFlows = new XsuaaTokenFlows(new DefaultOAuth2TokenService(), new XsuaaDefaultEndpoints(xsuaaUri), new ClientCredentials(clientId, clientSecret));
            OAuth2TokenResponse res = tokenFlows.clientCredentialsTokenFlow().execute();
            String jwtToken = res.getAccessToken();
            return jwtToken;
        } catch (URISyntaxException | TokenFlowException e) {
            throw new RuntimeException(e);
        }
    }

    public JSONObject resolveDestination(String jwtToken, String userToken) throws IOException {
        HttpGet httpGet = new HttpGet(env.getProperty("destinationUri")+Constants.DESTINATION_SERVICE_URL+env.getProperty("sscDestination"));
        httpGet.addHeader("Authorization", "Bearer "+jwtToken);
        httpGet.addHeader("X-user-token", userToken);
        client = HttpClients.createDefault();
        CloseableHttpResponse closeableHttpResponse =  client.execute(httpGet);

        String json = EntityUtils.toString(closeableHttpResponse.getEntity(), StandardCharsets.UTF_8);
        JSONObject jsonObj = new JSONObject(json);
        return jsonObj;
    }

}
