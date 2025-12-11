package website.crm_backend.features.users.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import website.crm_backend.features.users.dtos.response.UserDTOResponse;
import website.crm_backend.features.users.services.UserServices;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    
    private final UserServices userServices;
    @GetMapping
    public ResponseEntity<Page<UserDTOResponse>> getAllUser (Pageable pageable) {
        return ResponseEntity.ok(userServices.getAllUser(pageable));    
    }
}
