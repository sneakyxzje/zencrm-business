package website.crm_backend.features.orders.services;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import website.crm_backend.domain.models.leads.Lead;
import website.crm_backend.domain.models.leads.enums.LeadStatus;
import website.crm_backend.domain.models.logs.LeadLog;
import website.crm_backend.domain.models.logs.enums.LogAction;
import website.crm_backend.domain.models.orders.Order;
import website.crm_backend.domain.models.products.Product;
import website.crm_backend.domain.models.users.User;
import website.crm_backend.domain.repositories.leads.LeadRepository;
import website.crm_backend.domain.repositories.logs.LeadLogRepository;
import website.crm_backend.domain.repositories.orders.OrderRepository;
import website.crm_backend.features.orders.dtos.request.CreateOrderRequest;
import website.crm_backend.features.orders.dtos.response.CreateOrderResponse;
import website.crm_backend.shared.mapper.OrderMapper;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {
    
    private final LeadRepository leadRepo;
    private final OrderRepository orderRepo;
    private final OrderMapper orderMapper;
    private final LeadLogRepository leadLogRepo;


    @Transactional
    public CreateOrderResponse createOrder(CreateOrderRequest request) {
        Lead lead = leadRepo.findById(request.leadId())
        .orElseThrow(() -> new IllegalArgumentException("Lead not found"));

        if (lead.getStatus() == LeadStatus.DELIVERING) {
            throw new RuntimeException("Lead already converted");
        }

        Product product = lead.getProduct();
        User marketing = lead.getCreatedBy();
        String customerName = lead.getCustomerName();
        User sale = lead.getAssignee();
        Order order = Order.builder()
        .address(request.address())
        .customerName(customerName)
        .marketingUser(marketing)
        .saleUser(sale)
        .phoneNumber(request.phoneNumber())
        .priceAtOrder(request.priceAtOrder())
        .product(product)
        .sourceLead(lead)
        .build();
        
        lead.setStatus(LeadStatus.DELIVERING);
        leadRepo.save(lead);

        LeadLog leadLog = LeadLog.builder()
        .lead(lead)
        .action(LogAction.STATUS_CHANGE)
        .actor(sale)
        .fromStatus(LeadStatus.READY_TO_ORDER)
        .toStatus(LeadStatus.DELIVERING)
        .build();
        leadLogRepo.save(leadLog);
        orderRepo.save(order);

        return orderMapper.toCreateOrderResponse(order);
    }
}
