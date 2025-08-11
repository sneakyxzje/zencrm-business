package website.crm_backend.DTOS.request;


public record  AuthLoginRequest(  
    int id,
    String email,
    String password,
    String role
) 
{
}
