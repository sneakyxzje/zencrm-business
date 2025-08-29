package website.crm_backend.features.leads.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import website.crm_backend.features.leads.dtos.request.FindLeadRequest;
import website.crm_backend.features.leads.dtos.response.FindLeadResponse;
import website.crm_backend.features.leads.dtos.response.GetLeadByIdResponse;
import website.crm_backend.models.Lead;
import website.crm_backend.models.User;
import website.crm_backend.repositories.LeadRepository;

@Service
@RequiredArgsConstructor
public class LeadService {
    private final LeadRepository leadRepo;
    private final Logger log =  LoggerFactory.getLogger(LeadService.class);


    public Page<FindLeadResponse> findLead(FindLeadRequest request, Pageable pageable) {
        String phoneNumber = request.phoneNumber();
        log.info(phoneNumber);
        Page<Lead> lead = leadRepo.findByPhone_NumberOrderByCreatedAtDesc(phoneNumber, pageable);
        if(lead.isEmpty()) {
            throw new IllegalArgumentException("leadRepo: Phone number not found");
        }
        return lead.map(l -> new FindLeadResponse(
            l.getId(),
            l.getCreatedBy() != null ? l.getCreatedBy().getFullname() : null,
            (l.getCreatedBy() != null && l.getCreatedBy().getTeam() != null) ? l.getCreatedBy().getTeam().getTeamName() : null,
            l.getCreatedAt(),
            l.getAssignee() != null ? l.getAssignee().getFullname() : null,
            (l.getAssignee() != null && l.getAssignee().getTeam() != null) ? l.getAssignee().getTeam().getTeamName() : null,
            l.getStatus()
        ));
    }
   
    public GetLeadByIdResponse getLeadById(Integer leadId) {
        Lead lead = leadRepo.findById(leadId)
        .orElseThrow(() -> new IllegalArgumentException("leadRepo: Lead not found"));

        User assignee = lead.getAssignee();
        String assigneeName = null;
        String assigneeTeam = null;

        if(assignee != null) {
            assigneeName = assignee.getFullname();
            if(assignee.getTeam() != null) {
                assigneeTeam = assignee.getTeam().getTeamName();
            }
        }
        return new GetLeadByIdResponse (
            lead.getId(),
            lead.getAddress(),
            lead.getProductName(),
            lead.getCreatedBy().getFullname(),
            lead.getCreatedBy().getTeam().getTeamName(),
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
