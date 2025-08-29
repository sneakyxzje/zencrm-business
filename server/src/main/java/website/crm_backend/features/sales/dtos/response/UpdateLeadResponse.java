package website.crm_backend.features.sales.dtos.response;

import website.crm_backend.domain.models.leads.enums.LeadStatus;

public record UpdateLeadResponse(
    String note,
    LeadStatus status    
) {
    
}
