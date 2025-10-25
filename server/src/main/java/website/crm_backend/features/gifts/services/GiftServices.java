package website.crm_backend.features.gifts.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import website.crm_backend.domain.models.products.Gift;
import website.crm_backend.domain.repositories.products.GiftRepository;
import website.crm_backend.features.gifts.dtos.CreateGiftRequest;
import website.crm_backend.features.gifts.dtos.CreateGiftResponse;
import website.crm_backend.features.gifts.dtos.GiftDTO;
import website.crm_backend.shared.mapper.GiftMapper;

@Service
@RequiredArgsConstructor
public class GiftServices {
    
    private final GiftRepository giftRepo;
    private final GiftMapper giftMapper;

    public CreateGiftResponse createGift(CreateGiftRequest request) {

        Gift newGift = Gift.builder()
        .giftName(request.giftName())
        .description(request.description())
        .quantityInStock(request.quantityInStock())
        .imageUrl(request.imageUrl())
        .build();

        Gift savedGift = giftRepo.save(newGift);
        return giftMapper.toGiftResponse(savedGift);
    }

    public Page<GiftDTO> getAll(Pageable pageable) {
        return giftRepo.findAll(pageable).map(giftMapper::toGiftDTO);
    }
}
