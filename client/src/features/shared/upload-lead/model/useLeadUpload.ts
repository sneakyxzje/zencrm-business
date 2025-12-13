import { useEffect, useState } from "react";
import { uploadLead } from "@entities/lead/api";
import type { LeadUploadRequest } from "@entities/lead/model/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@app/provider/ToastContext";

export function useLeadUpload(defaults?: {
  teamName?: string | null;
  defaultProductId?: number | null;
  defaultAssigneeId?: number | null;
}) {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [productId, setProductId] = useState<number>(
    defaults?.defaultProductId || 0
  );
  const [assignee, setAssignee] = useState<number | null>(
    defaults?.defaultAssigneeId ?? null
  );
  const [validationError, setValidationError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const [address, setAddress] = useState("");
  const { addToast } = useToast();
  const mutation = useMutation({
    mutationFn: (data: LeadUploadRequest) => uploadLead(data),
    onSuccess: () => {
      addToast({
        type: "success",
        title: "Successful",
        message: "Tạo lead thành công",
        persistent: false,
        duration: 4000,
      });
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
    onError: (err: any) => {
      const message = err?.response?.data?.message || "Đã có lỗi xảy ra";
      addToast({
        type: "success",
        title: "Successful",
        message: message,
        persistent: false,
        duration: 4000,
      });
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    const cleanPhone = phoneNumber.replace(/\D/g, "");
    if (!cleanPhone) {
      setValidationError("Không được để trống số điện thoại");
      return;
    }
    const vnPhoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    if (!vnPhoneRegex.test(cleanPhone)) {
      setValidationError("Số điện thoại không đúng định dạng");
      return;
    }
    if (!customerName.trim()) {
      setValidationError("Không được để trống tên khách hàng");
      return;
    }
    if (!phoneNumber.trim()) {
      setValidationError("Không được để trống số điện thoại");
      return;
    }
    mutation.mutate({
      customerName,
      phoneNumber: cleanPhone,
      productId,
      assignee,
      address: address || null,
    });
  };

  return {
    formState: {
      customerName,
      phoneNumber,
      productId,
      assignee,
      address,
    },
    setters: {
      setCustomerName,
      setPhoneNumber,
      setProductId,
      setAssignee,
      setAddress,
    },
    teamName: defaults?.teamName ?? "",

    loading: mutation.isPending,
    error:
      validationError ||
      (mutation.error ? (mutation.error as any).message : null),
    submit,
  };
}
