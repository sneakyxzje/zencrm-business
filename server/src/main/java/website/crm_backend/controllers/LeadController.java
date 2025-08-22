package website.crm_backend.controllers;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import website.crm_backend.DTOS.request.FindLeadRequest;
import website.crm_backend.DTOS.response.FindLeadResponse;
import website.crm_backend.services.LeadService;
import org.springframework.web.bind.annotation.GetMapping;




@RestController
@RequestMapping("/api/leads")
@RequiredArgsConstructor
public class LeadController {
    
    private final LeadService leadService;

    @GetMapping
    public ResponseEntity<Page<FindLeadResponse>> findLeads(FindLeadRequest request, Pageable pageable) {
        return ResponseEntity.ok(leadService.findLead(request, pageable));
    }

}
