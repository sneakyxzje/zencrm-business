package website.crm_backend.features.auths.dtos.response;

public record AuthRegisterResponse(
    String fullname,
    String email,
    String role,
    Integer teamId    
) {
    
}
