package website.crm_backend.DTOS.LeadDTO;

import java.time.LocalDateTime;

import website.crm_backend.models.enums.LeadStatus;

public record LeadListDTO(
    Integer id,
    String customerName,
    String phoneNumber,
    String product,
    String createdByName,
    String createdByTeam,
    String assigneeName,
    String assigneeTeam,
    LeadStatus status,
    String note,
    LocalDateTime createdAt,
    LocalDateTime assignedAt
) {
    
}
