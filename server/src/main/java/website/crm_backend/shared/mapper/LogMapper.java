package website.crm_backend.shared.mapper;

import org.springframework.stereotype.Component;

import website.crm_backend.domain.models.logs.LeadLog;
import website.crm_backend.domain.models.users.User;
import website.crm_backend.features.logs.dtos.shared.LeadLogDTO;

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
            targetName,
            l.getFromStatus(),
            l.getToStatus()
        );
    }
}
