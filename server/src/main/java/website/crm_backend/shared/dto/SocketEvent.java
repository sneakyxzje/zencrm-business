package website.crm_backend.shared.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SocketEvent<T> {
    private String type;
    private String message;
    private T data;
}
