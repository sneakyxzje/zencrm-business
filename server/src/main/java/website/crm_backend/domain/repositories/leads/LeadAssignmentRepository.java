package website.crm_backend.domain.repositories.leads;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import website.crm_backend.domain.models.leads.LeadAssignment;

public interface LeadAssignmentRepository extends JpaRepository<LeadAssignment, Integer> {
      List<LeadAssignment> findByLead_IdOrderByAssignedAtDesc(int leadId);
}
