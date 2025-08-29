package website.crm_backend.domain.models.leads;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import website.crm_backend.domain.models.users.User;

@Entity
@Getter
@Setter
@Table(name="lead_assignment")
public class LeadAssignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="lead_id", foreignKey = @ForeignKey(name="fk_assignment_lead"))
    private Lead lead;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="assignee_user_id", foreignKey = @ForeignKey(name="fk_assignee_user_id"))
    private User assignee;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="assigned_by_user_id", foreignKey = @ForeignKey(name="fk_assigned_by_user"))
    private User assignedBy;


    private LocalDateTime assignedAt;
    private LocalDateTime unAssignedAt;

    @PrePersist
    protected void onAssign() {
        this.assignedAt = LocalDateTime.now();
    }
}
