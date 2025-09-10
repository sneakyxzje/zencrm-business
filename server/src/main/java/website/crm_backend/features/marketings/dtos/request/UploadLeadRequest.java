package website.crm_backend.features.marketings.dtos.request;


public record UploadLeadRequest(
    String customerName,
    String phoneNumber,
    Integer productId,
    Integer assignee,
    String address
) {}

