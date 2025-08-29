package website.crm_backend.features.auths.dtos.request;

import website.crm_backend.domain.models.users.enums.UserRole;

public record AuthRegisterRequest(
    String fullname,
    String email,
    String password,
    UserRole role,
    Integer teamId
) {
    
}
