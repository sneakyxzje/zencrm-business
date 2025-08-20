package website.crm_backend.DTOS.response;
import java.time.LocalDateTime;

import website.crm_backend.DTOS.LeadDTO.LeadLogDTO;
import website.crm_backend.models.enums.LeadStatus;

public record AssignLeadResponse(
    Integer leadId,
    Integer saleId,
    String saleName,
    LeadStatus status,
    LocalDateTime assignedAt,
    LeadLogDTO log
) {

}
