package website.crm_backend.DTOS.request;

import website.crm_backend.models.enums.UserRole;

public record AuthRegisterRequest(
    String fullname,
    String email,
    String password,
    UserRole role,
    Integer teamId
) {
    
}
