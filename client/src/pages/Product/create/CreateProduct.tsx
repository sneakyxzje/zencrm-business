import React from "react";
import { useCreateProduct } from "@features/warehouse/create-product/model/useCreateProduct";
import { Header } from "@pages/Product/components/Header";
import { ProductInfoSection } from "@pages/Product/components/ProductInfoSection";
import { UnitSection } from "@pages/Product/components/UnitSection";
import { ComboSection } from "@pages/Product/components/ComboSection";
import { SubmitButton } from "@pages/Product/components/SubmitButton";

const CreateProduct: React.FC = () => {
  const {
    register,
    errors,
    submit,
    isSubmitting,
    categories,
    gifts,
    showComboForm,
    setShowComboForm,
    isInitLoading,
    initError,
  } = useCreateProduct();
  console.log(categories);
  if (isInitLoading)
    return (
      <div className="min-h-screen bg-[#232629] flex items-center justify-center text-[#90999a]">
        Loading data...
      </div>
    );
  if (initError)
    return (
      <div className="min-h-screen bg-[#232629] flex items-center justify-center text-red-400">
        {initError}
      </div>
    );

  return (
    <div className="min-h-screen bg-[#232629] flex text-[#dcdcdc]">
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <Header />

        <div className="p-6">
          <form onSubmit={submit} className="space-y-6">
            <ProductInfoSection
              register={register}
              errors={errors}
              categories={categories}
            />

            <UnitSection register={register} />

            <ComboSection
              register={register}
              errors={errors}
              showComboForm={showComboForm}
              setShowComboForm={setShowComboForm}
              gifts={gifts}
            />

            <div className="flex justify-end pt-4">
              <SubmitButton isSubmitting={isSubmitting} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
