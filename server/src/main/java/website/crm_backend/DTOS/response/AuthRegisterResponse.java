package website.crm_backend.DTOS.response;

public record AuthRegisterResponse(
    String fullname,
    String email,
    String role,
    Integer teamId    
) {
    
}
