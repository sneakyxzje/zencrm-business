package website.crm_backend.features.marketings.services;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import website.crm_backend.features.leads.dtos.shared.LeadListDTO;
import website.crm_backend.features.marketings.dtos.request.UploadLeadRequest;
import website.crm_backend.features.marketings.dtos.response.UploadLeadResponse;
import website.crm_backend.mapper.LeadMapper;
import website.crm_backend.models.Lead;
import website.crm_backend.models.LeadLog;
import website.crm_backend.models.PhoneNumber;
import website.crm_backend.models.User;
import website.crm_backend.models.enums.LeadStatus;
import website.crm_backend.models.enums.LogAction;
import website.crm_backend.repositories.LeadLogRepository;
import website.crm_backend.repositories.LeadRepository;
import website.crm_backend.repositories.PhoneNumberRepository;
import website.crm_backend.repositories.UserRepository;
import website.crm_backend.utils.AuthUtils;
import website.crm_backend.utils.PhoneNumberUtils;

@Service
@RequiredArgsConstructor
public class MarketingService {

    private final UserRepository userRepo;
    private final PhoneNumberRepository phoneRepo;
    private final LeadRepository leadRepo;
    private final LeadLogRepository leadLogRepo;
    private final LeadMapper leadMapper;

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


}
