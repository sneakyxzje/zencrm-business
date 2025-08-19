package website.crm_backend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;
import website.crm_backend.models.enums.*;

@Entity
@Data
@Table(
    name = "users",
    uniqueConstraints = @UniqueConstraint(
        name = "uk_users_email",
        columnNames = "email"
    ),
    indexes = @Index(name = "idx_users_role", columnList = "role")
)

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "fullname", nullable = false, length=50)
    private String fullname;    

    @Column(name = "email", nullable = false, length=100)
    private String email;

    @Column(name = "password", nullable = false, length=255)
    private String password;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private UserRole role;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name="team_id", foreignKey = @ForeignKey(name="fk_user_team"))
    private Team team;
}
