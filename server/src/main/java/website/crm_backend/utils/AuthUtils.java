package website.crm_backend.utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import website.crm_backend.security.UserDetailsImpl;

public class AuthUtils {
    private AuthUtils() {}

    private static UserDetailsImpl getUserDetails() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return (UserDetailsImpl) auth.getPrincipal();
    }
    public static int getUserId() {
        return getUserDetails().getId();
    }

    public static String getUsername() {
        return getUserDetails().getUsername();
    }

    public static String getRole() {
        return getUserDetails().getAuthorities().iterator().next().getAuthority();
    }
}
