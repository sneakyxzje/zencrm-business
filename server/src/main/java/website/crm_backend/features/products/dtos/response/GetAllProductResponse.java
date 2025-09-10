package website.crm_backend.features.products.dtos.response;

import java.util.Set;

public record GetAllProductResponse(
    int id,
    String productName,
    Set<String> categoryName
) {
    
}
