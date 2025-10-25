package website.crm_backend.features.leads.dtos.request;

import website.crm_backend.domain.models.leads.enums.LeadStatus;

public record FindLeadRequest(
    String phoneNumber,
    LeadStatus status
) {
    
}
