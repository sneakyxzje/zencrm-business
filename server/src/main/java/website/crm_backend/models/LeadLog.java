package website.crm_backend.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;
import website.crm_backend.models.enums.LeadStatus;
import website.crm_backend.models.enums.LogAction;

@Entity
@Table(name="lead_log")
@Data
public class LeadLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="lead_id", foreignKey = @ForeignKey(name="fk_log_lead"))
    private Lead lead;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="actor_user_id", foreignKey = @ForeignKey(name="fk_log_actor"))
    private User actor;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LogAction action;

    @Enumerated(EnumType.STRING) private LeadStatus fromStatus;
    @Enumerated(EnumType.STRING) private LeadStatus toStatus;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
