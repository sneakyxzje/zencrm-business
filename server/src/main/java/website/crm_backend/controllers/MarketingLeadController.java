package website.crm_backend.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import website.crm_backend.DTOS.LeadDTO.LeadListDTO;
import website.crm_backend.DTOS.request.UploadLeadRequest;
import website.crm_backend.DTOS.response.UploadLeadResponse;
import website.crm_backend.services.LeadService;

@RestController
@RequestMapping("/api/marketing/leads")
@RequiredArgsConstructor
public class MarketingLeadController {
    private final LeadService leadService;

    @PreAuthorize("hasAnyRole('MARKETING', 'MARKETING_MANAGER')")
    @PostMapping
    public ResponseEntity<UploadLeadResponse> uploadLead(@RequestBody UploadLeadRequest request) {
        return ResponseEntity.ok(leadService.uploadLead(request));        
    } 

    @GetMapping
    public ResponseEntity<Page<LeadListDTO>> getAllLeads(Pageable pageable) {
        return ResponseEntity.ok(leadService.getAllLeads(pageable));
    }
}
