package website.crm_backend.domain.models.leads.enums;


/*

    NEW - Chưa gán
    ASSIGNED - Đã gán
    PROCESSING - Đang chăm sóc
    READY_TO_ORDER - Chốt, sẵn sàng mua
    WIN - Đơn hàng giao thành công
    CLOSED - Số đóng huỷ
*/
public enum LeadStatus {
    NEW,
    ASSIGNED,
    PROCESSING,
    CLOSED,
    READY_TO_ORDER,
    DELIVERING,
    WIN
}
