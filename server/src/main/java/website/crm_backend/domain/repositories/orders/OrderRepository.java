package website.crm_backend.domain.repositories.orders;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import website.crm_backend.domain.models.orders.Order;
import website.crm_backend.domain.models.users.User;
import website.crm_backend.domain.repositories.orders.projections.ChartOrderData;
import website.crm_backend.domain.repositories.orders.projections.OrderMoM;

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

    @Query(
        value = """
                SELECT 
                    COALESCE(SUM(o.price_at_order) FILTER(
                        WHERE DATE_TRUNC('month', o.created_at) = DATE_TRUNC('month', CURRENT_TIMESTAMP)
                    ), 0) as currentMonthRevenue,

                    COALESCE(SUM(o.price_at_order) FILTER(
                        WHERE DATE_TRUNC('month', o.created_at) = DATE_TRUNC('month', CURRENT_TIMESTAMP - INTERVAL '1 MONTH')
                    ), 0) as previousMonthRevenue
                FROM orders o
                """,
        nativeQuery = true
    )
    OrderMoM getOrderMoM();

    @Query(
        value = """
            SELECT 
            TO_CHAR(o.created_at, 'MM/YYYY') as timePoint,
            SUM(o.price_at_order) as value
            FROM orders o
             WHERE o.created_at >= DATE_TRUNC('month', CURRENT_TIMESTAMP - INTERVAL '6 MONTH')
             GROUP BY(TO_CHAR(o.created_at, 'MM/YYYY'))
             ORDER BY MIN(o.created_at) ASC
                """, 
            nativeQuery = true
    )
    List<ChartOrderData> getOrderGrowthChart();
}
