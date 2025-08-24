package website.crm_backend.mapper;

import org.springframework.stereotype.Component;

import website.crm_backend.DTOS.LeadDTO.LeadLogDTO;
import website.crm_backend.models.LeadLog;
import website.crm_backend.models.User;

@Component
public class LogMapper {
    public LeadLogDTO toLeadLogDTO(LeadLog l) {
        if(l == null) {
            return null;
        }

        User actor = l.getActor();
        User target = l.getTargetUser();

        String actorName = actor != null ? actor.getFullname() : null;
        String targetName = target != null ? target.getFullname() : null;
        return new LeadLogDTO(
            l.getId(),
            l.getAction(),
            actorName,
            l.getCreatedAt(),
            targetName
        );
    }
}
