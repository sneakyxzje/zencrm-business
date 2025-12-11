package website.crm_backend.domain.repositories.leads;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import website.crm_backend.domain.models.leads.Lead;
import website.crm_backend.domain.models.leads.enums.LeadStatus;
import website.crm_backend.domain.repositories.leads.projections.LeadChartData;
import website.crm_backend.domain.repositories.leads.projections.LeadMoM;
public interface LeadRepository extends JpaRepository<Lead, Integer>, JpaSpecificationExecutor<Lead>{
    Page<Lead> findByAssigneeIsNullAndStatus(LeadStatus status, Pageable pageable);
    Page<Lead> findByAssignee_IdAndStatusIn(int assigneeUserId, Collection<LeadStatus> statutes, Pageable pageable);

    @EntityGraph(attributePaths = {"phone", "createdBy", "createdBy.team", "assignee", "assignee.team"})
    Page<Lead> findByAssignee_Id(Integer userId, Pageable pageable);
    
    Page<Lead> findByCreatedBy_IdOrderByCreatedAtDesc(int createdByUserId, Pageable pageable);

    @EntityGraph(attributePaths = {"phone", "createdBy", "assignee", "product"})
    Page<Lead> findByPhone_NumberOrderByCreatedAtDesc(String number, Pageable pageable);

    Optional<Lead> findTopByPhone_NumberOrderByCreatedAtDesc(String number);

    @EntityGraph(attributePaths = {"phone", "assignee"})
    Page<Lead> findAllByOrderByCreatedAtDesc(Pageable pageable);

    @Override
    @NonNull
    @EntityGraph(attributePaths = {"phone", "createdBy", "assignee"})
    Page<Lead> findAll(@Nullable Specification<Lead> spec, @Nullable Pageable pageable);

    @Query("SELECT DISTINCT l from Lead l " +
    "LEFT JOIN FETCH l.product p " +
    "LEFT JOIN FETCH l.phone n " +
    "LEFT JOIN FETCH l.createdBy cb " +
    "LEFT JOIN FETCH l.assignee a " + 
    "LEFT JOIN FETCH l.assignedBy ab " +

    "LEFT JOIN FETCH p.comboOffer pc " +
    "LEFT JOIN FETCH p.categories cat " +
    "LEFT JOIN FETCH pc.giftItem " +
    "WHERE l.id = :leadId")
    Optional<Lead> findDetailById(@Param("leadId") int leadId);

    @Query("SELECT l FROM Lead l WHERE l.phone.number LIKE CONCAT('%', :search, '%')")
    Page<Lead> findBySearch(@Param("search") String search, Pageable pageable);

    @Query(
        value = "SELECT " +
        " COUNT(CASE WHEN DATE_TRUNC('month', l.created_at) = DATE_TRUNC('month', CURRENT_TIMESTAMP) THEN 1 END) as currentCount, "
        + " COUNT(CASE WHEN DATE_TRUNC('month', l.created_at) = DATE_TRUNC('month', CURRENT_TIMESTAMP - INTERVAL '1 MONTH') THEN 1 END) as previousCount "
        + " from lead l", nativeQuery = true
    )
    LeadMoM getLeadMoMStats();

    @Query (
        value="""
            SELECT TO_CHAR(created_at, 'MM/YYYY') as timePoint,
            COUNT(id) as value
            FROM lead WHERE created_at >= CURRENT_DATE - INTERVAL '6 months'
            GROUP BY TO_CHAR(created_at, 'MM/YYYY')
            ORDER BY MIN(created_at) ASC 
        """, nativeQuery = true
    )
    List<LeadChartData> getLeadGrowthData();
}
