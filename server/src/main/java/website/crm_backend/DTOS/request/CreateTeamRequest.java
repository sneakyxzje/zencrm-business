package website.crm_backend.DTOS.request;

import website.crm_backend.models.enums.TeamType;

public record CreateTeamRequest(
    String teamName,
    Integer managerId,
    TeamType teamType 
) {
    
}
