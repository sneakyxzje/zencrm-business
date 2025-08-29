package website.crm_backend.features.managers.sales.services;

import java.time.LocalDateTime;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import website.crm_backend.domain.models.leads.Lead;
import website.crm_backend.domain.models.leads.LeadAssignment;
import website.crm_backend.domain.models.leads.enums.LeadStatus;
import website.crm_backend.domain.models.logs.LeadLog;
import website.crm_backend.domain.models.logs.enums.LogAction;
import website.crm_backend.domain.models.teams.enums.TeamType;
import website.crm_backend.domain.models.users.User;
import website.crm_backend.domain.repositories.leads.LeadAssignmentRepository;
import website.crm_backend.domain.repositories.leads.LeadRepository;
import website.crm_backend.domain.repositories.leads.specs.LeadSpecs;
import website.crm_backend.domain.repositories.logs.LeadLogRepository;
import website.crm_backend.domain.repositories.users.UserRepository;
import website.crm_backend.features.leads.dtos.shared.LeadListDTO;
import website.crm_backend.features.managers.sales.dtos.request.AssignLeadRequest;
import website.crm_backend.features.managers.sales.dtos.response.AssignLeadResponse;
import website.crm_backend.shared.mapper.LeadMapper;
import website.crm_backend.shared.utils.AuthUtils;

@Service
@RequiredArgsConstructor
public class SaleManagerServices {
    private final LeadRepository leadRepo;
    private final LeadMapper leadMapper;
    private final UserRepository userRepo;
    private final LeadLogRepository leadLogRepo;
    private final LeadAssignmentRepository leadAssignRepo;
    @Transactional
    public Page<LeadListDTO> getAssigmentQueue(
        Set<LeadStatus> statutes,
        Boolean assigned,
        Pageable pageable
    ) {
        var me = AuthUtils.getRole();
        Specification<Lead> spec = (root, query, cb) -> cb.conjunction();
        if(assigned != null) {
            spec = spec.and(assigned ? LeadSpecs.hasAssignee() : LeadSpecs.unassigned());
        }

        if("ROLE_SALE_MANAGER".equals(me)) {
            spec = spec.and(LeadSpecs.createdByTeamType(TeamType.MARKETING));
        }

        Page<Lead> page = leadRepo.findAll(spec, pageable);
        return page.map(leadMapper::toListDTO);
    }

    @Transactional 
    public AssignLeadResponse assignLead(int leadId, AssignLeadRequest request) {
        User actor = userRepo.getReferenceById(AuthUtils.getUserId());
        Integer saleId = request.saleId();

        Lead lead = leadRepo.findById(leadId)
        .orElseThrow(() -> new IllegalArgumentException("LeadRepo: Lead not found"));

        if(saleId == null) {
            throw new IllegalArgumentException("saleId are required");
        }


        User assignee = userRepo.findById(saleId)
        .orElseThrow(() -> new IllegalArgumentException("Assignee not found"));
        lead.setAssignee(assignee);
        lead.setAssignedBy(actor);
        lead.setStatus(LeadStatus.ASSIGNED);
        lead.setAssignedAt(LocalDateTime.now());
        leadRepo.save(lead);
        
        LeadLog leadLog = LeadLog.builder()
        .lead(lead)
        .action(LogAction.ASSIGN)
        .actor(actor)
        .fromStatus(LeadStatus.NEW)
        .toStatus(LeadStatus.ASSIGNED)
        .targetUser(assignee)
        .build();
        leadLogRepo.save(leadLog);


        LeadAssignment leadAssign = new LeadAssignment();
        leadAssign.setLead(lead);
        leadAssign.setAssignedBy(actor);
        leadAssign.setAssignee(assignee);
        leadAssignRepo.save(leadAssign);


        return leadMapper.toAssignLeadResponse(lead);
    }
}
