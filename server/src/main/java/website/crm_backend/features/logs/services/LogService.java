package website.crm_backend.features.logs.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import website.crm_backend.domain.models.logs.LeadLog;
import website.crm_backend.domain.repositories.logs.LeadLogRepository;
import website.crm_backend.features.logs.dtos.shared.LeadLogDTO;
import website.crm_backend.shared.mapper.LogMapper;

@Service
@RequiredArgsConstructor
public class LogService {
    
    private final LogMapper logMapper;
    private final LeadLogRepository leadLogRepo;

    public Page<LeadLogDTO> getLogByLeadId(Integer leadId, Pageable pageable) {
        Page<LeadLog> log = leadLogRepo.findByLead_Id(leadId, pageable);
        return log.map(logMapper::toLeadLogDTO);
    }
}
