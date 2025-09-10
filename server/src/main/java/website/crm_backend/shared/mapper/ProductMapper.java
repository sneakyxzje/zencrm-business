package website.crm_backend.shared.mapper;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import website.crm_backend.domain.models.categories.Category;
import website.crm_backend.domain.models.products.Product;
import website.crm_backend.features.categories.dtos.shared.CategoryDTO;
import website.crm_backend.features.products.dtos.response.CreateProductResponse;
import website.crm_backend.features.products.dtos.response.GetAllProductResponse;
import website.crm_backend.features.products.dtos.shared.ProductDTO;

@Component
public class ProductMapper {

    public ProductDTO toProductDTO(Product p) {
        return new ProductDTO(
            p.getId(),
            p.getProductName(),
            p.getPrice()
        );
    }
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
    public GetAllProductResponse toGetAllProductResponse(Product p) {
        Set<String> categoryNames = p.getCategories().stream()
        .map(Category::getCategoryName)
        .collect(Collectors.toSet());

        return new GetAllProductResponse(
            p.getId(),
            p.getProductName(),
            categoryNames
        );
    }
}
