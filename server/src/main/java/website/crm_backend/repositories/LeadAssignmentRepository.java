package website.crm_backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import website.crm_backend.models.LeadAssignment;

public interface LeadAssignmentRepository extends JpaRepository<LeadAssignment, Integer> {
      List<LeadAssignment> findByLead_IdOrderByAssignedAtDesc(int leadId);
}
