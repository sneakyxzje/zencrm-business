import {
  cardClass,
  inputClass,
  labelClass,
} from "@pages/Product/components/utils";

export const ProductInfoSection = ({ register, errors, categories }: any) => (
  <div className={cardClass}>
    <h2 className="text-lg font-semibold text-[#e1e1e1] border-b border-[#4d4d4d]/50 pb-3 mb-4">
      Product Information
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      <div>
        <label className={labelClass}>
          Product Name <span className="text-red-400">*</span>
        </label>
        <input
          {...register("productName", { required: "Không được để trống" })}
          className={inputClass}
        />
        {errors.productName && (
          <span className="text-red-400 text-xs">
            {errors.productName.message}
          </span>
        )}
      </div>

      <div>
        <label className={labelClass}>Categories</label>
        <select
          multiple
          {...register("categoryId")}
          className={`${inputClass} h-24`}
        >
          {categories.map((c: any) => (
            <option key={c.id} value={c.id}>
              {c.categoryName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Stock Quantity</label>
        <input
          type="number"
          {...register("amount", { valueAsNumber: true })}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Price (VND)</label>
        <input
          type="number"
          {...register("price", { valueAsNumber: true })}
          className={inputClass}
          step="1000"
        />
      </div>
    </div>
  </div>
);
