package website.crm_backend.domain.repositories.orders.projections;

public interface OrderMoM {
    Double getCurrentMonthRevenue(); 
    Double getPreviousMonthRevenue();
}
