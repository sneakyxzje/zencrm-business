package website.crm_backend.features.gifts.dtos;

public record CreateGiftRequest(
    String giftName,
    String description,
    Integer quantityInStock,
    String imageUrl
) {
    
}
