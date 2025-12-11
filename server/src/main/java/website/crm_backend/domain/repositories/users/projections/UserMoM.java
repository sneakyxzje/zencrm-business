package website.crm_backend.domain.repositories.users.projections;

public interface UserMoM {
    long getCurrentCount();
    long getPreviousCount();
}
