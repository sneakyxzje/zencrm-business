package website.crm_backend.shared.mapper;

import org.springframework.stereotype.Component;

import website.crm_backend.domain.models.products.Gift;
import website.crm_backend.features.gifts.dtos.CreateGiftResponse;
import website.crm_backend.features.gifts.dtos.GiftDTO;

@Component
public class GiftMapper {
    public CreateGiftResponse toGiftResponse(Gift g) {
        return new CreateGiftResponse (
            g.getId(),
            g.getGiftName(),
            g.getDescription(),
            g.getQuantityInStock(),
            g.getImageUrl()
        );
    }

    public GiftDTO toGiftDTO(Gift g) {
        return new GiftDTO (
            g.getId(),
            g.getGiftName(),
            g.getQuantityInStock()
        );
    }
}
