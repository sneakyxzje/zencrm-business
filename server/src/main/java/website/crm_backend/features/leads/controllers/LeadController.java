package website.crm_backend.features.leads.controllers;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import website.crm_backend.features.leads.dtos.request.FindLeadRequest;
import website.crm_backend.features.leads.dtos.response.FindLeadResponse;
import website.crm_backend.features.leads.dtos.response.GetLeadByIdResponse;
import website.crm_backend.features.leads.services.LeadService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("/api/leads")
@RequiredArgsConstructor
public class LeadController {
    
    private final LeadService leadService;

    @GetMapping
    public ResponseEntity<Page<FindLeadResponse>> findLeads(FindLeadRequest request, Pageable pageable) {
        return ResponseEntity.ok(leadService.findLead(request, pageable));
    }

    @GetMapping("/{leadId}")
    public ResponseEntity<GetLeadByIdResponse> getLeadById(@PathVariable Integer leadId) {
        return ResponseEntity.ok(leadService.getLeadById(leadId));
    }
}
