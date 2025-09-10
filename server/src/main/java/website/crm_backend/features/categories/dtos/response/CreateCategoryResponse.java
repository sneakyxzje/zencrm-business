package website.crm_backend.features.categories.dtos.response;

import java.util.Set;

import website.crm_backend.features.products.dtos.shared.ProductDTO;

public record CreateCategoryResponse(
    int id,
    String categoryName,
    Set<ProductDTO> products
) {
    
}
