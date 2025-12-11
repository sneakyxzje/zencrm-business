package website.crm_backend.features.metrics.dtos;

public record LeadMetricsDTO(
    long currentCount,
    long previousCount,
    double percentChange
) {
    
}
