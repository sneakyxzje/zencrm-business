package website.crm_backend.mapper;

import website.crm_backend.DTOS.LeadDTO.LeadListDTO;
import website.crm_backend.models.Lead;

public final class LeadMapper {
    private LeadMapper() {}
    public static LeadListDTO toListDTO(Lead l) {
        return new LeadListDTO(
            l.getId(),
            l.getCustomerName(),
            l.getPhone().getNumber(),
            l.getProductName(),
            l.getCreatedBy().getFullname(),
            l.getCreatedBy().getTeam().getTeamName(),
            l.getAssignee() != null ? l.getAssignee().getFullname() : null,
            l.getAssignee() != null ? l.getAssignee().getTeam().getTeamName() : null,
            l.getStatus(),
            l.getNote(),
            l.getCreatedAt(),
            l.getAssignedAt()
        );
    }
}
