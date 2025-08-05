package website.crm_backend.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import org.springframework.lang.NonNull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import website.crm_backend.services.CustomUserDetailsService;
import website.crm_backend.utils.CookieUtils;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private CustomUserDetailsService customUserService;

    @Autowired
    private CookieUtils cookie;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {
        String path = request.getServletPath();
        if(path.equals("/api/auth/login")) {
            filterChain.doFilter(request, response);
            return;
        }
        String token = cookie.getJwtFromCookies(request);

        if(token != null && jwtTokenProvider.validateToken(token)) {
            int userId = jwtTokenProvider.getUserIdFromToken(token);
            UserDetailsImpl userDetails = (UserDetailsImpl) customUserService.loadUserById(userId);
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(auth);
            logger.debug("Path " + path);
            logger.debug("Token from cookie: " + token);
            logger.debug("Authentication: " + SecurityContextHolder.getContext().getAuthentication());
        }
        else {
            logger.debug(("Invallid token or token expired"));
        }
        filterChain.doFilter(request, response);
    }
}
