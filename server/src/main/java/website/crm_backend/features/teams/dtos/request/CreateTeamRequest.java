package website.crm_backend.features.teams.dtos.request;

import website.crm_backend.domain.models.teams.enums.TeamType;

public record CreateTeamRequest(
    String teamName,
    Integer managerId,
    TeamType teamType 
) {
    
}
