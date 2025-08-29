package website.crm_backend.features.managers.sales.controllers;

import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import website.crm_backend.DTOS.request.AssignLeadRequest;
import website.crm_backend.features.leads.dtos.shared.LeadListDTO;
import website.crm_backend.features.managers.sales.dtos.response.AssignLeadResponse;
import website.crm_backend.features.managers.sales.services.SaleManagerServices;
import website.crm_backend.models.enums.LeadStatus;

@RestController
@RequiredArgsConstructor
public class SaleManagerController {

    private final SaleManagerServices saleManagerServices;
    
    @GetMapping("/assignment-queue")
    @PreAuthorize("hasRole('SALE_MANAGER')")
    public ResponseEntity<Page<LeadListDTO>> queue(@RequestParam(name="statuses", required= false) Set<LeadStatus> statuses, @RequestParam(name="statutes", required = false)Boolean assigned, Pageable pageable) {
        return ResponseEntity.ok(saleManagerServices.getAssigmentQueue(statuses, assigned, pageable));
    }    

    @PostMapping("/{leadId}/assignment")
    @PreAuthorize("hasRole('SALE_MANAGER')")
    public ResponseEntity<AssignLeadResponse> assignLead(@PathVariable int leadId, @RequestBody AssignLeadRequest request) {
        return ResponseEntity.ok(saleManagerServices.assignLead(leadId, request));
    }
}
