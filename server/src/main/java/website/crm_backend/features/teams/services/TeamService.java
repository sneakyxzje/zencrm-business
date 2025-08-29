package website.crm_backend.features.teams.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import website.crm_backend.domain.models.teams.Team;
import website.crm_backend.domain.models.teams.enums.TeamType;
import website.crm_backend.domain.models.users.User;
import website.crm_backend.domain.models.users.enums.UserRole;
import website.crm_backend.domain.repositories.teams.TeamRepository;
import website.crm_backend.domain.repositories.users.UserRepository;
import website.crm_backend.features.teams.dtos.request.CreateTeamRequest;
import website.crm_backend.features.teams.dtos.response.CreateTeamResponse;

@Service
public class TeamService {

    @Autowired
    TeamRepository teamRepository;

    @Autowired
    UserRepository userRepository;
    
    private boolean mapsTo(UserRole userRole, TeamType teamType) {
        return switch(teamType) {
            case MARKETING -> userRole == UserRole.ROLE_MARKETING_MANAGER;
            case SALE -> userRole == UserRole.ROLE_SALE_MANAGER;
        };
    }
    @Transactional
    public CreateTeamResponse createTeam(CreateTeamRequest request) {
        User manager = userRepository.findById(request.managerId())
        .orElseThrow(() -> new IllegalArgumentException("Manager not found"));
        if(!mapsTo(manager.getRole(), request.teamType())) {
            throw new IllegalArgumentException("Leader role does not match team type");
        }
        Team team = new Team();
        team.setTeamName(request.teamName());
        team.setManager(manager);
        team.setTeamType(request.teamType());

        Team saved = teamRepository.save(team);

        return new CreateTeamResponse(
            saved.getId(),
            saved.getTeamName(),
            saved.getManager().getFullname(),
            saved.getTeamType().name()
        );
    }
}
