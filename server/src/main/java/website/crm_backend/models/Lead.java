package website.crm_backend.models;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Data;
import website.crm_backend.models.enums.LeadStatus;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;

@Entity
@Table(name = "lead")
@Data
public class Lead {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="phone_id", foreignKey = @ForeignKey(name="fk_lead_phone"))
    private PhoneNumber phone;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="created_by_user_id", foreignKey = @ForeignKey(name="fk_lead_created_by"))
    private User createdBy;

    @ManyToOne(fetch = FetchType.LAZY, optional = true )
    @JoinColumn(name="assignee_user_id", foreignKey = @ForeignKey(name="fk_lead_assignee"))
    private User assignee;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LeadStatus status;


    @Column(length=1000) 
    private String note;

    @Column(length=200, nullable = false)
    private String customerName;

    @Column(length=200)
    private String productName;

    private LocalDateTime assignedAt;
    
    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime closedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        if(this.status == LeadStatus.CLOSED && this.closedAt == null) {
            this.closedAt = LocalDateTime.now();
        }
    }
}
