package website.crm_backend.features.products.dtos.response;

import java.math.BigDecimal;
import java.util.Set;

import website.crm_backend.features.categories.dtos.shared.CategoryDTO;


public record CreateProductResponse(
    Integer id,
    String productName,
    BigDecimal price,
    Integer amount,
    Set<CategoryDTO> categories
) {
    
}
