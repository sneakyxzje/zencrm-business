package website.crm_backend.domain.models.products;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
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
import jakarta.persistence.OneToMany;
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

    @Column(name = "base_unit_name")
    private String baseUnitName; 

    @Column(name = "package_unit_name")
    private String packageUnitName; 

    @Column(name = "items_per_package")
    private Integer itemsPerPackage; 

    @Column(nullable = true)
    private String imageUrl;

    @Builder.Default
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "product_category_map",
        joinColumns = @JoinColumn(name = "product_id", foreignKey = @ForeignKey(name = "fk_pcm_product")),
        inverseJoinColumns = @JoinColumn(name = "category_id", foreignKey = @ForeignKey(name ="fk_pcm_category"))
    )
    private Set<Category> categories = new HashSet<>();

    @Builder.Default
    @OneToMany(mappedBy = "mainProduct", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Combo> comboOffer = new HashSet<>();
}
