package website.crm_backend.features.sales.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import website.crm_backend.domain.models.leads.Lead;
import website.crm_backend.domain.models.leads.enums.LeadStatus;
import website.crm_backend.domain.models.logs.LeadLog;
import website.crm_backend.domain.models.logs.enums.LogAction;
import website.crm_backend.domain.models.users.User;
import website.crm_backend.domain.repositories.leads.LeadRepository;
import website.crm_backend.domain.repositories.logs.LeadLogRepository;
import website.crm_backend.domain.repositories.users.UserRepository;
import website.crm_backend.features.leads.dtos.shared.LeadListDTO;
import website.crm_backend.features.sales.dtos.request.UpdateLeadRequest;
import website.crm_backend.features.sales.dtos.response.UpdateLeadResponse;
import website.crm_backend.shared.mapper.LeadMapper;
import website.crm_backend.shared.utils.AuthUtils;

@Service
@RequiredArgsConstructor
public class SaleService {
    private final LeadRepository leadRepo;
    private final UserRepository userRepo;
    private final LeadMapper leadMapper;
    private final LeadLogRepository leadLogRepo;

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
        
        if(newStatus == null) {
            lead.setStatus(LeadStatus.PROCESSING);
        }

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
}
