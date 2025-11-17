package website.crm_backend.features.leads.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import website.crm_backend.domain.models.leads.Lead;
import website.crm_backend.domain.models.leads.enums.LeadStatus;
import website.crm_backend.domain.repositories.leads.LeadRepository;
import website.crm_backend.domain.repositories.leads.specs.LeadSpecs;
import website.crm_backend.features.leads.dtos.request.FindLeadRequest;
import website.crm_backend.features.leads.dtos.response.FindLeadResponse;
import website.crm_backend.features.leads.dtos.response.GetLeadByIdResponse;
import website.crm_backend.shared.mapper.LeadMapper;

@Service
@RequiredArgsConstructor
public class LeadService {
    private final LeadRepository leadRepo;
    private final LeadMapper leadMapper;

    public Page<FindLeadResponse> findLead(FindLeadRequest request, Pageable pageable) {
        String phoneNumber = request.phoneNumber();

        LeadStatus status = request.status();
        Specification<Lead> spec = (r, q ,cb) -> cb.conjunction();

        if(phoneNumber != null && !phoneNumber.trim().isEmpty()) {
            spec = spec.and(LeadSpecs.phoneNumberEquals(phoneNumber));
        }
        if(status != null) {
            spec = spec.and(LeadSpecs.statusEquals(status));
        }
        Page<Lead> leadPage = leadRepo.findAll(spec, pageable);
        return leadPage.map(leadMapper::toFindLeadResponse);
    }
    
    public GetLeadByIdResponse getLeadById(Integer leadId) {
        Lead lead = leadRepo.findDetailById(leadId)
        .orElseThrow(() -> new IllegalArgumentException("leadRepo: Lead not found"));

        return leadMapper.toGetLeadById(lead);
    }
}
