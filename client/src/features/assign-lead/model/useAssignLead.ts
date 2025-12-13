import { useToast } from "@app/provider/ToastContext";
import { assignLead } from "@entities/lead/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type AssignLeadParams = {
  leadId: number;
  saleId: number;
};
export const useAssignLead = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const mutation = useMutation({
    mutationFn: (params: AssignLeadParams) => assignLead(params),
    onSuccess: () => {
      addToast({
        type: "success",
        title: "Successful",
        message: "Lead đã được gán thành công",
        persistent: false,
        duration: 4000,
      });
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
    onError: (err: any) => {
      const message = err?.response?.data?.message || "Đã có lỗi xảy ra";
      addToast({
        type: "error",
        title: "Lỗi",
        message: message,
        persistent: false,
        duration: 4000,
      });
    },
  });
  return mutation;
};
