import type { ComboFormState } from "@entities/product/model/type";
import type { GiftDTO } from "@shared/types";
import type React from "react";

interface ComboFormProps {
  comboData: ComboFormState;
  gifts: GiftDTO[];
  onComboChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  inputClassName: string;
  labelClassName: string;
  comboSectionClassName: string;
}

export const ComboForm: React.FC<ComboFormProps> = ({
  comboData,
  gifts,
  onComboChange,
  inputClassName,
  labelClassName,
  comboSectionClassName,
}) => {
  return (
    <div className={comboSectionClassName}>
      <label htmlFor="offerName" className={labelClassName}>
        Tên ưu đãi:
      </label>
      <input
        type="text"
        id="offerName"
        name="offerName"
        className={inputClassName}
        value={comboData.offerName}
        onChange={onComboChange}
        placeholder="ví dụ: Mua 2 tặng 1"
      />
      <label htmlFor="giftItemId" className={labelClassName}>
        Quà tặng:
      </label>
      <select
        id="giftItemId"
        name="giftItemId"
        className={inputClassName}
        value={comboData.giftItemId}
        onChange={onComboChange}
      >
        <option value="">-- Chọn quà tặng --</option>
        {gifts.map((g) => (
          <option value={g.id} key={g.id}>
            {g.giftName}
          </option>
        ))}
      </select>
      <label htmlFor="giftQuantity" className={labelClassName}>
        SL quà tặng:
      </label>
      <input
        type="number"
        id="giftQuantity"
        name="giftQuantity"
        value={comboData.giftQuantity}
        onChange={onComboChange}
        className={inputClassName}
      />
      <label htmlFor="startDate" className={labelClassName}>
        Ngày BĐ:
      </label>
      <input
        type="date"
        id="startDate"
        name="startDate"
        className={inputClassName}
        value={comboData.startDate}
        onChange={onComboChange}
      />
      <label htmlFor="endDate" className={labelClassName}>
        Ngày KT:
      </label>
      <input
        type="date"
        id="endDate"
        name="endDate"
        className={inputClassName}
        value={comboData.endDate}
        onChange={onComboChange}
      />
      <label htmlFor="isMandatory" className={labelClassName}>
        Bắt buộc:
      </label>
      <input
        type="checkbox"
        id="isMandatory"
        name="isMandatory"
        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 justify-self-start mt-3"
        checked={comboData.isMandatory}
        onChange={onComboChange}
      />
    </div>
  );
};
