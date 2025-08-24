package website.crm_backend.mapper;


import org.springframework.stereotype.Component;

import website.crm_backend.DTOS.LeadDTO.LeadListDTO;
import website.crm_backend.DTOS.response.AssignLeadResponse;
import website.crm_backend.DTOS.response.UploadLeadResponse;
import website.crm_backend.models.Lead;
import website.crm_backend.models.PhoneNumber;
import website.crm_backend.models.User;


@Component
public class LeadMapper {
    public LeadListDTO toListDTO(Lead l) {
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

    public UploadLeadResponse toUploadLeadResponse(Lead lead) {
        if (lead == null) {
            return null;
        }

        User creator = lead.getCreatedBy();
        User assignee = lead.getAssignee();
        User assignedBy = lead.getAssignedBy();
        PhoneNumber phone = lead.getPhone();

        return new UploadLeadResponse (
            lead.getId(),
            creator != null ? creator.getId() : null,
            creator != null ? creator.getFullname() : null,
            lead.getCustomerName(),
            phone != null ? phone.getNumber() : null,
            lead.getProductName(),
            assignee != null ? assignee.getId() : null,
            assignee != null ? assignee.getFullname() : null,
            lead.getStatus(),
            lead.getCreatedAt(),
            lead.getAssignedAt(),
            assignedBy != null ? assignedBy.getId() : null,
            assignedBy != null ? assignedBy.getFullname() : null
        );
    }

    public AssignLeadResponse toAssignLeadResponse(Lead lead) {
        if(lead == null) {
            return null;
        }

        User assignee = lead.getAssignee();

        Integer assigneeId = assignee != null ? assignee.getId() : null;
        String assigneeName = assignee != null ? assignee.getFullname() : null;
        return new AssignLeadResponse(
        lead.getId(),
        assigneeId,
        assigneeName,
        lead.getStatus(),
        lead.getAssignedAt()
        );
    }
}
