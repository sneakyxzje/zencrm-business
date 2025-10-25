package website.crm_backend.features.gifts.dtos;

public record CreateGiftResponse(
    int id,
    String giftName,
    String description,
    int quantityInStock,
    String imageUrl
) {
    
}
