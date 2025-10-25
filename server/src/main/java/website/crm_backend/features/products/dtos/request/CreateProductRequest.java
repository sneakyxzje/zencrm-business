package website.crm_backend.features.products.dtos.request;

import java.math.BigDecimal;
import java.util.Set;

import website.crm_backend.features.combos.shared.CreateComboRequest;

public record CreateProductRequest(
    String productName,
    int amount,
    BigDecimal price,
    Set<Integer> categoryId,
    String baseUnitName,
    String packageUnitName,
    Integer itemsPerPackage,
    String imageUrl,
    Set<CreateComboRequest> combos    
) {
    
}
