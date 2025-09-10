package website.crm_backend.shared.mapper;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import website.crm_backend.domain.models.categories.Category;
import website.crm_backend.features.categories.dtos.response.CreateCategoryResponse;
import website.crm_backend.features.products.dtos.shared.ProductDTO;

@Component
public class CategoryMapper {
    
    public CreateCategoryResponse toCreateCategoryResponse(Category category) {
        Set<ProductDTO> productDTO = category.getProducts() == null ? Set.<ProductDTO>of()
        : category.getProducts().stream()
        .map(p -> new ProductDTO(p.getId(), p.getProductName(), p.getPrice()))
        .collect(Collectors.toSet());

        return new CreateCategoryResponse(
            category.getId(),
            category.getCategoryName(),
            productDTO
        );
    }
}
