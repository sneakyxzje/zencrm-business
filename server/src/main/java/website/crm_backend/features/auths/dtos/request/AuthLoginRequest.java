package website.crm_backend.features.auths.dtos.request;


public record  AuthLoginRequest(  
    int id,
    String email,
    String password,
    String role
) 
{
}
