export const ActionDisplay = (act: string) => {
  switch (act) {
    case "UPLOAD_NEW":
      return "created";
    case "NEW":
      return "new lead";
    case "ASSIGNED":
      return "assigned";
    case "ASSIGN":
      return "assigned";
    case "STATUS_CHANGE":
      return "change status";
    case "IN_PROGRESS":
      return "in progress";
    case "CALLED":
      return "called";
  }
};
