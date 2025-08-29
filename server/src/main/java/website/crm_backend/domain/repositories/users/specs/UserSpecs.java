package website.crm_backend.domain.repositories.users.specs;

import org.springframework.data.jpa.domain.Specification;

import website.crm_backend.domain.models.users.User;
import website.crm_backend.domain.models.users.enums.UserRole;

public final class UserSpecs {

    public static Specification<User> roleIs(UserRole role) {
        return (r, q, cb) -> cb.equal(r.get("role"), role);
    }

    public static Specification<User> teamIdEquals(Integer teamId) {
        if(teamId == null) return null;
        return (r,q , cb) -> cb.equal(r.get("team").get("id"), teamId);
    }

    public static Specification<User> managedBy(Integer managerId) {
        if(managerId == null) return null;
        return (r,q ,cb) -> cb.equal(r.get("team").get("manager").get("id"), managerId);
    }

    public static Specification<User> nameContains(String qStr) {
        if(qStr == null || qStr.isBlank()) return null;
        return (r, q, cb) -> cb.like(cb.lower(r.get("fullname")), "%"+qStr.toLowerCase()+"%");
    }
}
