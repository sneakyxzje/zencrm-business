package website.crm_backend.DTOS.response;

import website.crm_backend.models.enums.LeadStatus;

public record UpdateLeadResponse(
    String note,
    LeadStatus status    
) {
    
}
