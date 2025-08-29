package website.crm_backend.features.staffs.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import website.crm_backend.features.staffs.dtos.response.AssignableSaleResponse;
import website.crm_backend.features.staffs.services.StaffService;

@RestController
@RequestMapping("/api/users")
public class StaffController {
    
    @Autowired
    StaffService staffService;

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
