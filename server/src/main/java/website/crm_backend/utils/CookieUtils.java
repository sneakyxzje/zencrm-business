package website.crm_backend.utils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class CookieUtils {
    private final Logger logger = LoggerFactory.getLogger(CookieUtils.class);
    public String getJwtFromCookies(HttpServletRequest request) {
        if(request.getCookies() != null) {
            for(Cookie cookies : request.getCookies()) {
                if("jwt".equals(cookies.getName())) {
                    return cookies.getValue();
                }
            }
        }
        else {
            logger.debug("No cookies found");
            return null;
        }
        return null;
    }
}
