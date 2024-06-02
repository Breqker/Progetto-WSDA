package com.example.progettowsda.security;

import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomRequestCache extends HttpSessionRequestCache {

    @Override
    public void saveRequest(HttpServletRequest request, HttpServletResponse response) {
        // Salva l'URL richiesto prima del login nella sessione
        String uri = request.getRequestURI();
        if (!isFrameworkInternalRequest(request)) {
            request.getSession().setAttribute("url_prior_login", uri);
        }
        super.saveRequest(request, response);
    }

    @Override
    public SavedRequest getRequest(HttpServletRequest request, HttpServletResponse response) {
        // Ritorna la richiesta salvata
        return super.getRequest(request, response);
    }

    @Override
    public void removeRequest(HttpServletRequest request, HttpServletResponse response) {
        // Rimuove la richiesta salvata dalla sessione
        super.removeRequest(request, response);
        request.getSession().removeAttribute("url_prior_login");
    }

    private boolean isFrameworkInternalRequest(HttpServletRequest request) {
        String uri = request.getRequestURI();
        return uri.startsWith("/templates/") || uri.startsWith("/static/") || uri.startsWith("/dbaccess/");
    }
}
