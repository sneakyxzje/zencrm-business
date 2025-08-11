package website.crm_backend.services;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import website.crm_backend.DTOS.LeadDTO.LeadListDTO;
import website.crm_backend.models.Lead;
import website.crm_backend.models.LeadLog;
import website.crm_backend.models.PhoneNumber;
import website.crm_backend.models.enums.LeadStatus;
import website.crm_backend.models.enums.LogAction;
// import website.crm_backend.repositories.LeadAssignmentRepository;
import website.crm_backend.repositories.LeadLogRepository;
import website.crm_backend.repositories.LeadRepository;
import website.crm_backend.repositories.PhoneNumberRepository;
import website.crm_backend.repositories.UserRepository;
import website.crm_backend.utils.AuthUtils;

@Service
@RequiredArgsConstructor
public class LeadService {
    private final PhoneNumberRepository phoneRepo;
    // private final LeadAssignmentRepository assignRepo;
    private final LeadRepository leadRepo;
    private final LeadLogRepository logRepo;
    private final UserRepository userRepo;

    @Transactional
    public Lead uploadNumber(String rawNumber) {
        String normalized = normalize(rawNumber);
        var userInfo = AuthUtils.getUserId();
        int userId = userInfo; 

        var phone = phoneRepo.findByNumber(normalized)
        .orElseGet(() -> phoneRepo.save(new PhoneNumber(normalized)));

        var lead = new Lead();
        lead.setPhone(phone);
        var createdByRef = userRepo.getReferenceById(userId);
        lead.setCreatedBy(createdByRef);
        lead.setStatus(LeadStatus.NEW);
        lead.setCreatedAt(LocalDateTime.now());
        lead = leadRepo.save(lead);
        log(lead.getId(), userId, LogAction.UPLOAD_NEW, null, LeadStatus.NEW, Map.of("number", normalized));
        return lead;
    }


    @Transactional
    public Page<LeadListDTO> getAllLeads(Pageable pageable) {
        return leadRepo.findAllByOrderByCreatedAtDesc(pageable)
        .map(l -> new LeadListDTO(
            l.getId(),
            l.getCustomerName(),
            l.getPhone().getNumber(),
            l.getProductName(),
            l.getCreatedBy().getFullname(),
            l.getCreatedBy().getTeam().getTeamName(),
            l.getAssignee() != null ? l.getAssignee().getFullname() : null,
            l.getAssignee() != null && l.getAssignee().getTeam() != null ? l.getAssignee().getTeam().getTeamName() : null,
            l.getStatus().name(),
            l.getNote(),
            l.getCreatedAt().toString(),
            l.getAssignedAt() != null ? l.getAssignedAt().toString() : null
        ));
    }

    private String normalize(String number) {
        return number.replaceAll("\\s+", "");
    }
    private void log(int leadId, int actorUserId, LogAction action,
                 LeadStatus from, LeadStatus to, Map<String, Object> meta) {
    LeadLog log = new LeadLog();
    log.setLead(leadRepo.getReferenceById(leadId));
    log.setActor(userRepo.getReferenceById(actorUserId));
    log.setAction(action);
    log.setFromStatus(from);
    log.setToStatus(to);
    log.setCreatedAt(LocalDateTime.now());
    logRepo.save(log);
}
}
