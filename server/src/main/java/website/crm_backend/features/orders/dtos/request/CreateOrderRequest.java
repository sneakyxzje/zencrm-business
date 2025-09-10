package website.crm_backend.features.orders.dtos.request;

import java.math.BigDecimal;
public record CreateOrderRequest(
    String customerName,
    String address,
    String phoneNumber,
    Integer productId,
    Integer leadId,
    Integer marketingId,
    Integer saleId,
    BigDecimal priceAtOrder
) {
    
}
