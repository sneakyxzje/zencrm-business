package website.crm_backend.features.orders.dtos.request;

import java.math.BigDecimal;
public record CreateOrderRequest(
    Integer leadId,
    String address,
    String phoneNumber,
    String customerName,
    BigDecimal priceAtOrder
) {
    
}
