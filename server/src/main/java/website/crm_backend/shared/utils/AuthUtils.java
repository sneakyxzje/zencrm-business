package website.crm_backend.shared.utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import website.crm_backend.shared.security.UserDetailsImpl;

public class AuthUtils {
    private AuthUtils() {}

    private static UserDetailsImpl getUserDetails() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return (UserDetailsImpl) auth.getPrincipal();
    }
    public static int getUserId() {
        return getUserDetails().getId();
    }

    public static String getUsername() { // email
        return getUserDetails().getUsername();
    }

    public static String getFullName() {
        return getUserDetails().getFullname();
    }

    public static String getRole() {
        return getUserDetails().getAuthorities().iterator().next().getAuthority();
    }

    public static String getTeamName() {
        return getUserDetails().getTeamName();
    }
}
