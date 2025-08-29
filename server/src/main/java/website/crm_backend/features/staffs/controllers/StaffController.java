package website.crm_backend.features.staffs.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import website.crm_backend.features.staffs.dtos.response.AssignableSaleResponse;
import website.crm_backend.features.staffs.services.StaffService;

@RestController
@RequestMapping("/api/staff")
@RequiredArgsConstructor
public class StaffController {
    
    private final StaffService staffService;

    @GetMapping
    public ResponseEntity<Page<AssignableSaleResponse>> findSales(
        @RequestParam(name="q", required = false) String q,
        @RequestParam(name="teamId", required = false) Integer teamId,
        Pageable pageable
    ) {
        Page<AssignableSaleResponse> userPage = staffService.getAssignableSales(q, teamId, pageable);
        return ResponseEntity.ok(userPage);
    }
}
