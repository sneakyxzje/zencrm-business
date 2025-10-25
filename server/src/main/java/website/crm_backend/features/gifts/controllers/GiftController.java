package website.crm_backend.features.gifts.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import website.crm_backend.features.gifts.dtos.CreateGiftRequest;
import website.crm_backend.features.gifts.dtos.CreateGiftResponse;
import website.crm_backend.features.gifts.dtos.GiftDTO;
import website.crm_backend.features.gifts.services.GiftServices;

@RestController
@RequestMapping("/api/gifts")
@RequiredArgsConstructor
public class GiftController {
    private final GiftServices giftServices;

    @PostMapping
    public ResponseEntity<CreateGiftResponse> createGift(@RequestBody CreateGiftRequest request) {
        return ResponseEntity.ok(giftServices.createGift(request));
    }

    @GetMapping
    public ResponseEntity<Page<GiftDTO>> getAllGift(Pageable pageable) {
        return ResponseEntity.ok(giftServices.getAll(pageable));
    } 
}
