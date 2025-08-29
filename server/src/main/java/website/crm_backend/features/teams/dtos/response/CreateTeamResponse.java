package website.crm_backend.features.teams.dtos.response;


public record CreateTeamResponse(
    int id,
    String teamName,
    String managerName,
    String teamType
) {
    
}
