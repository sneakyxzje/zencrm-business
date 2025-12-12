import dayjs from "dayjs";

export const time = (t: string | null): string | undefined => {
  return t ? dayjs(t).format("DD/MM/YYYY HH:mm:s") : undefined;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "Today";
  if (diffDays === 2) return "Yesterday";
  if (diffDays <= 7) return `${diffDays - 1} days ago`;
  return date.toLocaleDateString("vi-VN");
};
