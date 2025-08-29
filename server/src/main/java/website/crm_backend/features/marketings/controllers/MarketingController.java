package website.crm_backend.features.marketings.controllers;

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
import website.crm_backend.features.leads.dtos.shared.LeadListDTO;
import website.crm_backend.features.marketings.dtos.request.UploadLeadRequest;
import website.crm_backend.features.marketings.dtos.response.UploadLeadResponse;
import website.crm_backend.features.marketings.services.MarketingService;

@RestController
@RequestMapping("/api/marketing/leads")
@RequiredArgsConstructor
public class MarketingController {
    private final MarketingService marketingService;

    @PreAuthorize("hasAnyRole('MARKETING', 'MARKETING_MANAGER')")
    @PostMapping
    public ResponseEntity<UploadLeadResponse> uploadLead(@RequestBody UploadLeadRequest request) {
        return ResponseEntity.ok(marketingService.uploadLead(request));        
    } 

    @GetMapping
    public ResponseEntity<Page<LeadListDTO>> getAllLeads(Pageable pageable) {
        return ResponseEntity.ok(marketingService.getAllLeads(pageable));
    }
}
