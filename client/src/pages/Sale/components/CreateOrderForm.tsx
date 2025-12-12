import { FormActions } from "@pages/Sale/components/FormAction";
import { FormSection } from "@pages/Sale/components/FormSection";
import { ProductSnapshot } from "@pages/Sale/components/ProductSnapshot";
import { InputField } from "@shared/ui/InputField";
import { TextAreaField } from "@shared/ui/TextAreaField";

type CreateOrderFormProps = {
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
  onCancel: () => void;
  formState: {
    address: string;
    orderValue: number;
    secondaryPhone: string;
    note: string;
  };
  setFormState: any;
  computed: {
    totalPrice: number;
    displayUnit: string | undefined;
  };
  product: any;
};

export const CreateOrderForm = ({
  onSubmit,
  isPending,
  onCancel,
  formState,
  setFormState,
  computed,
  product,
}: CreateOrderFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <FormSection title="Thông tin Đơn hàng" delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <InputField
            label="Địa chỉ giao hàng"
            value={formState.address}
            onChange={(v) => setFormState.setAddress(v)}
            placeholder="Nhập địa chỉ..."
          />
          <InputField
            label="Số lượng"
            type="number"
            value={formState.orderValue}
            onChange={(v) => setFormState.setOrderValue(Number(v))}
            placeholder="Nhập số lượng..."
          />
          <InputField
            label="SĐT Phụ"
            value={formState.secondaryPhone}
            onChange={(v) => setFormState.setSecondaryPhone(v)}
            placeholder="SĐT khác (nếu có)"
          />
        </div>

        <TextAreaField
          label="Ghi chú"
          value={formState.note}
          onChange={(v) => setFormState.setNote(v)}
          placeholder="Ghi chú đơn hàng..."
        />

        <ProductSnapshot
          product={product}
          totalPrice={computed.totalPrice}
          displayUnit={computed.displayUnit}
        />
      </FormSection>
      <FormActions onCancel={onCancel} isPending={isPending} />
    </form>
  );
};
