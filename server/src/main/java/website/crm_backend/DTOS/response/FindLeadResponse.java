package website.crm_backend.DTOS.response;

import java.time.LocalDateTime;

import website.crm_backend.models.enums.LeadStatus;

public record FindLeadResponse(
    Integer leadId,
    String createdByName,
    String createdByTeam,
    LocalDateTime createdAt,
    String assignee,
    String assigneeTeam,
    LeadStatus status
) {
}