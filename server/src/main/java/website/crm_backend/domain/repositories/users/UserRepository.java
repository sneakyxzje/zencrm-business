package website.crm_backend.domain.repositories.users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import website.crm_backend.domain.models.users.User;


public interface UserRepository extends JpaRepository<User, Integer>, JpaSpecificationExecutor<User> {
    boolean existsByEmail(String email);
    User findByEmail(String email);

    @Override
    @NonNull
    @EntityGraph(attributePaths = {"team","team.manager"})
    Page<User> findAll(@Nullable Specification<User> spec, @Nullable Pageable pageable);
}
