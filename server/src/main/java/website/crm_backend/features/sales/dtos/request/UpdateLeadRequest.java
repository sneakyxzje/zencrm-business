package website.crm_backend.features.sales.dtos.request;

import website.crm_backend.models.enums.LeadStatus;

public record UpdateLeadRequest(
    Integer leadId,
    String note,
    LeadStatus status
) {
    
}
