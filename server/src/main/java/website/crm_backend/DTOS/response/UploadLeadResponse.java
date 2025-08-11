package website.crm_backend.DTOS.response;

import java.time.LocalDateTime;

public record UploadLeadResponse(    int id,
    String phoneNumber,
    int createdById,
    String createdByName,
    String status,
    LocalDateTime createdAt) {
};