package website.crm_backend.DTOS.request;

import website.crm_backend.models.enums.TeamType;

public record CreateTeamRequest(
    String teamName,
    int managerId,
    TeamType teamType 
) {
    
}
