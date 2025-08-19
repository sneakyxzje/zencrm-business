package website.crm_backend.DTOS.response;


import website.crm_backend.models.enums.TeamType;

public record AssignableSaleResponse(
    Integer id,
    String fullname,
    Integer teamId,
    String teamName,
    TeamType teamType
) {    
}
