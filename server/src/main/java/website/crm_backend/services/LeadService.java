package website.crm_backend.services;

import java.time.LocalDateTime;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import website.crm_backend.DTOS.LeadDTO.LeadListDTO;
import website.crm_backend.DTOS.request.AssignLeadRequest;
import website.crm_backend.DTOS.request.FindLeadRequest;
import website.crm_backend.DTOS.request.UpdateLeadRequest;
import website.crm_backend.DTOS.request.UploadLeadRequest;
import website.crm_backend.DTOS.response.AssignLeadResponse;
import website.crm_backend.DTOS.response.FindLeadResponse;
import website.crm_backend.DTOS.response.GetLeadByIdResponse;
import website.crm_backend.DTOS.response.UpdateLeadResponse;
import website.crm_backend.DTOS.response.UploadLeadResponse;
import website.crm_backend.mapper.LeadMapper;
import website.crm_backend.models.Lead;
import website.crm_backend.models.LeadAssignment;
import website.crm_backend.models.LeadLog;
import website.crm_backend.models.PhoneNumber;
import website.crm_backend.models.User;
import website.crm_backend.models.enums.LeadStatus;
import website.crm_backend.models.enums.LogAction;
import website.crm_backend.models.enums.TeamType;
import website.crm_backend.repositories.LeadAssignmentRepository;
import website.crm_backend.repositories.LeadLogRepository;
import website.crm_backend.repositories.LeadRepository;
import website.crm_backend.repositories.PhoneNumberRepository;
import website.crm_backend.repositories.UserRepository;
import website.crm_backend.repositories.spec.LeadSpecs;
import website.crm_backend.utils.AuthUtils;
import website.crm_backend.utils.PhoneNumberUtils;

@Service
@RequiredArgsConstructor
public class LeadService {
    private final PhoneNumberRepository phoneRepo;
    private final LeadRepository leadRepo;
    private final UserRepository userRepo;
    private final LeadLogRepository leadLogRepo;
    private final LeadAssignmentRepository leadAssignRepo;
    private final Logger log =  LoggerFactory.getLogger(LeadService.class);
    private final LeadMapper leadMapper;
    // MKT SERVICE
    @Transactional
    public UploadLeadResponse uploadLead(UploadLeadRequest request) {
        var creator = userRepo.getReferenceById(AuthUtils.getUserId());
        String phoneNumber = PhoneNumberUtils.normalize(request.phoneNumber());
        PhoneNumber phone = phoneRepo.findByNumber(phoneNumber)
        .orElseGet(() -> phoneRepo.save(new PhoneNumber(phoneNumber)));

        Lead lead = Lead.builder()
        .createdBy(creator)
        .customerName(request.customerName())
        .phone(phone)
        .productName(request.productName())
        .address(request.address())
        .build();

        if(request.assignee() != null) {
            User assignee = userRepo.findById(request.assignee())
            .orElseThrow(() -> new IllegalArgumentException("Assignee not found"));

            lead.setStatus(LeadStatus.ASSIGNED);
            lead.setAssignee(assignee);
            lead.setAssignedBy(creator);
            lead.setAssignedAt(LocalDateTime.now());
        } else {
            lead.setStatus(LeadStatus.NEW);
        }
        Lead savedLead = leadRepo.save(lead);

        LeadLog log = LeadLog.builder()
        .lead(savedLead)
        .actor(creator)
        .action(LogAction.UPLOAD_NEW)
        .fromStatus(null)
        .toStatus(lead.getStatus())
        .createdAt(LocalDateTime.now())
        .build();
        leadLogRepo.save(log);

        return leadMapper.toUploadLeadResponse(savedLead);
    }

    public Page<LeadListDTO> getAllLeads(Pageable pageable) {
        int user = AuthUtils.getUserId();
        return leadRepo.findByCreatedBy_IdOrderByCreatedAtDesc(user, pageable)
        .map(leadMapper::toListDTO);
    }


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
    // SALE SERVICE
    @Transactional()
    public Page<LeadListDTO> saleGetAllLeads(Pageable pageable) {
        int userId = AuthUtils.getUserId();
        return leadRepo.findByAssignee_Id(userId, pageable).map(leadMapper::toListDTO);
    }

    @Transactional() 
    public UpdateLeadResponse updateLead(int leadId, UpdateLeadRequest request) {
        String note = request.note();
        int actorId = AuthUtils.getUserId(); 
        User actor = userRepo.findById(actorId)
        .orElseThrow(() -> new IllegalArgumentException("userRepo: user not found"));
        if(note == null || note.trim().isEmpty()) {
            throw new IllegalArgumentException("Note cannot be null or empty"); 
        }

        Lead lead = leadRepo.findById(leadId)
        .orElseThrow(() -> new IllegalArgumentException("leadRepo: Lead not found"));
        
        LeadStatus newStatus = request.status();
        LeadStatus oldStatus = lead.getStatus();
        lead.setNote(note);
        
        if(newStatus != null && newStatus != oldStatus) {
            lead.setStatus(newStatus);
        }

        LeadLog leadLog = LeadLog.builder()
        .lead(lead)
        .actor(actor)
        .action(LogAction.STATUS_CHANGE)
        .fromStatus(oldStatus)
        .toStatus(newStatus)
        .build();

        leadLogRepo.save(leadLog);
        
        return new UpdateLeadResponse(
            lead.getNote(),
            lead.getStatus()
        );
    }

    // SALE MANAGER SERVICE
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
        log.info("assignee: ", saleId);
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
