package website.crm_backend.features.categories.dtos.request;

import java.util.Set;


public record CreateCategoryRequest(
    String categoryName,
    Set<Integer> productId
) {
    
}
