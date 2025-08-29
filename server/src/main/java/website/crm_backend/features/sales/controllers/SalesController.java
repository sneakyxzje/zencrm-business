package website.crm_backend.features.sales.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import website.crm_backend.features.leads.dtos.shared.LeadListDTO;
import website.crm_backend.features.sales.dtos.request.UpdateLeadRequest;
import website.crm_backend.features.sales.dtos.response.UpdateLeadResponse;
import website.crm_backend.features.sales.services.SaleService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sale/leads")
public class SalesController {
    private final SaleService saleService;

    // GET LIST
    @GetMapping
    @PreAuthorize("hasRole('SALE')")
    public ResponseEntity<Page<LeadListDTO>> saleGetAllLeads(Pageable pageable) {
        return ResponseEntity.ok(saleService.saleGetAllLeads(pageable));
    }

    // UPDATE
    @PatchMapping("/{leadId}")
    @PreAuthorize("hasRole('SALE')")
    public ResponseEntity<UpdateLeadResponse> updateLead(@PathVariable int leadId, @RequestBody UpdateLeadRequest request) {
        return ResponseEntity.ok(saleService.updateLead(leadId, request));
    }        
}
