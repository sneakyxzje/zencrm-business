package website.crm_backend.domain.models.leads;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import website.crm_backend.domain.models.PhoneNumber;
import website.crm_backend.domain.models.leads.enums.LeadStatus;
import website.crm_backend.domain.models.products.Product;
import website.crm_backend.domain.models.users.User;

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
@Builder
@NoArgsConstructor
@AllArgsConstructor
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", 
    foreignKey = @ForeignKey(name = "fk_lead_to_product")) 
    private Product product;    
    
    @Column(length=1000)
    private String address;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="fk_assigned_by_user_id", foreignKey = @ForeignKey(name="fk_lead_assigned_by"))
    private User assignedBy;

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
