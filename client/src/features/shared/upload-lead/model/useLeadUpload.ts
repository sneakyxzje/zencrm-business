import { useEffect, useState } from "react";
import { uploadLead } from "@entities/lead/api";
import type { LeadUploadRequest } from "@entities/lead/model/types";

export function useLeadUpload(defaults?: {
  teamName?: string | null;
  defaultProductId?: number | null;
  defaultAssigneeId?: number | null;
}) {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [productId, setProductId] = useState<number | null>(
    defaults?.defaultProductId ?? null
  );
  const [assignee, setAssignee] = useState<number | null>(
    defaults?.defaultAssigneeId ?? null
  );
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (productId === null && defaults?.defaultProductId) {
      setProductId(defaults.defaultProductId);
    }
    if (assignee === null && defaults?.defaultAssigneeId) {
      setAssignee(defaults.defaultAssigneeId);
    }
  }, [defaults?.defaultProductId, defaults?.defaultAssigneeId]);
  async function submit(): Promise<boolean> {
    setError(null);

    if (!phoneNumber.trim()) {
      setError("Vui lòng nhập số điện thoại");
      return false;
    }
    if (productId === null) {
      setError("Vui lòng chọn sản phẩm");
      return false;
    }

    setLoading(true);
    try {
      const payload: LeadUploadRequest = {
        customerName: customerName,
        phoneNumber: phoneNumber,
        productId: productId,
        assignee: assignee,
        address: address || null,
      };
      await uploadLead(payload);
      setCustomerName("");
      setPhoneNumber("");
      setProductId(null);
      setAssignee(null);
      setAddress("");
      return true;
    } catch (e: any) {
      setError(e?.message ?? "Upload thất bại");
      return false;
    } finally {
      setLoading(false);
    }
  }

  return {
    customerName,
    setCustomerName,
    phoneNumber,
    setPhoneNumber,
    productId,
    setProductId,
    assignee,
    setAssignee,
    address,
    setAddress,
    loading,
    error,
    submit,
    teamName: defaults?.teamName ?? "",
  };
}
