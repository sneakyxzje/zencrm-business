package website.crm_backend.features.leads.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import website.crm_backend.domain.models.leads.Lead;
import website.crm_backend.domain.repositories.leads.LeadRepository;
import website.crm_backend.features.leads.dtos.request.FindLeadRequest;
import website.crm_backend.features.leads.dtos.response.FindLeadResponse;
import website.crm_backend.features.leads.dtos.response.GetLeadByIdResponse;
import website.crm_backend.shared.mapper.LeadMapper;

@Service
@RequiredArgsConstructor
public class LeadService {
    private final LeadRepository leadRepo;
    private final Logger log =  LoggerFactory.getLogger(LeadService.class);
    private final LeadMapper leadMapper;

    public Page<FindLeadResponse> findLead(FindLeadRequest request, Pageable pageable) {
        String phoneNumber = request.phoneNumber();
        log.info(phoneNumber);
        Page<Lead> lead = leadRepo.findByPhone_NumberOrderByCreatedAtDesc(phoneNumber, pageable);
        return lead.map(leadMapper::toFindLeadResponse);
    }
   
    public GetLeadByIdResponse getLeadById(Integer leadId) {
        Lead lead = leadRepo.findById(leadId)
        .orElseThrow(() -> new IllegalArgumentException("leadRepo: Lead not found"));

        return leadMapper.toGetLeadById(lead);
    }
}
