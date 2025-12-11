package website.crm_backend.shared.mapper;

import org.springframework.stereotype.Component;

import website.crm_backend.domain.models.users.User;
import website.crm_backend.features.users.dtos.response.UserDTOResponse;

@Component
public class UserMapper {
    public UserDTOResponse toUserDTO(User u) {
        String teamName = u.getTeam() != null ? u.getTeam().getTeamName() : null;
        return new UserDTOResponse(
            u.getId(),
            u.getFullname(),
            u.getEmail(),
            u.getRole().name(),
            teamName
        );
    }
}
