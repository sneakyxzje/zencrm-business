package website.crm_backend.utils;

public class PhoneNumberUtils {
   public static String normalize(String number) {
        return number.replaceAll("\\s+", "");
    }
}
