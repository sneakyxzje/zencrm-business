package website.crm_backend.DTOS;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginDTO {

    private int id;
    private String email;
    private String password;
    private String role;
}
