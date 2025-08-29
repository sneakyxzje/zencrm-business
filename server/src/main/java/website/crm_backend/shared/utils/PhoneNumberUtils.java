package website.crm_backend.shared.utils;

public class PhoneNumberUtils {
   public static String normalize(String number) {
        return number.replaceAll("\\s+", "");
    }
}
