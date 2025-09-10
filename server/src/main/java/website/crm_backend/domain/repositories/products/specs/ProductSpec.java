package website.crm_backend.domain.repositories.products.specs;

import org.springframework.data.jpa.domain.Specification;

import website.crm_backend.domain.models.products.Product;

public final class ProductSpec {
    public static Specification<Product> productName(String p) {
        return (r, q, cb) -> cb.like(cb.lower(r.get("productName")), "%" + p.toLowerCase() + "%");
    }
}
