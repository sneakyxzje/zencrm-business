package website.crm_backend.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import website.crm_backend.DTOS.LeadDTO.LeadLogDTO;
import website.crm_backend.mapper.LogMapper;
import website.crm_backend.models.LeadLog;
import website.crm_backend.repositories.LeadLogRepository;

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
