package website.crm_backend.features.staffs.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import website.crm_backend.domain.models.users.User;
import website.crm_backend.domain.models.users.enums.UserRole;
import website.crm_backend.domain.repositories.users.UserRepository;
import website.crm_backend.domain.repositories.users.specs.UserSpecs;
import website.crm_backend.features.staffs.dtos.response.AssignableSaleResponse;

@Service
@RequiredArgsConstructor
public class StaffService {
    
    private final UserRepository userRepo;
    
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
