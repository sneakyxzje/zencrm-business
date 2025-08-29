package website.crm_backend.shared.utils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

public final class CookieUtils {
    private CookieUtils() {}
    public static String getJwtFromCookies(HttpServletRequest request) {
        if(request.getCookies() != null) {
            for(Cookie cookies : request.getCookies()) {
                if("jwt".equals(cookies.getName())) {
                    return cookies.getValue();
                }
            }
        }
        return null;
    }
}
