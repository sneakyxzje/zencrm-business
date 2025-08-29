package website.crm_backend.features.staffs.dtos.response;

import website.crm_backend.domain.models.teams.enums.TeamType;

public record AssignableSaleResponse(
    Integer id,
    String fullname,
    Integer teamId,
    String teamName,
    TeamType teamType
) {    
}
