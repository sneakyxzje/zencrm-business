package website.crm_backend.features.auths.controllers;

import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import website.crm_backend.features.auths.dtos.request.AuthLoginRequest;
import website.crm_backend.features.auths.dtos.request.AuthRegisterRequest;
import website.crm_backend.features.auths.dtos.response.AuthRegisterResponse;
import website.crm_backend.features.auths.services.AuthService;
import website.crm_backend.shared.utils.AuthUtils;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthRegisterResponse> register(@Validated @RequestBody AuthRegisterRequest request) {
        AuthRegisterResponse response = authService.registerUser(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthLoginRequest request) {
        ResponseCookie jwtCookie = authService.login(request);
        return ResponseEntity.ok()
        .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
        .body("Login success");
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        ResponseCookie jwtCookie = authService.logout();
        return ResponseEntity.noContent()
        .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
        .build();
    }

    // Refactor later
    @GetMapping("/info")
    public ResponseEntity<?> getInfo(HttpServletRequest request) {
        var res = Map.of(
            "id", AuthUtils.getUserId(),
            "username", AuthUtils.getFullName(),
            "role", AuthUtils.getRole(),
            "teamName", AuthUtils.getTeamName()
        );
        return ResponseEntity.ok(res);
    }
}
