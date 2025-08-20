package website.crm_backend.services;

import java.time.LocalDateTime;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import website.crm_backend.DTOS.LeadDTO.LeadListDTO;
import website.crm_backend.DTOS.LeadDTO.LeadLogDTO;
import website.crm_backend.DTOS.request.AssignLeadRequest;
import website.crm_backend.DTOS.request.UpdateLeadRequest;
import website.crm_backend.DTOS.request.UploadLeadRequest;
import website.crm_backend.DTOS.response.AssignLeadResponse;
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

    // MKT SERVICE
    @Transactional
    public UploadLeadResponse uploadLead(UploadLeadRequest request) {
        var creator = userRepo.getReferenceById(AuthUtils.getUserId());
        String customerName = request.customerName();
        String phoneNumber = PhoneNumberUtils.normalize(request.phoneNumber());
        String productName = request.productName();
        String address = request.address();
        var phone = phoneRepo.findByNumber(phoneNumber)
        .orElseGet(() -> phoneRepo.save(new PhoneNumber(phoneNumber)));
        User assignee = null;
        if(request.assignee() != null) {
            assignee = userRepo.findById(request.assignee())
            .orElseThrow(() -> new IllegalArgumentException("Assignee not found"));
        }
        
        var lead = new Lead();
        
        lead.setCreatedBy(creator);
        lead.setCustomerName(customerName);
        lead.setPhone(phone);
        lead.setProductName(productName);
        lead.setAddress(address);

        if(assignee != null) {
            lead.setAssignee(assignee);
            lead.setStatus(LeadStatus.ASSIGNED);
            lead.setAssignedAt(LocalDateTime.now());
        }
        else {
            lead.setStatus(LeadStatus.NEW);
        }

        var saved = leadRepo.save(lead);



        return new UploadLeadResponse(
            saved.getId(),
            saved.getCreatedBy().getId(),
            saved.getCreatedBy().getFullname(),

            saved.getCustomerName(),
            saved.getPhone().getNumber(),

            saved.getProductName(),

            saved.getAssignee() != null ? saved.getAssignee().getId() : null,
            saved.getAssignee() != null ? saved.getAssignee().getFullname() : null,

            saved.getStatus(),

            saved.getCreatedAt(),
            saved.getAssignedAt(),

            saved.getAssignedBy() != null ? saved.getAssignedBy().getId() : null,
            saved.getAssignedBy() != null ? saved.getAssignedBy().getFullname() : null
        );
    }

    @Transactional
    public Page<LeadListDTO> getAllLeads(Pageable pageable) {
        int user = AuthUtils.getUserId();
        return leadRepo.findByCreatedBy_IdOrderByCreatedAtDesc(user, pageable)
        .map(LeadMapper::toListDTO);
    }

    // SALE SERVICE
    @Transactional()
    public Page<LeadListDTO> saleGetAllLeads(Pageable pageable) {
        int userId = AuthUtils.getUserId();
        return leadRepo.findByAssignee_Id(userId, pageable).map(LeadMapper::toListDTO);
    }

    @Transactional() 
    public UpdateLeadResponse updateLead(UpdateLeadRequest request) {
        int leadId = request.leadId();
        String note = request.note();

        Lead lead = leadRepo.findById(leadId)
        .orElseThrow(() -> new IllegalArgumentException("leadRepo: Lead not found"));
        
        lead.setNote(note);
        lead.setStatus(LeadStatus.CALLED);
        
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

        if(statutes != null && !statutes.isEmpty()) {
            spec = spec.and(LeadSpecs.statusIn(statutes));
        }
        if("ROLE_SALE_MANAGER".equals(me)) {
            spec = spec.and(LeadSpecs.createdByTeamType(TeamType.MARKETING));
        }

        Page<Lead> page = leadRepo.findAll(spec, pageable);
        return page.map(LeadMapper::toListDTO);
    }

    @Transactional 
    public AssignLeadResponse assignLead(AssignLeadRequest request) {
        User actor = userRepo.getReferenceById(AuthUtils.getUserId());
        Integer saleId = request.saleId();
        Integer leadId = request.leadId();
        User assignee = userRepo.getReferenceById(saleId);

        Lead lead = leadRepo.findById(leadId)
        .orElseThrow(() -> new IllegalArgumentException("LeadRepo: Lead not found"));

        if(leadId == null || saleId == null ) {
            throw new IllegalArgumentException("leadId and saleId are required");
        }
        lead.setAssignee(assignee);
        lead.setAssignedAt(LocalDateTime.now());
        leadRepo.save(lead);


        LeadLog log = new LeadLog();
        log.setLead(lead);
        log.setActor(actor);
        log.setAction(LogAction.ASSIGN);
        leadLogRepo.save(log);

        var logDTO = new LeadLogDTO(log.getId(), log.getAction(),log.getActor().getFullname(),log.getCreatedAt());

        LeadAssignment leadAssign = new LeadAssignment();
        leadAssign.setLead(lead);
        leadAssign.setAssignedBy(actor);
        leadAssign.setAssignee(assignee);
        leadAssignRepo.save(leadAssign);


        return new AssignLeadResponse(
            lead.getId(),
            lead.getAssignee().getId(),
            lead.getAssignee().getFullname(),
            lead.getStatus(),
            lead.getAssignedAt(),
            logDTO
        );
    }
}
