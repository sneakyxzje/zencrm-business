package website.crm_backend.features.products.services;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import website.crm_backend.domain.models.categories.Category;
import website.crm_backend.domain.models.products.Product;
import website.crm_backend.domain.repositories.categories.CategoryRepository;
import website.crm_backend.domain.repositories.products.ProductRepository;
import website.crm_backend.domain.repositories.products.specs.ProductSpec;
import website.crm_backend.features.products.dtos.request.CreateProductRequest;
import website.crm_backend.features.products.dtos.response.CreateProductResponse;
import website.crm_backend.features.products.dtos.response.GetAllProductResponse;
import website.crm_backend.shared.mapper.ProductMapper;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepo;
    private final CategoryRepository categoryRepo;
    private final ProductMapper productMapper;

    @Transactional
    public CreateProductResponse createProduct(CreateProductRequest request) {
        Set<Category> categories = new HashSet<>();
        if (request.categoryId() != null && !request.categoryId().isEmpty()) {
        categories = new HashSet<>(
            categoryRepo.findAllById(request.categoryId())
        );
         }
        Product product = Product.builder()
        .productName(request.productName())
        .price(request.price())
        .amount(request.amount())
        .categories(categories)
        .build();
        productRepo.save(product);
        
        return productMapper.toCreateProductResponse(product);
    }
    public Page<GetAllProductResponse> getAllProduct(String q, Pageable pageable) {
        Specification<Product> spec = (r, query, cb) -> cb.conjunction();
        if (q != null && !q.trim().isEmpty()) {
            spec = spec.and(ProductSpec.productName(q));
        }
        return productRepo.findAll(spec, pageable).map(p -> productMapper.toGetAllProductResponse(p));
    }
}
