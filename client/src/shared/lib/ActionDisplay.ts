export const ActionDisplay = (act: string) => {
  switch (act) {
    case "UPLOAD_NEW":
      return "đã tạo";
    case "NEW":
      return "new lead";
    case "ASSIGNED":
      return "CHĂM SÓC";
    case "ASSIGN":
      return "đã gán";
    case "STATUS_CHANGE":
      return "đã cập nhật";
    case "READY_TO_ORDER":
      return "CHỐT ĐƠN";
    case "CALLED":
      return "ĐÃ GỌI";
    case "DELIVERING":
      return "Đang giao hàng";
  }
};
