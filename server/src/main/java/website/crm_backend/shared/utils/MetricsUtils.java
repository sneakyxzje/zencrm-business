package website.crm_backend.shared.utils;

public class MetricsUtils {
    private MetricsUtils(){};
    public static double calculateGrowthRate(long current, long previous) {
        if(previous == 0) {
            return current > 0 ? 100.0 : 0.0;
        }
        return ((double) (current - previous) / previous) * 100.0;
    }
}
