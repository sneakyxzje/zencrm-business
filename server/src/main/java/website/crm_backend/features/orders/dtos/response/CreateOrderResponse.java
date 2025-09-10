package website.crm_backend.features.orders.dtos.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import website.crm_backend.features.products.dtos.shared.ProductDTO;
 
public record CreateOrderResponse(
    String customerName,
    String address,
    String phoneNumber,
    ProductDTO products,
    String marketingName,
    String saleName,
    BigDecimal priceAtOrder,
    LocalDateTime createdAt
) {
    
}
