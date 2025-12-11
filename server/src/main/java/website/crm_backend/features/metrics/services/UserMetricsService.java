package website.crm_backend.features.metrics.services;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import website.crm_backend.domain.repositories.users.UserRepository;
import website.crm_backend.domain.repositories.users.projections.ChartData;
import website.crm_backend.domain.repositories.users.projections.UserMoM;
import website.crm_backend.features.metrics.dtos.UserMetricsDTO;
import website.crm_backend.shared.utils.MetricsUtils;

@Service
@RequiredArgsConstructor
public class UserMetricsService {
    private final UserRepository userRepo;
    public UserMetricsDTO getUserMoM() {
        UserMoM projection = userRepo.getUserMoMStats();
        long current = projection.getCurrentCount();
        long previous  = projection.getPreviousCount();
        double percentChange = MetricsUtils.calculateGrowthRate(current, previous);
        return new UserMetricsDTO(
            current,
            previous,
            percentChange
        );
    }

    public List<ChartData> getUserGrowthChart() {
        return userRepo.getUserGrowthChart();
    }
}
