export const ICON_KEYS = [
  "home",
  "announcement",
  "customers",
  "campaigns",
  "materials",
] as const;
export type IconKey = (typeof ICON_KEYS)[number];
