package com.sap.extensionmodules.security;

import com.sap.extensionmodules.exception.SecurityContextNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class RequestContextProvider {

    public RequestContext getRequestContext() throws SecurityContextNotFoundException {
        SecurityContext securityContext = getSecurityContext();
        Authentication authentication = securityContext.getAuthentication();
        if (authentication != null) {
            return (RequestContext) authentication.getDetails();
        } else {
            throw new SecurityContextNotFoundException("Security Context Invalid");
        }
    }

    public void setRequestContext(RequestContext requestContext) {
        SecurityContext securityContext = getSecurityContext();
        if (securityContext != null) {
            PreAuthenticatedAuthenticationToken authentication =
                    new PreAuthenticatedAuthenticationToken(requestContext.getUserId(), null);
            authentication.setDetails(requestContext);
            authentication.setAuthenticated(true);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            securityContext.setAuthentication(authentication);
        } else {
            throw new SecurityContextNotFoundException("Security Context Invalid");
        }
    }

    protected SecurityContext getSecurityContext() {
        return SecurityContextHolder.getContext();
    }
}
