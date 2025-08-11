package website.crm_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import website.crm_backend.DTOS.request.CreateTeamRequest;
import website.crm_backend.DTOS.response.CreateTeamResponse;
import website.crm_backend.models.Team;
import website.crm_backend.models.User;
import website.crm_backend.models.enums.TeamType;
import website.crm_backend.models.enums.UserRole;
import website.crm_backend.repositories.TeamRepository;
import website.crm_backend.repositories.UserRepository;

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
