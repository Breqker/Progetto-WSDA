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
        String targetUrl = (String) request.getSession().getAttribute("url_prior_login");
        if (targetUrl != null) {
            request.getSession().removeAttribute("url_prior_login");
            response.sendRedirect(targetUrl);
        } else {
            response.sendRedirect(getDefaultSuccessUrl(request));
        }
    }

    private String getDefaultSuccessUrl(HttpServletRequest request) {
        return "/dbaccess/gestione_impianti"; // Fallback to main page if the URL is not saved
    }
}
