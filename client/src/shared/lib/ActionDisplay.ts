export const ActionDisplay = (act: string) => {
  switch (act) {
    case "UPLOAD_NEW":
      return "created";
    case "ASSIGN":
      return "assigned";
  }
};
