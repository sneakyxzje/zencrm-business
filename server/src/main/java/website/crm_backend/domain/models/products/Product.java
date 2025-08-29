package website.crm_backend.domain.models.products;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import website.crm_backend.domain.models.categories.Category;

@Entity
@Table(name="products")
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@Builder
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String productName;

    private int amount;

    private BigDecimal price;

    @Builder.Default
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "product_category_map",
        joinColumns = @JoinColumn(name = "product_id", foreignKey = @ForeignKey(name = "fk_pcm_product")),
        inverseJoinColumns = @JoinColumn(name = "category_id", foreignKey = @ForeignKey(name ="fk_pcm_category"))
    )
    private Set<Category> categories = new HashSet<>();
}
