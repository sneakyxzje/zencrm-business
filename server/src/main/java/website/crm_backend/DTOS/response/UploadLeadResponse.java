package website.crm_backend.DTOS.response;

import java.time.LocalDateTime;

import website.crm_backend.models.enums.LeadStatus;

public record UploadLeadResponse( 

    Integer id,
    
    Integer createdById,
    String createdByName,

    String customerName,
    String phoneNumber,

    String productName,

    Integer assigneeId,
    String assignee,

    LeadStatus status,

    LocalDateTime createdAt,
    LocalDateTime assignedAt,

    Integer assignedById,
    String assignedByName 
    ) {
};