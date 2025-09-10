package website.crm_backend.domain.repositories.orders;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import website.crm_backend.domain.models.orders.Order;
import website.crm_backend.domain.models.users.User;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    
    long countBySaleUser(User saleUser);

    long countByMarketingUser(User marketingUser);

    @Query("SELECT SUM(o.priceAtOrder) FROM Order o WHERE o.saleUser = :saleUser AND o.createdAt BETWEEN :startdate and :enddate")
    BigDecimal sumPriceBySaleUserAndDateRange(
        @Param("saleUser") User saleUser,
        @Param("startDate") LocalDateTime startDate,
        @Param("endDate") LocalDateTime endDate
    );

    @Query("SELECT SUM(o.priceAtOrder) FROM Order o WHERE o.marketingUser = :marketingUser AND o.createdAt BETWEEN :startdate and :enddate")
    BigDecimal sumPriceByMarketingUserAndDateRange(
        @Param("marketingUser") User marketingUser,
        @Param("startDate") LocalDateTime startDate,
        @Param("endDate") LocalDateTime endDate
    );
}
