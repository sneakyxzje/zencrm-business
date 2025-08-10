package website.crm_backend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import website.crm_backend.models.enums.*;

@Entity
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
    private Role role = Role.ROLE_MARKETING;

    public User() {}

    public int getId() {
        return id;
    }

    public String getFullname() {
        return fullname;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Role getRole() {
        return role;
    }


    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
