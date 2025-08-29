package website.crm_backend.features.auths.controllers;

import java.util.Map;

import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import website.crm_backend.features.auths.dtos.request.AuthLoginRequest;
import website.crm_backend.features.auths.dtos.request.AuthRegisterRequest;
import website.crm_backend.features.auths.dtos.response.AuthRegisterResponse;
import website.crm_backend.features.auths.services.AuthService;
import website.crm_backend.shared.security.JwtTokenProvider;
import website.crm_backend.shared.security.UserDetailsImpl;
import website.crm_backend.shared.utils.AuthUtils;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    private final AuthenticationManager authenticationManager;

    private final JwtTokenProvider jwtTokenProvider;


    @PostMapping("/register")
    public ResponseEntity<AuthRegisterResponse> register(@Validated @RequestBody AuthRegisterRequest request) {
        AuthRegisterResponse response = authService.registerUser(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthLoginRequest request, HttpServletResponse response) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
            request.email(),
            request.password()
            )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String role = authentication.getAuthorities().iterator().next().getAuthority();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        int userId = userDetails.getId();
        String token = jwtTokenProvider.generateToken(userId, role);

        ResponseCookie jwtCookie = ResponseCookie.from("jwt", token)
        .httpOnly(true)
        .secure(false) 
        .path("/")
        .maxAge(24 * 60 * 60)
        .sameSite("Strict")
        .build();

        response.addHeader("Set-Cookie", jwtCookie.toString());
        return ResponseEntity.ok("Login success");
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        ResponseCookie jwt = ResponseCookie.from("jwt", "")
        .httpOnly(true)
        .secure(false)
        .path("/")
        .maxAge(0)
        .sameSite("Strict")
        .build();

        response.addHeader(("Set-Cookie"), jwt.toString());

        return ResponseEntity.noContent().build(); // 204
    }
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
