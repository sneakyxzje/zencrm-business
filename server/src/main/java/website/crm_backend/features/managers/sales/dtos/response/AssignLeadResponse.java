package website.crm_backend.features.managers.sales.dtos.response;
import java.time.LocalDateTime;

import website.crm_backend.models.enums.LeadStatus;

public record AssignLeadResponse(
    Integer leadId,
    Integer saleId,
    String saleName,
    LeadStatus status,
    LocalDateTime assignedAt
) {

}
