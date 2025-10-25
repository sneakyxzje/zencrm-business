package website.crm_backend.domain.models.products;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="combos")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter @Setter
public class Combo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String offerName;

    @ManyToOne(fetch = FetchType.LAZY)
    private Product mainProduct;

    @Column(nullable = false)
    private int requiredQuantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gift_item_id", nullable = true)
    private Gift giftItem;

    @Column(nullable = false)
    private int giftQuantity;

    @Column(nullable = false)
    @Builder.Default
    private boolean isMandatory = false;

    @Builder.Default
    private boolean isActive = true;
    private LocalDate startDate;
    private LocalDate endDate;
}   