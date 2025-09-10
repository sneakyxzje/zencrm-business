package website.crm_backend.domain.repositories.products;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import website.crm_backend.domain.models.products.Product;

public interface ProductRepository extends JpaRepository<Product, Integer>, JpaSpecificationExecutor<Product>{
    @Override
    @NonNull
    @EntityGraph (attributePaths = {"categories"})
    Page<Product> findAll(@Nullable Specification<Product> spec, @Nullable Pageable pageable);
}
