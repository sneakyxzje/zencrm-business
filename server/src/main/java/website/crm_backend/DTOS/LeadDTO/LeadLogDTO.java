package website.crm_backend.DTOS.LeadDTO;

import java.time.LocalDateTime;

import website.crm_backend.models.enums.LeadStatus;
import website.crm_backend.models.enums.LogAction;

public record LeadLogDTO(
    Integer id,
    LogAction action,
    String actorName,
    LocalDateTime createdAt,
    String targetUser,
    LeadStatus fromStatus,
    LeadStatus toStatus
) {
    
}
