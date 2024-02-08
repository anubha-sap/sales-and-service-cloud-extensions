package com.sap.extensionmodules.security;
import com.sap.cloud.sdk.cloudplatform.connectivity.DefaultHttpDestination;
import com.sap.cloud.security.token.Token;
import com.sap.cloud.security.token.TokenClaims;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.*;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(MockitoJUnitRunner.class)
class SessionInterceptorTest {

    @Mock
    MockHttpServletResponse response;

    @Mock
    RequestContextProvider requestContextProvider;

    @Mock HttpServletRequest request;

    @InjectMocks
    private SessionInterceptor interceptor;



    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void preHandle_ValidToken_ShouldSetSessionAttributes() throws Exception {
        // Arrange
        final String dummyToken =
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqaW0ua2lya0BzYWxlc2Nsb3VkLmNvbSIsImVpZCI6IiIsImxvZyI6MywiaXNzIjoiY29tLnNhcC5jcm0uaWFtIiwibGFuZ3VhZ2UiOiJlbiIsInR5cCI6IjEiLCJub24iOiJGS3VhYXpUWmdVc2o2ZjZudlFmVTEtYXlXX1UiLCJsb2NhbGUiOiJlbi1VUyIsInNwaWQiOiJlZDcyYWUxMi1lYzc3LTExZTktYTYzOS02YmMyMjZkMjg3M2EiLCJhdWQiOiJuc2QxLWRldi5jeG0tc2FsZXNjbG91ZC5jb20iLCJ1aWQiOiJlZDcyYWUxMi1lYzc3LTExZTktYTYzOS02YmMyMjZkMjg3M2EiLCJjNGMiOmZhbHNlLCJ6aWQiOiI1ZGExMDQ4N2JjYjBhOTc2ODQzYTA4ZDAiLCJydHYiOjg2NDAwLCJleHAiOjE2MTMwMjY0ODUsImFpZCI6Im5zZDEifQ.AYix5SYYQEjxR08oMuvidfU8mNSOariK13oM5AnfjDA";

        Token token2 = Mockito.mock(Token.class);
        DefaultHttpDestination destination = Mockito.mock(DefaultHttpDestination.class);
        RequestContext requestContext = RequestContext.builder()
                .authToken(dummyToken)
                .destination(destination).build();
        Mockito.when(requestContextProvider.getRequestContext())
                .thenReturn(requestContext);
        Mockito.when(request.getHeader("Authorization")).thenReturn(dummyToken);
        Mockito.when(request.getHeader("accept-language")).thenReturn("en-us");

        Mockito.when(token2.getTokenValue()).thenReturn("testTokenValue");
        Mockito.when(token2.getClaimAsString(TokenClaims.USER_NAME)).thenReturn("testUserId");
        boolean result = interceptor.preHandle(request, response, null);

        // Assert
        assertTrue(result);


    }

    @Test
    void preHandle_InvalidToken_ShouldNotSetSessionAttributes(){
        String dummyToken = "abcd";
        DefaultHttpDestination destination = Mockito.mock(DefaultHttpDestination.class);
        RequestContext requestContext = RequestContext.builder()
                .authToken(dummyToken)
                .destination(destination).build();
        Mockito.when(requestContextProvider.getRequestContext())
                .thenReturn(requestContext);
        Mockito.when(request.getHeader("Authorization")).thenReturn(null);
        Mockito.when(request.getHeader("accept-language")).thenReturn("en-us");

        assertThrows(ResponseStatusException.class, () -> interceptor.preHandle(request, response, null));

    }
}

