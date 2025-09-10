package website.crm_backend.features.orders.services;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import website.crm_backend.domain.models.leads.Lead;
import website.crm_backend.domain.models.orders.Order;
import website.crm_backend.domain.models.products.Product;
import website.crm_backend.domain.models.users.User;
import website.crm_backend.domain.repositories.leads.LeadRepository;
import website.crm_backend.domain.repositories.orders.OrderRepository;
import website.crm_backend.domain.repositories.products.ProductRepository;
import website.crm_backend.features.orders.dtos.request.CreateOrderRequest;
import website.crm_backend.features.orders.dtos.response.CreateOrderResponse;
import website.crm_backend.shared.mapper.OrderMapper;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {
    
    private final LeadRepository leadRepo;
    private final ProductRepository productRepo;
    private final OrderRepository orderRepo;
    private final OrderMapper orderMapper;
    
    @Transactional
    public CreateOrderResponse createOrder(CreateOrderRequest request) {
        log.info("Creating order for lead ID: {}", request.leadId());
        log.info("Product Id", request.productId());
        log.info("Sale", request.saleId());
        log.info("Marketing", request.marketingId());
        Lead lead = leadRepo.findById(request.leadId())
        .orElseThrow(() -> new IllegalArgumentException("Lead not found"));

        Product product = productRepo.findById(request.productId())
        .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        log.info(request.leadId().toString());
        log.info(request.saleId().toString());
        log.info(request.marketingId().toString());
        log.info(request.productId().toString());
        User marketing = lead.getCreatedBy();
        User sale = lead.getAssignee();

        Order order = Order.builder()
        .address(request.address())
        .customerName(request.customerName())
        .marketingUser(marketing)
        .saleUser(sale)
        .phoneNumber(request.phoneNumber())
        .priceAtOrder(request.priceAtOrder())
        .product(product)
        .sourceLead(lead)
        .build();

        orderRepo.save(order);

        return orderMapper.toCreateOrderResponse(order);
    }
}
