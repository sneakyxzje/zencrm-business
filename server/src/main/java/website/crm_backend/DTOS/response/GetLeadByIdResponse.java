package website.crm_backend.DTOS.response;

import java.time.LocalDateTime;

public record GetLeadByIdResponse(
    int id,
    String address,
    String productName,
    String createdByName,
    String createdByTeamName,
    String customerName,
    String phoneNumber,
    String assignee,
    String assigneeTeam,
    String note,
    LocalDateTime createdAt,
    LocalDateTime assignedAt
) {
}
