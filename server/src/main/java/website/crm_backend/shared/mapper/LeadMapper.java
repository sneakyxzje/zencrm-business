package website.crm_backend.shared.mapper;


import org.springframework.stereotype.Component;

import website.crm_backend.domain.models.PhoneNumber;
import website.crm_backend.domain.models.leads.Lead;
import website.crm_backend.domain.models.products.Product;
import website.crm_backend.domain.models.users.User;
import website.crm_backend.features.leads.dtos.response.FindLeadResponse;
import website.crm_backend.features.leads.dtos.response.GetLeadByIdResponse;
import website.crm_backend.features.leads.dtos.shared.LeadListDTO;
import website.crm_backend.features.managers.sales.dtos.response.AssignLeadResponse;
import website.crm_backend.features.marketings.dtos.response.UploadLeadResponse;


@Component
public class LeadMapper {
    public LeadListDTO toListDTO(Lead l) {
        Product product = l.getProduct();
        String productName = product != null ? product.getProductName() : null;
        return new LeadListDTO(
            l.getId(),
            l.getCustomerName(),
            l.getPhone().getNumber(),
            productName,
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
            lead.getProduct().getProductName(),
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

    public FindLeadResponse toFindLeadResponse(Lead lead) {
        if(lead == null) {
            return null;
        }
        User creator = lead.getCreatedBy();
        User assignee = lead.getAssignee();

        String creatorName = creator != null ? creator.getFullname() : null;
        String creatorTeam = creator != null ? creator.getTeam().getTeamName() : null;

        String assigneeName = assignee != null ? assignee.getFullname() : null;
        String assigneeTeam = assignee != null ? assignee.getTeam().getTeamName() : null;
        return new FindLeadResponse (
            lead.getId(),
            creatorName,
            creatorTeam,
            lead.getCreatedAt(),
            assigneeName,
            assigneeTeam,
            lead.getStatus()
        );
    }

    public GetLeadByIdResponse toGetLeadById(Lead lead) {
        if(lead == null) {
            return null;
        }

        User creator = lead.getCreatedBy();
        User assignee = lead.getAssignee();

        String creatorName = creator != null ? creator.getFullname() : null;
        String creatorTeam = creator != null ? creator.getTeam().getTeamName() : null;

        String assigneeName = assignee != null ? assignee.getFullname() : null;
        String assigneeTeam = assignee != null ? assignee.getTeam().getTeamName() : null;

        return new GetLeadByIdResponse(
            lead.getId(),
            lead.getAddress(),
            lead.getProduct().getProductName(),
            creatorName,
            creatorTeam,
            lead.getCustomerName(),
            lead.getPhone().getNumber(),
            assigneeName,
            assigneeTeam,
            lead.getNote(),
            lead.getCreatedAt(),
            lead.getAssignedAt()    
        );
    }
}
