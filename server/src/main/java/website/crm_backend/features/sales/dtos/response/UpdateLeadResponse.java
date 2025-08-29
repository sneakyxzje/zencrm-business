package website.crm_backend.features.sales.dtos.response;

import website.crm_backend.models.enums.LeadStatus;

public record UpdateLeadResponse(
    String note,
    LeadStatus status    
) {
    
}
