package website.crm_backend.features.metrics.dtos;

public record UserMetricsDTO(
    long currentCount,
    long previousCount,
    double percentChange
) {
    
}
