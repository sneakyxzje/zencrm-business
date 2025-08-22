import { ToastIcons } from "@shared/ui/toasts/icon/ToastIcon";

export const TOAST_CONFIG = {
  success: {
    icon: <ToastIcons.Success />,
    colors: {
      bg: "bg-emerald-800/90",
      border: "border-emerald-600/50",
      icon: "text-emerald-400",
      iconBg: "bg-emerald-400/20",
      progress: "bg-emerald-400",
    },
  },
  error: {
    icon: <ToastIcons.Error />,
    colors: {
      bg: "bg-red-800/90",
      border: "border-red-600/50",
      icon: "text-red-400",
      iconBg: "bg-red-400/20",
      progress: "bg-red-400",
    },
  },
  warning: {
    icon: <ToastIcons.Warning />,
    colors: {
      bg: "bg-orange-800/90",
      border: "border-orange-600/50",
      icon: "text-orange-400",
      iconBg: "bg-orange-400/20",
      progress: "bg-orange-400",
    },
  },
  info: {
    icon: <ToastIcons.Info />,
    colors: {
      bg: "bg-blue-800/90",
      border: "border-blue-600/50",
      icon: "text-blue-400",
      iconBg: "bg-blue-400/20",
      progress: "bg-blue-400",
    },
  },
};
