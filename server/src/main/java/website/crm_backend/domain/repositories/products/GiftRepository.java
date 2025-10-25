package website.crm_backend.domain.repositories.products;

import org.springframework.data.jpa.repository.JpaRepository;

import website.crm_backend.domain.models.products.Gift;

public interface GiftRepository extends JpaRepository<Gift, Integer> {
    
}
