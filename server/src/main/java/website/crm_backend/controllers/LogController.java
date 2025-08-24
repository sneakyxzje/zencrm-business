package website.crm_backend.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import website.crm_backend.DTOS.LeadDTO.LeadLogDTO;
import website.crm_backend.services.LogService;

@RestController
@RequestMapping("/api/leads/{leadId}/logs")
@RequiredArgsConstructor
public class LogController {

    private final LogService logService;
    @GetMapping
    public ResponseEntity<Page<LeadLogDTO>> getLogByLeadID(@PathVariable Integer leadId, Pageable pageable) {
        return ResponseEntity.ok(logService.getLogByLeadId(leadId, pageable));
    }
}
