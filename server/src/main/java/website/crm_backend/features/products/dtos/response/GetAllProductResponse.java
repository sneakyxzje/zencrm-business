package website.crm_backend.features.products.dtos.response;

import java.math.BigDecimal;
import java.util.Set;


public record GetAllProductResponse(
    int id,
    String productName,
    int amount,
    BigDecimal price,
    String imageUrl,
    Set<String> categoryName
) {
    
}
