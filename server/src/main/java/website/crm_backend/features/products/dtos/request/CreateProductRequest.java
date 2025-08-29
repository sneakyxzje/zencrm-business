package website.crm_backend.features.products.dtos.request;

import java.math.BigDecimal;
import java.util.Set;

public record CreateProductRequest(
    String productName,
    int amount,
    BigDecimal price,
    Set<Integer> categoryId
) {
    
}
