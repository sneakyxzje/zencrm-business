import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { api } from "@shared/api/axios";
import { getAllCategories } from "@entities/categories/api";
import { getAllGift } from "@entities/gifts/api";

type CreateProductFormValues = {
  productName: string;
  amount: number;
  price: number;
  categoryId: string[];
  baseUnitName: string;
  packageUnitName: string;
  itemsPerPackage: number;
  imageUrl: string;
  combo: {
    offerName: string;
    requiredQuantity: number;
    giftItemId: string;
    giftQuantity: number;
    isMandatory: boolean;
    startDate: string;
    endDate: string;
  };
};

export const useCreateProduct = () => {
  const [showComboForm, setShowComboForm] = useState(false);

  const staticDataConfig = {
    staleTime: 1000 * 60 * 5, // 5 phút
    retry: 1,
    refetchOnWindowFocus: false,
  };

  const categoriesQuery = useQuery({
    queryKey: ["categories", "list"],
    queryFn: getAllCategories,
    ...staticDataConfig,
  });

  const giftsQuery = useQuery({
    queryKey: ["gifts", "list"],
    queryFn: getAllGift,
    ...staticDataConfig,
  });

  const isInitLoading = categoriesQuery.isLoading || giftsQuery.isLoading;
  const initError =
    categoriesQuery.error || giftsQuery.error
      ? "Không tải được danh mục hoặc quà tặng"
      : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductFormValues>({
    defaultValues: {
      amount: 0,
      price: 0,
      itemsPerPackage: 0,
      categoryId: [],
      combo: {
        requiredQuantity: 1,
        giftQuantity: 1,
        isMandatory: false,
      },
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: CreateProductFormValues) => {
      const combosSend = showComboForm
        ? [
            {
              ...data.combo,
              giftItemId: Number(data.combo.giftItemId),
            },
          ]
        : [];

      const payload = {
        ...data,
        categoryId: data.categoryId.map(Number),
        combos: combosSend,
      };

      delete (payload as any).combo;

      return api.post("/api/products", payload);
    },
    onSuccess: (res) => {
      alert("Tạo sản phẩm thành công!");
      console.log(res.data);
    },
    onError: (err: any) => {
      console.error(err);
      const msg = err?.response?.data?.message || "Lỗi không xác định";
      alert("Thất bại: " + msg);
    },
  });

  const onSubmit = (data: CreateProductFormValues) => {
    if (showComboForm && !data.combo.giftItemId) {
      alert("Vui lòng chọn quà tặng cho combo!");
      return;
    }
    mutation.mutate(data);
  };

  return {
    categories: categoriesQuery.data?.data?.content ?? [],
    gifts: giftsQuery.data?.data?.content ?? [],

    isInitLoading,
    initError,

    register,
    errors,
    submit: handleSubmit(onSubmit),

    showComboForm,
    setShowComboForm,

    isSubmitting: mutation.isPending,
  };
};
