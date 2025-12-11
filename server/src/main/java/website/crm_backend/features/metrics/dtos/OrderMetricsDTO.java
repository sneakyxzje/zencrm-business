package website.crm_backend.features.metrics.dtos;

public record OrderMetricsDTO(
    long currentMonth,
    long previousMonth ,
    double percentChange
) {
        
}
