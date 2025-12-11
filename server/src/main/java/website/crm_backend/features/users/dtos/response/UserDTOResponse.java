package website.crm_backend.features.users.dtos.response;

public record UserDTOResponse(
    int id,
    String fullname,
    String email,
    String role,
    String teamName
) {
}
