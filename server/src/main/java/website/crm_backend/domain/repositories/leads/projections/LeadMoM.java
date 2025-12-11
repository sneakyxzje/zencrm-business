package website.crm_backend.domain.repositories.leads.projections;

public interface LeadMoM {
    long getCurrentCount();
    long getPreviousCount();
}
