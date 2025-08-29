package website.crm_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import website.crm_backend.config.JwtConfigProperties;
@SpringBootApplication
@EnableConfigurationProperties(JwtConfigProperties.class)
public class CrmBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrmBackendApplication.class, args);
	}

}
