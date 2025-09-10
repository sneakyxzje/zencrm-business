package website.crm_backend.shared.mapper;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import website.crm_backend.domain.models.orders.Order;
import website.crm_backend.domain.models.users.User;
import website.crm_backend.features.orders.dtos.response.CreateOrderResponse;
import website.crm_backend.features.products.dtos.shared.ProductDTO;

@Component
@RequiredArgsConstructor
public class OrderMapper {
    
    private final ProductMapper productMapper;
    public CreateOrderResponse toCreateOrderResponse(Order o) {
        if(o == null) {
            return null;
        }
        User marketingUser = o.getMarketingUser();
        User saleUser = o.getSaleUser();

        String marketingName = (marketingUser != null) ? marketingUser.getFullname() : null;
        String saleName = (saleUser != null) ? saleUser.getFullname() : null;

        ProductDTO productDTO = productMapper.toProductDTO(o.getProduct());
        return new CreateOrderResponse(
            o.getCustomerName(),
            o.getAddress(),
            o.getPhoneNumber(),
            productDTO,
            marketingName,
            saleName,
            o.getPriceAtOrder(),
            o.getCreatedAt()
        );
    }
}
