package website.crm_backend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Table(
    name = "phoneNumbers",
    uniqueConstraints =  @UniqueConstraint(columnNames = "number")
)
public class PhoneNumber {
    @Id @GeneratedValue(strategy =GenerationType.IDENTITY)
    private long id;

    @NonNull
    @Column(nullable = false, length=12)
    private String number;

}
