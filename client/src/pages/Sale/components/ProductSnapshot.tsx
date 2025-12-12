import type { ProductInLead } from "@entities/lead/model/types";

type ProductSnapshotProps = {
  product: ProductInLead | null | undefined;
  totalPrice: number;
  displayUnit: string | undefined;
};

export const ProductSnapshot = ({
  product,
  totalPrice,
  displayUnit,
}: ProductSnapshotProps) => {
  if (!product) return null;

  return (
    <div className="mt-6 pt-6 border-t border-[#3f4245]">
      <h3 className="text-sm font-medium text-[#a7b0b1] mb-4">Snapshot</h3>

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <span className="text-[#90999a]">Giá:</span>
          <span className="text-[#dcdcdc] font-medium">
            {totalPrice.toLocaleString()} đ
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <span className="text-[#90999a]">Số lượng:</span>
          <span className="text-[#dcdcdc] font-medium">{displayUnit}</span>
        </div>

        {product.combos && product.combos.length > 0 && (
          <div>
            <span className="text-[#90999a] text-sm block mb-2">
              Khuyến mãi hiện có:
            </span>
            <div className="flex flex-wrap gap-2">
              {product.combos.map((c) => (
                <span
                  key={c.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#252728] border border-[#3f4245] rounded-lg text-sm text-[#dcdcdc]"
                >
                  <svg
                    className="w-4 h-4 text-[#f48024]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {c.offerName}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
