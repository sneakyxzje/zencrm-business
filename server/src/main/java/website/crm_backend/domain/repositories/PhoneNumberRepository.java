package website.crm_backend.domain.repositories;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import website.crm_backend.domain.models.PhoneNumber;


public interface PhoneNumberRepository extends JpaRepository<PhoneNumber, Long> {
    Optional<PhoneNumber> findByNumber(String number);
    boolean existsByNumber(String number);
}
