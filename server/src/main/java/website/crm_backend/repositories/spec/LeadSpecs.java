package website.crm_backend.repositories.spec;

import java.util.Set;

import org.springframework.data.jpa.domain.Specification;

import website.crm_backend.models.Lead;
import website.crm_backend.models.enums.LeadStatus;
import website.crm_backend.models.enums.TeamType;

public class LeadSpecs {
    public static Specification<Lead> unassigned() {
        return (r, q, cb) -> cb.isNull(r.get("assignee"));
    }

    public static Specification<Lead> hasAssignee() {
        return (r, q, cb) -> cb.isNotNull(r.get("assignee"));
    }

    public static Specification<Lead> createdByTeamType(TeamType tt) {
        return (r, q , cb) -> cb.equal(r.get("createdBy").get("team").get("teamType"), tt);
    }

    public static Specification<Lead> statusIn(Set<LeadStatus> sts) {
        if (sts == null) return null;
        return (r, q, cb) -> r.get("status").in(sts);
    }
}
