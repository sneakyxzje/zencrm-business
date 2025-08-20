package website.crm_backend.DTOS.request;


public record UpdateLeadRequest(
    Integer leadId,
    String note
) {
    
}
