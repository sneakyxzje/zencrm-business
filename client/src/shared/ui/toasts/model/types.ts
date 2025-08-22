export type ToastType = "success" | "error" | "warning" | "info";

export type ToastItemProps = {
  type: ToastType;
  title: string;
  message: string;
  progress: number;
  onClose: () => void;
};

export type Toast = {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  progress: number;
  duration: number;
  persistent: boolean;
};
