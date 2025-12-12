import type {
  ComboFormState,
  CreateProductRequest,
  FormProductState,
} from "@entities/product/model/type";
import { useProductFormInit } from "@features/warehouse/create-product/model/useProductFormInit";
import { CategorySelect } from "@features/warehouse/create-product/ui/CategorySelect";
import { ComboForm } from "@features/warehouse/create-product/ui/ComboForm";
import { api } from "@shared/api/axios";
import React, { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const CreateProduct: React.FC = () => {
  const { categories, gifts, isLoading, error } = useProductFormInit();
  const [showComboForm, setShowComboForm] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormProductState>({
    productName: "",
    amount: 0,
    price: "0",
    categoryId: new Set(),
    baseUnitName: "",
    packageUnitName: "",
    itemsPerPackage: 0,
    imageUrl: "",
  });

  const [comboData, setComboData] = useState<ComboFormState>({
    offerName: "",
    requiredQuantity: 1,
    giftItemId: "",
    giftQuantity: 1,
    isMandatory: false,
    startDate: "",
    endDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;
    let finalValue: string | number | boolean;

    if (type === "checkbox") {
      finalValue = (e.target as HTMLInputElement).checked;
    } else if (type === "number") {
      if (name === "price") {
        finalValue = value;
      } else {
        finalValue = value === "" ? 0 : parseInt(value, 10);
        if (isNaN(finalValue)) finalValue = 0;
      }
    } else {
      finalValue = value;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const handleComboChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;
    let finalValue: string | number | boolean;

    if (type === "checkbox") {
      finalValue = (e.target as HTMLInputElement).checked;
    } else if (type === "number" || name === "giftItemId") {
      finalValue = value === "" ? "" : parseInt(value, 10);
      if (type === "number" && isNaN(finalValue as number)) finalValue = 0;
    } else {
      finalValue = value;
    }

    setComboData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = e.target.selectedOptions;
    const selectedIds = Array.from(selectedOptions, (option) =>
      parseInt(option.value, 10)
    );
    setFormData((prev) => ({
      ...prev,
      categoryId: new Set(selectedIds),
    }));
  };

  const handleShowComboToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowComboForm(e.target.checked);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    let combosSend: ComboFormState[] = [];
    if (showComboForm) {
      if (!comboData.giftItemId) {
        alert("Please select a gift for the combo.");
        setIsSubmitting(false);
        return;
      }
      combosSend = [comboData];
    }

    const data: CreateProductRequest = {
      ...formData,

      categoryId: Array.from(formData.categoryId),
      combos: combosSend,
    };

    try {
      const res = await api.post("/api/products", data);
      alert("Create product success!");
      console.log("Success response:", res.data);
      return res.data;
    } catch (error) {
      console.error("Error creating product: ", error);
      alert("Create product failed. See console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName =
    "block w-full bg-[#2d2d2d] border border-[#4d4d4d] rounded-lg shadow-sm px-4 py-2 text-[#dcdcdc] focus:outline-none focus:ring-1 focus:ring-[#f48024] focus:border-[#f48024] placeholder:text-[#6a6a6a] text-sm disabled:opacity-50"; // Thêm disabled style
  const labelClassName = "block text-sm font-medium text-[#a0a9aa] mb-1";
  const sectionCardClassName =
    "bg-[#3b3f41]/60 backdrop-blur-sm border border-[#4d4d4d] rounded-xl shadow-md p-6";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#232629] flex text-[#dcdcdc]">
        <div className="flex-1 flex items-center justify-center text-[#90999a]">
          Loading form data...
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen bg-[#232629] flex text-[#dcdcdc]">
        <div className="flex-1 flex items-center justify-center text-red-400">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#232629] flex text-[#dcdcdc]">
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="sticky top-0 z-10 bg-[#3b3f41]/80 backdrop-blur-md border-b border-[#4d4d4d] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate(-1)}
              className="text-[#b0b9ba] hover:text-[#f48024] p-1.5 rounded-full hover:bg-[#2d2d2d]/50 transition-colors" // Tăng padding
              title="Go Back"
            ></button>
            <div>
              <h1 className="text-xl font-semibold text-[#e1e1e1]">
                Add New Product
              </h1>
              <p className="text-xs text-[#a0a9aa]">
                Enter product details, stock, pricing, and optional combos.
              </p>
            </div>
          </div>
          <button
            type="submit"
            form="product-form"
            className={`bg-[#f48024] cursor-pointer hover:bg-[#e06a00] text-white px-5 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105 flex items-center shadow-md hover:shadow-lg ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <p></p>
            )}
            {isSubmitting ? "Saving..." : "Save Product"}
          </button>
        </div>

        <div className="p-6">
          <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
            <div className={sectionCardClassName}>
              <h2 className="text-lg font-semibold text-[#e1e1e1] border-b border-[#4d4d4d]/50 pb-3 mb-4">
                Product Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label htmlFor="productName" className={labelClassName}>
                    Product Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    className={inputClassName}
                    value={formData.productName}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="categoryId" className={labelClassName}>
                    Categories
                  </label>
                  <CategorySelect
                    categories={categories}
                    value={Array.from(formData.categoryId).map(String)}
                    onChange={handleCategoryChange}
                    className={`${inputClassName} h-24 bg-[#2d2d2d]`}
                  />
                </div>
                <div>
                  <label htmlFor="amount" className={labelClassName}>
                    Initial Stock Quantity
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className={inputClassName}
                    min="0"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="price" className={labelClassName}>
                    Price (VND)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    step="100"
                    value={formData.price}
                    onChange={handleChange}
                    className={inputClassName}
                    min="0"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            <div className={sectionCardClassName}>
              <h2 className="text-lg font-semibold text-[#e1e1e1] border-b border-[#4d4d4d]/50 pb-3 mb-4">
                Units & Packaging
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
                <div>
                  <label htmlFor="baseUnitName" className={labelClassName}>
                    Base Unit
                  </label>
                  <input
                    type="text"
                    id="baseUnitName"
                    name="baseUnitName"
                    placeholder="e.g., Can, Bottle, Pack"
                    value={formData.baseUnitName}
                    onChange={handleChange}
                    className={inputClassName}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="packageUnitName" className={labelClassName}>
                    Package Unit
                  </label>
                  <input
                    type="text"
                    id="packageUnitName"
                    name="packageUnitName"
                    value={formData.packageUnitName}
                    onChange={handleChange}
                    placeholder="e.g., Box, Crate, Carton"
                    className={inputClassName}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="itemsPerPackage" className={labelClassName}>
                    Items / Package
                  </label>
                  <input
                    type="number"
                    id="itemsPerPackage"
                    name="itemsPerPackage"
                    placeholder="e.g., 24"
                    value={formData.itemsPerPackage}
                    onChange={handleChange}
                    className={inputClassName}
                    min="1"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            <div className={sectionCardClassName}>
              <h2 className="text-lg font-semibold text-[#e1e1e1] border-b border-[#4d4d4d]/50 pb-3 mb-4">
                Product Image
              </h2>
              <div>
                <label htmlFor="imageUrl" className={labelClassName}>
                  Image URL
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  placeholder="https://..."
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className={inputClassName}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className={sectionCardClassName}>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#4d4d4d]/50">
                <h2 className="text-lg font-semibold text-[#e1e1e1]">
                  Promotional Combo (Optional)
                </h2>
                <label
                  htmlFor="showCombo"
                  className={`flex items-center ${
                    isSubmitting
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  }`}
                >
                  {" "}
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="showCombo"
                      className="sr-only"
                      checked={showComboForm}
                      onChange={handleShowComboToggle}
                      disabled={isSubmitting}
                    />
                    <div
                      className={`block w-10 h-6 rounded-full transition ${
                        showComboForm ? "bg-[#f48024]" : "bg-[#4d4d4d]"
                      }`}
                    ></div>
                    <div
                      className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${
                        showComboForm ? "translate-x-4" : ""
                      }`}
                    ></div>
                  </div>
                  <span className="ml-3 text-sm font-medium text-[#b0b9ba]">
                    {showComboForm ? "Enabled" : "Disabled"}
                  </span>
                </label>
              </div>

              {showComboForm && (
                <fieldset disabled={isSubmitting}>
                  {" "}
                  <ComboForm
                    comboData={comboData}
                    gifts={gifts}
                    onComboChange={handleComboChange}
                    inputClassName={
                      inputClassName + " bg-[#232629] disabled:opacity-50"
                    }
                    labelClassName={labelClassName + " mb-1"}
                    comboSectionClassName="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
                  />
                </fieldset>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className={`bg-[#f48024] cursor-pointer hover:bg-[#e06a00] text-white px-5 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105 flex items-center shadow-md hover:shadow-lg ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" /*...*/
                  ></svg>
                ) : (
                  <p></p>
                )}
                {isSubmitting ? "Saving..." : "Save Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
