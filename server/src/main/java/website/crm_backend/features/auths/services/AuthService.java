package website.crm_backend.features.auths.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import website.crm_backend.domain.models.teams.Team;
import website.crm_backend.domain.models.users.User;
import website.crm_backend.domain.repositories.teams.TeamRepository;
import website.crm_backend.domain.repositories.users.UserRepository;
import website.crm_backend.features.auths.dtos.request.AuthLoginRequest;
import website.crm_backend.features.auths.dtos.request.AuthRegisterRequest;
import website.crm_backend.features.auths.dtos.response.AuthRegisterResponse;
@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired 
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TeamRepository teamRepository;

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
    
    public String login(AuthLoginRequest request) {
        String email = request.email();
        String password = request.password();
        User user = userRepository.findByEmail(email);
        if(user == null) {
            return "Account not exists";
        }
        
        if(passwordEncoder.matches(password, user.getPassword())) {
            return "Login success!";
        }
        else {
            return "Wrong password";
        }
    }
}
