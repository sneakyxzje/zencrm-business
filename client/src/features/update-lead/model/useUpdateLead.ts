import { useToast } from "@app/provider/ToastContext";
import { updateLead } from "@entities/lead/api";
import { useState } from "react";
export function useUpdateLead() {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  async function submit(payload: {
    leadId: number;
    note: string;
    status: string | null;
  }) {
    const { leadId, note, status } = payload;
    if (!note.trim()) {
      addToast({
        type: "error",
        title: "Error",
        message: "Note không được để trống",
        persistent: false,
        duration: 4000,
      });
      return false;
    }

    setLoading(true);
    try {
      await updateLead({ leadId, note: note.trim(), status });
      return true;
    } catch (e: any) {
      addToast({
        type: "error",
        title: "Error",
        message: "Upload thất bại, có lỗi từ server!",
        persistent: false,
        duration: 4000,
      });
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { submit, loading };
}
