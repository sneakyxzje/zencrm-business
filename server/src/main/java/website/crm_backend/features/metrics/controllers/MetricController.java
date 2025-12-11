package website.crm_backend.features.metrics.controllers;

import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import website.crm_backend.domain.repositories.leads.projections.LeadChartData;
import website.crm_backend.domain.repositories.orders.projections.ChartOrderData;
import website.crm_backend.domain.repositories.users.projections.ChartData;
import website.crm_backend.features.metrics.dtos.LeadMetricsDTO;
import website.crm_backend.features.metrics.dtos.OrderMetricsDTO;
import website.crm_backend.features.metrics.dtos.UserMetricsDTO;
import website.crm_backend.features.metrics.services.LeadMetricsService;
import website.crm_backend.features.metrics.services.OrderMetricsService;
import website.crm_backend.features.metrics.services.UserMetricsService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/api/metrics")
@RequiredArgsConstructor
public class MetricController {
    
    private final UserMetricsService userMetricsService;
    private final LeadMetricsService leadMetricsService;
    private final OrderMetricsService orderMetricsService;
    @GetMapping("/user")
    public ResponseEntity<UserMetricsDTO> getUserMoM() {
        return ResponseEntity.ok(userMetricsService.getUserMoM());
    }
    
    @GetMapping("/user-growth")
    public ResponseEntity<List<ChartData>> getUserGrowthChart() {
        return ResponseEntity.ok(userMetricsService.getUserGrowthChart());
    }

    @GetMapping("/lead")
    public ResponseEntity<LeadMetricsDTO> getLeadMoM() {
        return ResponseEntity.ok(leadMetricsService.getLeadMoM());
    }

    @GetMapping("/lead-growth")
    public ResponseEntity<List<LeadChartData>> getLeadGrowth() {
        return ResponseEntity.ok(leadMetricsService.getLeadGrowth());
    }

    @GetMapping("order")
    public ResponseEntity<OrderMetricsDTO> getOrderMoM() {
        return ResponseEntity.ok(orderMetricsService.getOrderMoM());
    }

    @GetMapping("/order-growth")
    public ResponseEntity<List<ChartOrderData>> getOrderGrowth() {
        return ResponseEntity.ok(orderMetricsService.getOrderGrowthChart());
    }
}
