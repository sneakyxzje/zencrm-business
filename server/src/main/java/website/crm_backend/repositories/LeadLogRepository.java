package website.crm_backend.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import website.crm_backend.models.LeadLog;
import website.crm_backend.models.enums.LogAction;

public interface LeadLogRepository extends JpaRepository<LeadLog, Integer> {
    Page<LeadLog> findByLead_Id(int leadId, Pageable pageable);
    Page<LeadLog> findByActor_IdOrderByCreatedAtDesc(int actorUserId, Pageable pageable);
    List<LeadLog> findTop50ByActionOrderByCreatedAtDesc(LogAction action);
}
