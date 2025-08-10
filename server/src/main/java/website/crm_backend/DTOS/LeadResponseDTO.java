package website.crm_backend.DTOS;

import java.time.LocalDateTime;

public record LeadResponseDTO(    int id,
    String phoneNumber,
    int createdById,
    String createdByName,
    String status,
    LocalDateTime createdAt) {
};