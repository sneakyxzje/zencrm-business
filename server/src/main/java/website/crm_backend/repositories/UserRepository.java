package website.crm_backend.repositories;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import website.crm_backend.models.User;


public interface UserRepository extends JpaRepository<User, Integer>, JpaSpecificationExecutor<User> {
    boolean existsByEmail(String email);
    User findByEmail(String email);

    @Override
    @EntityGraph(attributePaths = {"team","team.manager"})
    Page<User> findAll(Specification<User> spec, Pageable pageable);
}
