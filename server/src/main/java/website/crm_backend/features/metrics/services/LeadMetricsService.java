package website.crm_backend.features.metrics.services;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import website.crm_backend.domain.repositories.leads.LeadRepository;
import website.crm_backend.domain.repositories.leads.projections.LeadChartData;
import website.crm_backend.domain.repositories.leads.projections.LeadMoM;
import website.crm_backend.features.metrics.dtos.LeadMetricsDTO;
import website.crm_backend.shared.utils.MetricsUtils;

@Service
@RequiredArgsConstructor
public class LeadMetricsService {
    private final LeadRepository leadRepo;

    public LeadMetricsDTO getLeadMoM() {
        LeadMoM projection = leadRepo.getLeadMoMStats();
        long current = projection.getCurrentCount();
        long previous = projection.getPreviousCount();

        double percentChange = MetricsUtils.calculateGrowthRate(current, previous);
        return new LeadMetricsDTO(
            current, previous, percentChange
        );
    }

    public List<LeadChartData> getLeadGrowth() {
        return leadRepo.getLeadGrowthData();
    }
}
