package website.crm_backend.features.categories.services;

import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import website.crm_backend.domain.models.categories.Category;
import website.crm_backend.domain.models.products.Product;
import website.crm_backend.domain.repositories.categories.CategoryRepository;
import website.crm_backend.domain.repositories.products.ProductRepository;
import website.crm_backend.features.categories.dtos.request.CreateCategoryRequest;
import website.crm_backend.features.categories.dtos.response.CreateCategoryResponse;
import website.crm_backend.shared.mapper.CategoryMapper;

@Service
@RequiredArgsConstructor
public class CategoryService {
    
    private final ProductRepository productRepo;
    private final CategoryMapper categoryMapper;
    private final CategoryRepository categoryRepo;
    @Transactional
    public CreateCategoryResponse createCategory(CreateCategoryRequest request) {
        Set<Product> product = new HashSet<>();

        if(request.productId() != null && !request.productId().isEmpty()) {
            product = new HashSet<>(
                productRepo.findAllById(request.productId())
            );
        }

        Category category = Category.builder()
        .categoryName(request.categoryName())
        .products(product)
        .build();
        categoryRepo.save(category);

        return categoryMapper.toCreateCategoryResponse(category);
    } 
}
