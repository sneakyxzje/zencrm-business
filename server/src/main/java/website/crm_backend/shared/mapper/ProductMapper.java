package website.crm_backend.shared.mapper;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import website.crm_backend.domain.models.categories.Category;
import website.crm_backend.domain.models.products.Product;
import website.crm_backend.features.categories.dtos.shared.CategoryDTO;
import website.crm_backend.features.combos.shared.CreateComboResponse;
import website.crm_backend.features.products.dtos.response.CreateProductResponse;
import website.crm_backend.features.products.dtos.response.GetAllProductResponse;
import website.crm_backend.features.products.dtos.shared.ProductDTO;

@Component
public class ProductMapper {

    public ProductDTO toProductDTO(Product p) {
        return new ProductDTO(
            p.getId(),
            p.getProductName(),
            p.getPrice()
        );
    }
    public CreateProductResponse toCreateProductResponse(Product p) {
        Set<CategoryDTO> categoryDTO = p.getCategories() == null ? Set.<CategoryDTO>of()
        : p.getCategories().stream()
        .map(c -> new CategoryDTO(c.getId(), c.getCategoryName()))
        .collect(Collectors.toSet());

        Set<CreateComboResponse> comboDTOs = p.getComboOffer() == null ? Set.<CreateComboResponse>of()
            : p.getComboOffer().stream()
                .map(combo -> new CreateComboResponse(
                    combo.getId(),
                    combo.getOfferName(),
                    combo.getRequiredQuantity(),
                    combo.getGiftItem() != null ? combo.getGiftItem().getId() : null,
                    combo.getGiftQuantity(),
                    combo.isMandatory() 
                ))
                .collect(Collectors.toSet());
        return new CreateProductResponse(
            p.getId(),
            p.getProductName(),
            p.getPrice(),
            p.getAmount(),
            categoryDTO,
            comboDTOs
        );
    }
    public GetAllProductResponse toGetAllProductResponse(Product p) {
        Set<String> categoryNames = p.getCategories().stream()
        .map(Category::getCategoryName)
        .collect(Collectors.toSet());
        return new GetAllProductResponse(
            p.getId(),
            p.getProductName(),
            p.getAmount(),
            p.getPrice(),
            p.getImageUrl(),
            categoryNames
        );
    }
}
