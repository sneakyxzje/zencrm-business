package website.crm_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import website.crm_backend.DTOS.response.AssignableSaleResponse;
import website.crm_backend.models.User;
import website.crm_backend.models.enums.UserRole;
import website.crm_backend.repositories.UserRepository;
import website.crm_backend.repositories.spec.UserSpecs;

@Service
public class UserService {
    
    @Autowired
    UserRepository userRepo;
    
    public Page<AssignableSaleResponse> getAssignableSales(
        String q,
        Integer teamId,
        Pageable pageable
    ) {
        Specification<User> spec = (r, query ,cb) -> cb.conjunction();
        spec = spec.and(UserSpecs.roleIs(UserRole.ROLE_SALE))
        .and(UserSpecs.teamIdEquals(teamId))
        .and(UserSpecs.nameContains(q));

        return userRepo.findAll(spec, pageable)
        .map(u -> new AssignableSaleResponse(
            u.getId(),
            u.getFullname(),
            u.getTeam().getId(),
            u.getTeam().getTeamName(),
            u.getTeam().getTeamType()
        ));
    }
}
