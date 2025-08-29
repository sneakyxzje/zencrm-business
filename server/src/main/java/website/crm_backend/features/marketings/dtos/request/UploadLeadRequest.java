package website.crm_backend.features.marketings.dtos.request;


public record UploadLeadRequest(
    String customerName,
    String phoneNumber,
    String productName,
    Integer assignee,
    String address
) {}

