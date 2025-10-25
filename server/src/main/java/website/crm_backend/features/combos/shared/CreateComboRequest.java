package website.crm_backend.features.combos.shared;

import java.time.LocalDate;

public record CreateComboRequest(
    String offerName,
    int requiredQuantity,
    Integer giftItemId,
    int giftQuantity,
    boolean isMandatory,
    LocalDate startDate,
    LocalDate endDate
) {
    
}
