package website.crm_backend.features.leads.dtos.response;

import java.time.LocalDateTime;

import website.crm_backend.domain.models.leads.enums.LeadStatus;

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