package website.crm_backend.services; // Nhớ check package

import java.math.BigDecimal;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.StopWatch;

import com.github.javafaker.Faker;

import website.crm_backend.domain.models.orders.Order;
import website.crm_backend.domain.models.products.Product;
import website.crm_backend.domain.models.users.User;
import website.crm_backend.domain.models.users.enums.UserRole;
import website.crm_backend.domain.repositories.orders.OrderRepository;
import website.crm_backend.domain.repositories.products.ProductRepository;
import website.crm_backend.domain.repositories.users.UserRepository;
import website.crm_backend.features.metrics.services.OrderMetricsService; 

@SpringBootTest
public class PerformanceTest {

    @Autowired private OrderRepository orderRepo;
    @Autowired private ProductRepository productRepo;
    @Autowired private UserRepository userRepo;      
    
    @Autowired private OrderMetricsService orderMetricsService; 

    @Test
    void seedData() {
        Faker faker = new Faker();
        List<Order> orders = new ArrayList<>();
        System.out.println("Create new dumb data..");

        Product dummyProduct = Product.builder()
                .productName("Test Product Perf")
                .price(new BigDecimal("1000000"))
                .build();
        dummyProduct = productRepo.save(dummyProduct);
        UserRole role = UserRole.ROLE_SALE;
        User dummySale = new User ();
        dummySale.setEmail("sale_perf@test.com");
        dummySale.setFullname("Sale Performance");
        dummySale.setPassword("123");
        dummySale.setRole(role);
        dummySale = userRepo.save(dummySale);

        System.out.println(" Started migrate 100k Orders...");
        
        for (int i = 0; i < 100000; i++) {
            Order o = new Order();
            
            o.setCustomerName(faker.name().fullName());       
            o.setAddress(faker.address().fullAddress());     
            o.setPhoneNumber(faker.phoneNumber().cellPhone());
            o.setPriceAtOrder(new BigDecimal(faker.commerce().price().replace(",", ".")));
            
            o.setProduct(dummyProduct); 
            o.setSaleUser(dummySale);   
            
            Date date = faker.date().past(365, TimeUnit.DAYS); 
            o.setCreatedAt(date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime());
            
            orders.add(o);
            
            if (i % 1000 == 0) {
                orderRepo.saveAll(orders);
                orders.clear();
                System.out.println("Save " + i + " orders...");
            }
        }
        System.out.println("Success.");
    }

    @Test
    void benchmarkChartQuery() {
        System.out.println("\n----------------------------------");
        System.out.println(" Updating...");

        StopWatch stopWatch = new StopWatch();
        stopWatch.start("Query Chart 6 months");
        
        var result = orderMetricsService.getOrderGrowthChart();
        
        stopWatch.stop();

        System.out.println("Benchmark");
        System.out.println("Time taken: " + stopWatch.getTotalTimeMillis() + " ms");
        System.out.println("Seconds:    " + stopWatch.getTotalTimeSeconds() + " s");
        System.out.println("Data size:  " + result.size()); 
        System.out.println("----------------------------------\n");
    }
}