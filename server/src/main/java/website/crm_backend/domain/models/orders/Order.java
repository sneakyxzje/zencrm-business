package website.crm_backend.domain.models.orders;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
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
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import website.crm_backend.domain.models.leads.Lead;
import website.crm_backend.domain.models.products.Product;
import website.crm_backend.domain.models.users.User;

@Entity
@Getter @Setter
@Table(name = "orders")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Order {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String customerName;
    
    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String phoneNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", foreignKey = @ForeignKey(name = "fk_to_product_id"))
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lead_id", foreignKey = @ForeignKey(name = "fk_to_lead_id"))
    private Lead sourceLead;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="marketing_user_id", foreignKey = @ForeignKey(name = "fk_marketing_user_id"))
    private User marketingUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="sale_user_id", foreignKey = @ForeignKey(name = "fk_sale_user_id"))
    private User saleUser;

    private BigDecimal priceAtOrder;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
