package website.crm_backend.repositories;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import website.crm_backend.models.PhoneNumber;


public interface PhoneNumberRepository extends JpaRepository<PhoneNumber, Long> {
    Optional<PhoneNumber> findByNumber(String number);
    boolean existsByNumber(String number);
}
