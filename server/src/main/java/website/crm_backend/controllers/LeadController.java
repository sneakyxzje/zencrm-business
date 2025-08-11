package website.crm_backend.controllers;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import website.crm_backend.DTOS.LeadDTO.LeadListDTO;
import website.crm_backend.DTOS.request.UploadLeadRequest;
import website.crm_backend.DTOS.response.UploadLeadResponse;
import website.crm_backend.models.Lead;
import website.crm_backend.services.LeadService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/api/leads")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ROLE_MARKETING')")
public class LeadController {
    
    private final LeadService leadService;


    @PostMapping("/upload")
    public ResponseEntity<?> uploadLead(@RequestBody UploadLeadRequest request) {
        if(request.getPhoneNumber() == null || request.getPhoneNumber().isBlank() ) {
            return ResponseEntity.badRequest().body("Phone number is required");
        }
        Lead lead = leadService.uploadNumber(request.getPhoneNumber());
        UploadLeadResponse dto = new UploadLeadResponse(
            lead.getId(),
            lead.getPhone().getNumber(),
            lead.getCreatedBy().getId(),
            lead.getCreatedBy().getFullname(),
            lead.getStatus().name(),
            lead.getCreatedAt()
        );
        return ResponseEntity.ok(dto);
    } 
    @GetMapping("/list")    
    public ResponseEntity<Page<LeadListDTO>> getAllLeads(Pageable pageable) {
        return ResponseEntity.ok(leadService.getAllLeads(pageable));
    }
}
