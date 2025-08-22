package website.crm_backend.controllers;

import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import website.crm_backend.DTOS.LeadDTO.LeadListDTO;
import website.crm_backend.DTOS.request.AssignLeadRequest;
import website.crm_backend.DTOS.request.UpdateLeadRequest;
import website.crm_backend.DTOS.response.AssignLeadResponse;
import website.crm_backend.DTOS.response.UpdateLeadResponse;
import website.crm_backend.models.enums.LeadStatus;
import website.crm_backend.services.LeadService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sale/leads")
public class SaleLeadController {

    private final LeadService leadService;

    // GET LIST
    @GetMapping
    @PreAuthorize("hasRole('SALE')")
    public ResponseEntity<Page<LeadListDTO>> saleGetAllLeads(Pageable pageable) {
        return ResponseEntity.ok(leadService.saleGetAllLeads(pageable));
    }

    // UPDATE
    @PatchMapping("/{leadId}")
    @PreAuthorize("hasRole('SALE')")
    public ResponseEntity<UpdateLeadResponse> updateLead(@PathVariable int leadId, @RequestBody UpdateLeadRequest request) {
        return ResponseEntity.ok(leadService.updateLead(leadId, request));
    }

    @GetMapping("/assignment-queue")
    @PreAuthorize("hasRole('SALE_MANAGER')")
    public ResponseEntity<Page<LeadListDTO>> queue(@RequestParam(name="statuses", required= false) Set<LeadStatus> statuses, @RequestParam(name="statutes", required = false)Boolean assigned, Pageable pageable) {
        return ResponseEntity.ok(leadService.getAssigmentQueue(statuses, assigned, pageable));
    }    

    @PostMapping("/{leadId}/assignment")
    @PreAuthorize("hasRole('SALE_MANAGER')")
    public ResponseEntity<AssignLeadResponse> assignLead(@PathVariable int leadId, @RequestBody AssignLeadRequest request) {
        return ResponseEntity.ok(leadService.assignLead(leadId, request));
    }
}
