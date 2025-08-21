import { findLead } from "@entities/lead/api";
import { type LeadItem } from "@entities/lead/model/types";
import { useState } from "react";

export const useFindLead = (phoneNumber: string) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<LeadItem[]>([]);
  async function submit(): Promise<boolean> {
    setError(null);
    setLoading(true);
    try {
      const payload = { phoneNumber: phoneNumber };
      const res = await findLead(payload);
      setResult(res.content);
      return true;
    } catch (e: any) {
      if (e?.response.status === 403) {
        setError("Không có");
      } else {
        setError(e?.message ?? "Tìm kiếm thất bại");
      }
      return false;
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setResult([]);
    setError(null);
    setLoading(false);
  }
  return {
    phoneNumber,
    error,
    loading,
    submit,
    result,
    reset,
  };
};
