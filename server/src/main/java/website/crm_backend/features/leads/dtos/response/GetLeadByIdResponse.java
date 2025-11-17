package website.crm_backend.features.leads.dtos.response;

import java.time.LocalDateTime;

import website.crm_backend.features.products.dtos.response.ProductDetailResponse;

public record GetLeadByIdResponse(
    int id,
    String address,
    Integer createdById,
    String createdByName,
    String createdByTeamName,
    String customerName,
    String phoneNumber,
    String assignee,
    String assigneeTeam,
    String note,
    LocalDateTime createdAt,
    LocalDateTime assignedAt,
    ProductDetailResponse product
) {
}
