package website.crm_backend.features.products.dtos.shared;

import java.math.BigDecimal;

public record ProductDTO(
    int id,
    String productName,
    BigDecimal price
) {
    
}
