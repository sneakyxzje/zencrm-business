package website.crm_backend.shared.mapper;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import website.crm_backend.domain.models.products.Product;
import website.crm_backend.features.category.dtos.shared.CategoryDTO;
import website.crm_backend.features.products.dtos.response.CreateProductResponse;

@Component
public class ProductMapper {
    public CreateProductResponse toCreateProductResponse(Product p) {
        Set<CategoryDTO> categoryDTO = p.getCategories() == null ? Set.<CategoryDTO>of()
        : p.getCategories().stream()
        .map(c -> new CategoryDTO(c.getId(), c.getCategoryName()))
        .collect(Collectors.toSet());
        return new CreateProductResponse(
            p.getId(),
            p.getProductName(),
            p.getPrice(),
            p.getAmount(),
            categoryDTO
        );
    }
}
