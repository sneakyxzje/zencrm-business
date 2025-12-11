package website.crm_backend.features.metrics.services;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import website.crm_backend.domain.repositories.orders.OrderRepository;
import website.crm_backend.domain.repositories.orders.projections.ChartOrderData;
import website.crm_backend.domain.repositories.orders.projections.OrderMoM;
import website.crm_backend.features.metrics.dtos.OrderMetricsDTO;

@Service
@RequiredArgsConstructor
public class OrderMetricsService {
    
    private final OrderRepository orderRepo;

    public OrderMetricsDTO getOrderMoM() {
        OrderMoM projection = orderRepo.getOrderMoM();
        
        double current = (projection != null && projection.getCurrentMonthRevenue() != null) 
                        ? projection.getCurrentMonthRevenue() : 0.0;
                        
        double previous = (projection != null && projection.getPreviousMonthRevenue() != null) 
                        ? projection.getPreviousMonthRevenue() : 0.0;

        double percentChange;

        if (previous == 0) {
            percentChange = (current > 0) ? 100.0 : 0.0;
        } else {
            percentChange = ((current - previous) / previous) * 100.0;
        }

        percentChange = Math.round(percentChange * 100.0) / 100.0;

        return new OrderMetricsDTO(
            (long) current,  
            (long) previous, 
            percentChange
        );
    }

    public List<ChartOrderData> getOrderGrowthChart() {
        return orderRepo.getOrderGrowthChart();
    }
}
