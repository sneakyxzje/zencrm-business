package website.crm_backend.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import website.crm_backend.models.User;
import website.crm_backend.repositories.UserRepository;
import website.crm_backend.security.UserDetailsImpl;


@Service
public class CustomUserDetailsService implements UserDetailsService{
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException  {
        User user = userRepository.findByEmail(email);
        if(user == null) {
            throw new UsernameNotFoundException("Cannot find account with email!");
        }
        GrantedAuthority authority = () -> "ROLE_" + user.getRole().toUpperCase();
        return new UserDetailsImpl(user.getId(), user.getEmail(), user.getPassword(), List.of(authority));
    }

    public UserDetails loadUserById(int id) {
        User user = userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found with ID: " + id));
        return new UserDetailsImpl(user);
    }

}
