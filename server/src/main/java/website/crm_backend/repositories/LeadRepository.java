package website.crm_backend.repositories;

import java.util.Collection;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import website.crm_backend.models.Lead;
import website.crm_backend.models.enums.LeadStatus;

public interface LeadRepository extends JpaRepository<Lead, Integer>{
    Page<Lead> findByAssigneeIsNullAndStatus(LeadStatus status, Pageable pageable);
    Page<Lead> findByAssignee_IdAndStatusIn(int assigneeUserId, Collection<LeadStatus> statutes, Pageable pageable);
    Page<Lead> findByCreatedBy_IdOrderByCreatedAtDesc(int createdByUserId, Pageable pageable);
    Page<Lead> findByPhone_NumberOrderByCreatedAtDesc(String number, Pageable pageable);
    Optional<Lead> findTopByPhone_NumberOrderByCreatedAtDesc(String number);

    @EntityGraph(attributePaths = {"phone", "assignee"})
    Page<Lead> findAllByOrderByCreatedAtDesc(Pageable pageable);
}