package website.crm_backend.features.combos.shared;

public record CreateComboResponse(
    int id,
    String offerName,
    int requiredQuantity,
    Integer giftItemId,
    int giftQuantity,
    boolean isMandatory
) {
}
