package com.example.progettowsda.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String targetUrl = getDefaultSuccessUrl(request);
        response.sendRedirect(targetUrl);
    }

    private String getDefaultSuccessUrl(HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        if (requestURI.startsWith("/static/") || requestURI.startsWith("/templates/") || requestURI.startsWith("/dbaccess/")) {
            return requestURI.substring(request.getContextPath().length());
        }
        return "/"; // Fallback to root path if it doesn't fall into /static/, /templates/, or /dbaccess/
    }
}
