package website.crm_backend.features.products.dtos.response;

import java.math.BigDecimal;
import java.util.Set;

import website.crm_backend.features.combos.shared.CreateComboResponse;

public record ProductDetailResponse(
    int id,
    String productName,
    BigDecimal price,
    int amount,
    String imageUrl,
    Set<String> categoryName,
    Set<CreateComboResponse> combos,
    String base_unit_name,
    Integer items_per_package,
    String package_unit_name
) {
    
}
