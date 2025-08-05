package website.crm_backend.repositories;




import org.springframework.data.jpa.repository.JpaRepository;

import website.crm_backend.models.User;


public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByEmail(String email);
    User findByEmail(String email);
}
