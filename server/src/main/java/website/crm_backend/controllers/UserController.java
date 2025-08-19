package website.crm_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import website.crm_backend.DTOS.response.AssignableSaleResponse;
import website.crm_backend.services.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {
    
    @Autowired
    UserService userService;

    @GetMapping("/assignable-sales")
    public ResponseEntity<Page<AssignableSaleResponse>> getAssignableSales(
        @RequestParam(required = false) String q,
        @RequestParam(required = false) Integer teamId,
        Pageable pageable
    ) {
        return ResponseEntity.ok(userService.getAssignableSales(q, teamId, pageable));
    }
}
