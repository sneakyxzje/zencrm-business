import { updateLead } from "@entities/lead/api";
import { useState } from "react";
export function useUpdateLead() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(payload: {
    leadId: number;
    note: string;
    status: string;
  }) {
    const { leadId, note, status } = payload;
    if (!note.trim()) {
      setError("Note không được để trống");
      return false;
    }

    setError(null);
    setLoading(true);
    try {
      await updateLead({ leadId, note: note.trim(), status });
      return true;
    } catch (e: any) {
      setError(e?.message ?? "Update thất bại");
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { submit, loading, error };
}
