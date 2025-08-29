package website.crm_backend.shared.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import website.crm_backend.domain.models.teams.enums.TeamType;
import website.crm_backend.domain.models.users.User;

public class UserDetailsImpl implements UserDetails {
    private final int id;
    private final String email;
    private final String fullname;
    private final String password;
    private final Collection<? extends GrantedAuthority> authorities;

    private final Integer teamId;
    private final String teamName;
    private final TeamType teamType;

    public UserDetailsImpl(
        int id, 
        String email,
        String fullname, 
        String password, 
        Collection<? extends GrantedAuthority> authorities,
        Integer teamId,
        String teamName,
        TeamType teamType
        ) {
        this.id = id;
        this.email = email;
        this.fullname = fullname;
        this.password = password;
        this.authorities = authorities;
        this.teamId = teamId;
        this.teamName = teamName;
        this.teamType = teamType;
    }

    public static UserDetailsImpl from(User user) {
        var t = user.getTeam();
        GrantedAuthority auth = () -> user.getRole().name();
        return new UserDetailsImpl(
            user.getId(), user.getEmail(), user.getFullname(), user.getPassword(),
            List.of(auth),
            t != null ? t.getId() : null,
            t != null ? t.getTeamName() : null,
            t != null ? t.getTeamType() : null
        );
    }

    public int getId() {
        return id;
    }

    public Integer getTeamId() {
        return teamId;
    }

    public String getFullname() {
        return fullname;
    }

    public String getTeamName() {
        return teamName;
    }

    public TeamType getTeamType() {
        return teamType;
    }

    @Override
    public String getUsername() {
        return email;
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
