package website.crm_backend.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import website.crm_backend.DTOS.request.AuthLoginRequest;
import website.crm_backend.DTOS.request.AuthRegisterRequest;
import website.crm_backend.DTOS.response.AuthRegisterResponse;
import website.crm_backend.repositories.UserRepository;
import website.crm_backend.security.JwtAuthenticationFilter;
import website.crm_backend.security.JwtTokenProvider;
import website.crm_backend.security.UserDetailsImpl;
import website.crm_backend.services.UserService;
import website.crm_backend.utils.AuthUtils;
import website.crm_backend.utils.CookieUtils;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    CookieUtils cookie;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<AuthRegisterResponse> register(@Validated @RequestBody AuthRegisterRequest request) {
        AuthRegisterResponse response = userService.registerUser(request);
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

    @GetMapping("/info")
    public ResponseEntity<?> getInfo(HttpServletRequest request) {
        String token = cookie.getJwtFromCookies(request);
        if(token == null || !jwtTokenProvider.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
        else {
            int userId = AuthUtils.getUserId();
            String username = AuthUtils.getUsername();
            String role = AuthUtils.getRole();

            Map<String, Object> response = new HashMap<>();
            response.put("id", userId);
            response.put("username", username);
            response.put("role", role);

            return ResponseEntity.ok(response);
        }
    }
}
