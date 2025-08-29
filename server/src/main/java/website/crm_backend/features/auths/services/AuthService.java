package website.crm_backend.features.auths.services;


import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import website.crm_backend.domain.models.teams.Team;
import website.crm_backend.domain.models.users.User;
import website.crm_backend.domain.repositories.teams.TeamRepository;
import website.crm_backend.domain.repositories.users.UserRepository;
import website.crm_backend.features.auths.dtos.request.AuthLoginRequest;
import website.crm_backend.features.auths.dtos.request.AuthRegisterRequest;
import website.crm_backend.features.auths.dtos.response.AuthRegisterResponse;
import website.crm_backend.shared.security.JwtTokenProvider;
import website.crm_backend.shared.security.UserDetailsImpl;
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final TeamRepository teamRepository;

    private final AuthenticationManager authenticationManager;

    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public AuthRegisterResponse registerUser(AuthRegisterRequest request) {
        if(userRepository.existsByEmail(request.email())) {
            return null;
        }
        User user = new User();
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setFullname(request.fullname());
            if (request.role() == null) {
        throw new IllegalArgumentException("Role is required");
    }
        user.setRole(request.role());
        Team team = null;
        if(request.teamId() != null) {
            team = teamRepository.findById(request.teamId()).orElseThrow(() -> new IllegalArgumentException("Team not found"));
        }
        user.setTeam(team);
        User saved = userRepository.save(user);
        Integer teamId = (saved.getTeam() != null) ? saved.getTeam().getId() : null;
        return new AuthRegisterResponse(
            saved.getFullname(),
            saved.getEmail(),
            saved.getRole() != null ? saved.getRole().name() : null,
            teamId
        );
    }
    
    @Transactional
    public ResponseCookie login(AuthLoginRequest request) {
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

        return ResponseCookie.from("jwt", token)
        .httpOnly(true)
        .secure(false) 
        .path("/")
        .maxAge(24 * 60 * 60)
        .sameSite("Strict")
        .build();
    }

    public ResponseCookie logout() {
        return ResponseCookie.from("jwt", "")
        .httpOnly(true)
        .secure(false)
        .path("/")
        .maxAge(0)
        .sameSite("Strict")
        .build();
    }
}
