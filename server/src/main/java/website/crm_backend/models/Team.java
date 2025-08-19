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
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;
import website.crm_backend.models.enums.TeamType;

@Entity
@Data
@Table(name="teams")
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 100, unique = true)
    private String teamName;

    @OneToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name="fk_manager_id", nullable = true, foreignKey = @ForeignKey(name = "fk_manager_team_id"))
    private User manager;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TeamType teamType;
}
