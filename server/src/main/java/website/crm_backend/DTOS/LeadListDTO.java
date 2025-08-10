package website.crm_backend.DTOS;

public record LeadListDTO(
    Integer id,
    String phoneNumber,
    String assigneeName,
    String status,
    String createdByName,
    String createdAt
) {
    
}
