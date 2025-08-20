import { useState } from "react";
import { uploadLead } from "@entities/lead/api";
import type { LeadUploadRequest } from "@entities/lead/model/types";

export function useLeadUpload(defaults?: {
  customerName?: string | null;
  teamName?: string | null;
  assignee?: string | null;
}) {
  const [customerName, setCustomerName] = useState(
    defaults?.customerName ?? ""
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  const [productName, setProductName] = useState("");
  const [assignee, setAssignee] = useState(defaults?.assignee ?? "");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(): Promise<boolean> {
    setError(null);

    if (!phoneNumber.trim()) {
      setError("Vui lòng nhập số điện thoại");
      return false;
    }
    if (!productName.trim()) {
      setError("Vui lòng nhập sản phẩm");
      return false;
    }

    setLoading(true);
    try {
      const payload: LeadUploadRequest = {
        customerName: customerName,
        phoneNumber: phoneNumber,
        productName: productName,
        assignee: assignee || null,
        address: address || null,
      };
      await uploadLead(payload);
      setCustomerName("");
      setPhoneNumber("");
      setProductName("");
      setAssignee("");
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
    productName,
    setProductName,
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
