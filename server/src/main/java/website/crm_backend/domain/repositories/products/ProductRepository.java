package website.crm_backend.domain.repositories.products;

import org.springframework.data.jpa.repository.JpaRepository;

import website.crm_backend.domain.models.products.Product;

public interface ProductRepository extends JpaRepository<Product, Integer>{

}
