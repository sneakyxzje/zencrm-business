package website.crm_backend.DTOS.request;

import website.crm_backend.models.enums.LeadStatus;

public record UpdateLeadRequest(
    Integer leadId,
    String note,
    LeadStatus status
) {
    
}
