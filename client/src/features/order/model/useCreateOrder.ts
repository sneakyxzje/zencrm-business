import { useToast } from "@app/provider/ToastContext";
import type { LeadDetails } from "@entities/lead/model/types";
import { createOrders } from "@entities/order/api";
import { mapUnitName } from "@shared/lib/MapUnitName";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useCreateOrder = (lead: LeadDetails | undefined) => {
  const { addToast } = useToast();
  const [address, setAddress] = useState(lead?.address || "");
  const [orderValue, setOrderValue] = useState<number>(0);
  const [secondaryPhone, setSecondaryPhone] = useState("");
  const [note, setNote] = useState("");
  const price = Number(lead?.product?.price || 0);
  const totalPrice = price * orderValue;
  const displayUnit = mapUnitName(orderValue.toString(), lead?.product);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createOrders,
    onSuccess: () => {
      addToast({
        type: "success",
        title: "Successful",
        message: "Đã tạo đơn hàng thành công",
        persistent: false,
        duration: 4000,
      });
      navigate("/create-orders");
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
    onError: (error) => {
      addToast({
        type: "error",
        title: "Lỗi",
        message: "Đã có lỗi xảy ra",
        persistent: false,
        duration: 4000,
      });
      console.error(error);
      navigate("/create-orders");
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead) return;

    mutation.mutate({
      leadId: lead.id,
      address,
      phoneNumber: secondaryPhone,
      priceAtOrder: totalPrice,
    });
  };
  const goBack = () => navigate(-1);
  return {
    formState: { address, orderValue, secondaryPhone, note },

    setters: { setAddress, setOrderValue, setSecondaryPhone, setNote },

    computed: { totalPrice, displayUnit },

    actions: { handleSubmit, goBack },

    isPending: mutation.isPending,
  };
};
