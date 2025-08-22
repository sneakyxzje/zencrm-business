import { ToastContext } from "@app/provider/ToastContext";
import { nanoid } from "@reduxjs/toolkit";
import type { Toast } from "@shared/ui/toasts/model/types";
import { ToastContainer } from "@shared/ui/toasts/ToastContainer";
import type React from "react";
import { useState } from "react";

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toastDetails: Omit<Toast, "id" | "progress">) => {
    const newToast = { id: nanoid(), progress: 100, ...toastDetails };
    setToasts((prev) => [...prev, newToast]);

    if (!toastDetails.persistent) {
      setTimeout(() => {
        setToasts((current) => current.filter((t) => t.id !== newToast.id));
      }, toastDetails.duration | 4000);
    }
  };
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const value = { addToast, removeToast };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toast={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};
