package website.crm_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import website.crm_backend.models.User;
import website.crm_backend.repositories.UserRepository;
import website.crm_backend.security.UserDetailsImpl;


@Service
public class CustomUserDetailsService implements UserDetailsService{
    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException  {
        User user = userRepository.findByEmail(email);
        if(user == null) {
            throw new UsernameNotFoundException("Cannot find account with email!");
        }
        return UserDetailsImpl.from(user);
    }

    @Transactional
    public UserDetails loadUserById(int id) {
        User user = userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found with ID: " + id));
        return UserDetailsImpl.from(user);
    }

}
