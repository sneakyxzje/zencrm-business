package website.crm_backend.DTOS.response;


public record CreateTeamResponse(
    int id,
    String teamName,
    String managerName,
    String teamType
) {
    
}
