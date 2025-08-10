export type RawRole = "ROLE_ADMIN" | "ROLE_MARKETING" | "ROLE_SALE" | string;

export const displayRole = (role?: RawRole) => {
  switch (role) {
    case "ROLE_ADMIN":
      return "Admin";
    case "ROLE_MARKETING":
      return "Marketing Executive";
    case "ROLE_SALE":
      return "Sale";
    default:
      return "";
  }
};
