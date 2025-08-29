package website.crm_backend.shared.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component
public class JwtTokenProvider {
    private SecretKey secretKey;

    @Value("${app.jwt.secret}")
    private String jwtSecret;
    private final long JWT_EXPIRATION = 86400000;


    @PostConstruct
    public void init() {
        secretKey = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    private Claims parseClaims(String token) {
        return Jwts.parserBuilder()
        .setSigningKey(secretKey)
        .build()
        .parseClaimsJws(token)
        .getBody();
    }

    public String generateToken(int userId, String role) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + JWT_EXPIRATION);

        return Jwts.builder()
        .setSubject(String.valueOf(userId))
        .claim("role", role)
        .setIssuedAt(now)
        .setExpiration(expiryDate)
        .signWith(secretKey)
        .compact();
    }

    public String getEmailFromToken(String token) {
        return Jwts.parserBuilder()
        .setSigningKey(secretKey)
        .build()
        .parseClaimsJws(token)
        .getBody()
        .getSubject();
    }

    public int getUserIdFromToken(String token) {
        return Integer.parseInt(parseClaims(token).getSubject());
    } 

    public String getRoleFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
        .setSigningKey(secretKey)
        .build()
        .parseClaimsJws(token)
        .getBody();

        return claims.get("role", String.class);
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
            return true;
        }
        catch(ExpiredJwtException ex) {
            System.out.println("Token expired");
        } catch(UnsupportedJwtException ex) {
            System.out.println("Unsupported Token");
        } catch (MalformedJwtException ex) {
            System.out.println("JWT wrong structure");
        } catch(IllegalArgumentException ex) {
            System.out.println("Illegal JWT");
        }
        return false;
    }
}
