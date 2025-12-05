package website.crm_backend.features.marketings.services;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import website.crm_backend.domain.models.PhoneNumber;
import website.crm_backend.domain.models.leads.Lead;
import website.crm_backend.domain.models.leads.enums.LeadStatus;
import website.crm_backend.domain.models.logs.LeadLog;
import website.crm_backend.domain.models.logs.enums.LogAction;
import website.crm_backend.domain.models.products.Product;
import website.crm_backend.domain.models.users.User;
import website.crm_backend.domain.repositories.PhoneNumberRepository;
import website.crm_backend.domain.repositories.leads.LeadRepository;
import website.crm_backend.domain.repositories.leads.specs.LeadSpecs;
import website.crm_backend.domain.repositories.logs.LeadLogRepository;
import website.crm_backend.domain.repositories.products.ProductRepository;
import website.crm_backend.domain.repositories.users.UserRepository;
import website.crm_backend.features.leads.dtos.shared.LeadListDTO;
import website.crm_backend.features.marketings.dtos.request.UploadLeadRequest;
import website.crm_backend.features.marketings.dtos.response.UploadLeadResponse;
import website.crm_backend.shared.mapper.LeadMapper;
import website.crm_backend.shared.utils.AuthUtils;
import website.crm_backend.shared.utils.PhoneNumberUtils;

@Service
@RequiredArgsConstructor
public class MarketingService {

    private final UserRepository userRepo;
    private final PhoneNumberRepository phoneRepo;
    private final LeadRepository leadRepo;
    private final LeadLogRepository leadLogRepo;
    private final LeadMapper leadMapper;
    private final ProductRepository productRepo;

    @Transactional
    public UploadLeadResponse uploadLead(UploadLeadRequest request) {
        var creator = userRepo.getReferenceById(AuthUtils.getUserId());
        String phoneNumber = PhoneNumberUtils.normalize(request.phoneNumber());
        PhoneNumber phone = phoneRepo.findByNumber(phoneNumber)
        .orElseGet(() -> phoneRepo.save(new PhoneNumber(phoneNumber)));
        Product product = productRepo.findById(request.productId())
        .orElseThrow(() -> new IllegalArgumentException("Product not found"));
        Lead lead = Lead.builder()
        .createdBy(creator)
        .customerName(request.customerName())
        .phone(phone)
        .product(product)
        .address(request.address())
        .status(LeadStatus.NEW)
        .build();

        User assignee = null;
        if(request.assignee() != null) {
            assignee = userRepo.findById(request.assignee())
            .orElseThrow(() -> new IllegalArgumentException("Assignee not found"));

            lead.setStatus(LeadStatus.ASSIGNED);
            lead.setAssignee(assignee);
            lead.setAssignedBy(creator);
            lead.setAssignedAt(LocalDateTime.now());
        } else {
            lead.setStatus(LeadStatus.NEW);
        }
        Lead savedLead = leadRepo.save(lead);

        LeadLog createLog = LeadLog.builder()
                .lead(savedLead)
                .actor(creator)
                .action(LogAction.UPLOAD_NEW)
                .toStatus(LeadStatus.NEW)   
                .createdAt(LocalDateTime.now())
                .build();
        leadLogRepo.save(createLog);
        if(request.assignee() != null) {
            LeadLog assignLog = LeadLog.builder()
                .lead(savedLead)
                .actor(creator)
                .action(LogAction.ASSIGN)
                .fromStatus(LeadStatus.NEW)
                .toStatus(LeadStatus.ASSIGNED)
                .targetUser(assignee)
                .createdAt(LocalDateTime.now().plusSeconds(1))
                .build();
            leadLogRepo.save(assignLog);
        }
        return leadMapper.toUploadLeadResponse(savedLead);
    }

    public Page<LeadListDTO> getAllLeads(String search, Pageable pageable) {
        int user = AuthUtils.getUserId();
        Specification<Lead> spec = (root, query, cb) -> cb.conjunction();
        spec = LeadSpecs.isCreatedBy(user);
        if(search != null && !search.isBlank()) {
            spec = spec.and(LeadSpecs.hasKeyword(search));
        }
        return leadRepo.findAll(spec, pageable).map(leadMapper::toListDTO);
    }
}
