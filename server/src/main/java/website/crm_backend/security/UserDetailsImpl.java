package website.crm_backend.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import website.crm_backend.models.User;

public class UserDetailsImpl implements UserDetails {
    private int id;
    private String fullname;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(int id, String fullname, String password, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.fullname = fullname;
        this.password = password;
        this.authorities = authorities;
    }

    public UserDetailsImpl(User user) {
        this.id = user.getId();
        this.fullname = user.getFullname();
        this.password = user.getPassword();
        this.authorities = List.of(() -> user.getRole().name());
    }

    public int getId() {
        return id;
    }

    @Override
    public String getUsername() {
        return fullname;
    }

    @Override 
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
}
