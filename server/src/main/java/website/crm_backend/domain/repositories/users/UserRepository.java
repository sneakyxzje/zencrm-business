package website.crm_backend.domain.repositories.users;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import website.crm_backend.domain.models.users.User;
import website.crm_backend.domain.repositories.users.projections.ChartData;
import website.crm_backend.domain.repositories.users.projections.UserMoM;


public interface UserRepository extends JpaRepository<User, Integer>, JpaSpecificationExecutor<User> {
    boolean existsByEmail(String email);
    User findByEmail(String email);

    @Override
    @NonNull
    @EntityGraph(attributePaths = {"team","team.manager"})
    Page<User> findAll(@Nullable Specification<User> spec, @Nullable Pageable pageable);

    @Query(
    value = "SELECT " + 
        " COUNT(CASE WHEN DATE_TRUNC('month', u.created_at) = DATE_TRUNC('month', CURRENT_TIMESTAMP) THEN 1 END) AS currentCount, " +
        " COUNT(CASE WHEN DATE_TRUNC('month', u.created_at) = DATE_TRUNC('month', CURRENT_TIMESTAMP - INTERVAL '1 MONTH') THEN 1 END) AS previousCount " +
        "FROM users u", 
    nativeQuery = true 
    )
    UserMoM getUserMoMStats();

    @Query (
        value="""
                SELECT TO_CHAR(created_at, 'MM/YYYY') as timePoint,
                COUNT(id) as value
                FROM users WHERE created_at >= CURRENT_DATE - INTERVAL '6 months'
                GROUP BY TO_CHAR(created_at, 'MM/YYYY')
                ORDER BY MIN(created_at) ASC 
                """, nativeQuery = true
    )
    List<ChartData> getUserGrowthChart();
}
