package website.crm_backend.features.category.dtos.request;

import java.util.Set;


public record CreateCategoryRequest(
    String categoryName,
    Set<Integer> productId
) {
    
}
