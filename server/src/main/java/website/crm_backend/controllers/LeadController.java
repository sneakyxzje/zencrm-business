package website.crm_backend.controllers;


import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import website.crm_backend.DTOS.LeadDTO.LeadListDTO;
import website.crm_backend.DTOS.request.AssignLeadRequest;
import website.crm_backend.DTOS.request.UploadLeadRequest;
import website.crm_backend.DTOS.response.AssignLeadResponse;
import website.crm_backend.DTOS.response.UploadLeadResponse;
import website.crm_backend.models.enums.LeadStatus;
import website.crm_backend.services.LeadService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;




@RestController
@RequestMapping("/api/leads")
@RequiredArgsConstructor
public class LeadController {
    
    private final LeadService leadService;

    @PreAuthorize("hasRole('MARKETING', 'MARKETING_MANAGER')")
    @PostMapping("/upload")
    public ResponseEntity<UploadLeadResponse> uploadLead(@RequestBody UploadLeadRequest request) {
        return ResponseEntity.ok(leadService.uploadLead(request));        
    } 

    // For marketing
    @PreAuthorize("hasRole('MARKETING', 'MARKETING_MANAGER')")
    @GetMapping("/list")    
    public ResponseEntity<Page<LeadListDTO>> getAllLeads(Pageable pageable) {
        return ResponseEntity.ok(leadService.getAllLeads(pageable));
    }

    // For sale
    @PreAuthorize("hasRole('SALE_MANAGER')")
    @GetMapping("/queue")
    public ResponseEntity<Page<LeadListDTO>> queue(@RequestParam(name="statuses", required= false) Set<LeadStatus> statuses, @RequestParam(name="statutes", required = false)Boolean assigned, Pageable pageable) {
        return ResponseEntity.ok(leadService.getAssigmentQueue(statuses, assigned, pageable));
    }    

    @PreAuthorize("hasRole('SALE_MANAGER')")
    @PostMapping("assign-lead")
    public ResponseEntity<AssignLeadResponse> assignLead(@RequestBody AssignLeadRequest request) {
        return ResponseEntity.ok(leadService.assignLead(request));
    }
    
}
