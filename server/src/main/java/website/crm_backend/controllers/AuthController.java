package website.crm_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import website.crm_backend.DTOS.LoginDTO;
import website.crm_backend.models.User;
import website.crm_backend.services.UserService;
import website.crm_backend.utils.JwtTokenProvider;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @PostMapping("/register")
    public ResponseEntity<String> Register(@Validated @RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> Login(@RequestBody LoginDTO request, HttpServletResponse response) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String role = authentication.getAuthorities().iterator().next().getAuthority();
        String token = jwtTokenProvider.generateToken(request.getEmail(), role);

        ResponseCookie jwtCookie = ResponseCookie.from("jwt", token)
        .httpOnly(true)
        .secure(false) // change to true when deploy to production
        .path("/")
        .maxAge(24 * 60 * 60)
        .sameSite("Strict")
        .build();

        response.addHeader("Set-Cookie", jwtCookie.toString());
        return ResponseEntity.ok("Login success");
    }
}
