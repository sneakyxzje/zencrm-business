package website.crm_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import website.crm_backend.DTOS.LoginDTO;
import website.crm_backend.models.User;
import website.crm_backend.repositories.UserRepository;
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired 
    private PasswordEncoder passwordEncoder;

    public ResponseEntity<String> registerUser(User user) {
        if(userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already registered");
        }
        else {
            String encodedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(encodedPassword);
            userRepository.save(user);        
            return ResponseEntity.ok("Register successful");
        }
    }
    
    public ResponseEntity<String> login(LoginDTO loginDTO) {
        String email = loginDTO.getEmail();
        String password = loginDTO.getPassword();
        User user = userRepository.findByEmail(email);
        if(user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Account don't exists");
        }
        
        if(passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.ok("Login succesfully");
        }
        else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong password!");
        }
    }
}
