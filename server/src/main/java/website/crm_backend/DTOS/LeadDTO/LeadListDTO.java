package website.crm_backend.DTOS.LeadDTO;

public record LeadListDTO(
    Integer id,
    String customerName,
    String phoneNumber,
    String product,
    String createdByName,
    String createdByTeam,
    String assigneeName,
    String assgineeTeam,
    String status,
    String note,
    String createdAt,
    String assignedAt
) {
    
}
