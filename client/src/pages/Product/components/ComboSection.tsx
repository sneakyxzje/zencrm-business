import {
  cardClass,
  inputClass,
  labelClass,
} from "@pages/Product/components/utils";

export const ComboSection = ({
  register,
  showComboForm,
  setShowComboForm,
  gifts,
}: any) => (
  <div className={cardClass}>
    <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#4d4d4d]/50">
      <h2 className="text-lg font-semibold text-[#e1e1e1]">
        Promotional Combo
      </h2>
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only"
          checked={showComboForm}
          onChange={(e) => setShowComboForm(e.target.checked)}
        />
        <div
          className={`w-10 h-6 rounded-full transition ${
            showComboForm ? "bg-[#f48024]" : "bg-[#4d4d4d]"
          }`}
        ></div>
        <div
          className={`dot absolute w-4 h-4 bg-white rounded-full transition transform ${
            showComboForm ? "translate-x-6" : "translate-x-1"
          }`}
          style={{ marginTop: 4 }}
        ></div>
        <span className="ml-3 text-sm text-[#b0b9ba]">
          {showComboForm ? "Enabled" : "Disabled"}
        </span>
      </label>
    </div>

    {showComboForm && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 animate-fade-in-down">
        <div>
          <label className={labelClass}>Offer Name</label>
          <input {...register("combo.offerName")} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>
            Select Gift <span className="text-red-400">*</span>
          </label>
          <select {...register("combo.giftItemId")} className={inputClass}>
            <option value="">-- Choose Gift --</option>
            {gifts.map((g: any) => (
              <option key={g.id} value={g.id}>
                {g.giftName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Required Quantity (Buy)</label>
          <input
            type="number"
            {...register("combo.requiredQuantity", { valueAsNumber: true })}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Gift Quantity (Get)</label>
          <input
            type="number"
            {...register("combo.giftQuantity", { valueAsNumber: true })}
            className={inputClass}
          />
        </div>
      </div>
    )}
  </div>
);
