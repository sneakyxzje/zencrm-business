import { motion } from "framer-motion";
import { useLeadUpload } from "../model/useLeadUpload";
import type { AssignableSales } from "@entities/user/model/types";
import type { GetAllProduct } from "@entities/product/model/type";
import { AutocompleteInput } from "@shared/ui/AutoCompleteInput";

type Props = {
  currentUserName?: string | null;
  currentTeamName?: string | null;
  currentSaleName?: string | null;
  currentSaleInfo: AssignableSales[] | null;
  currentProductInfo: GetAllProduct[] | null;
  defaultProductId?: number | null;
  defaultAssigneeId?: number | null;
};

export default function LeadUploadForm({
  currentUserName,
  currentTeamName,
  currentSaleInfo,
  currentProductInfo,
  defaultProductId,
}: Props) {
  const { setters, formState, teamName, loading, error, submit } =
    useLeadUpload({
      teamName: currentTeamName ?? "",
      defaultProductId: defaultProductId,
      defaultAssigneeId: null,
    });
  const selectedAssignee =
    currentSaleInfo?.find((s) => s.id === formState.assignee) || null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-[#3b3f41]/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-[#4d4d4d]">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#f48024]/80 to-[#f48024] rounded-2xl shadow-lg mb-4">
            <svg
              className="w-8 h-8 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M3 5a2 2 0 012-2h3.28c.43 0 .81.27.95.68l1.5 4.49c.16.48-.05 1.01-.5 1.21l-2.26 1.13a11.04 11.04 0 005.52 5.52l1.13-2.26c.2-.45.73-.66 1.21-.5l4.49 1.5c.41.13.68.52.68.95V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#dcdcdc] mb-2">
            Thông Tin Khách Hàng
          </h2>
          <p className="text-[#90999a] text-sm">
            Nhập thông tin chi tiết để up số điện thoại
          </p>
        </div>

        <form onSubmit={submit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#dcdcdc] mb-2">
                Người lên số
              </label>
              <input
                disabled
                value={currentUserName ?? ""}
                className="w-full px-4 py-3 bg-[#2d2d2d] border border-[#4d4d4d] text-white rounded-xl color-white placeholder-[#dcdcdc] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#dcdcdc] mb-2">
                Thuộc team
              </label>
              <input
                disabled
                value={teamName || currentTeamName || ""}
                placeholder="Team"
                className="w-full px-4 py-3 bg-[#2d2d2d] border border-[#4d4d4d] rounded-xl text-[#dcdcdc] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#dcdcdc] mb-2">
                Tên khách hàng
              </label>
              <input
                type="text"
                value={formState.customerName}
                onChange={(e) => setters.setCustomerName(e.target.value)}
                className="w-full px-4 py-3 bg-[#2d2d2d] border border-[#4d4d4d] rounded-xl text-[#dcdcdc] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#dcdcdc] mb-2">
                Số điện thoại *
              </label>
              <input
                type="tel"
                value={formState.phoneNumber}
                onChange={(e) => setters.setPhoneNumber(e.target.value)}
                placeholder="+84 901 234 567"
                className="w-full px-4 py-3 bg-[#2d2d2d] border border-[#4d4d4d] rounded-xl text-[#dcdcdc] placeholder-[#90999a] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#dcdcdc] mb-2">
              Sản phẩm *
            </label>
            <select
              value={formState.productId ?? ""}
              onChange={(e) =>
                setters.setProductId(
                  e.target.value ? parseInt(e.target.value, 10) : 0
                )
              }
              className="w-full px-4 py-3 bg-[#2d2d2d] border border-[#4d4d4d] rounded-xl text-[#dcdcdc] focus:outline-none"
            >
              {currentProductInfo?.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.productName}_{p.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div>
              <label className="block text-sm font-medium text-[#dcdcdc] mb-2">
                Sale
              </label>
              <AutocompleteInput
                placeholder="Nhập tên Sale hoặc tên Team..."
                items={currentSaleInfo || []}
                selectedItem={selectedAssignee}
                onSelect={(sale) => setters.setAssignee(sale?.id || null)}
                displayValue={(sale) => `${sale.fullname} - ${sale.teamName}`}
                filterFn={(sale, query) => {
                  const textToCheck =
                    `${sale.fullname} ${sale.teamName}`.toLowerCase();
                  return textToCheck.includes(query.toLowerCase());
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#dcdcdc] mb-2">
              Địa chỉ
            </label>
            <textarea
              value={formState.address}
              onChange={(e) => setters.setAddress(e.target.value)}
              placeholder="Số 123, Phố ABC, Quận XYZ, TP..."
              rows={3}
              className="w-full px-4 py-3 bg-[#2d2d2d] border border-[#4d4d4d] rounded-xl text-[#dcdcdc] placeholder-[#90999a] focus:outline-none resize-none"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={() => {
                setters.setCustomerName("");
                setters.setPhoneNumber("");
                setters.setAddress("");
              }}
              className="flex-1 py-3 rounded-xl font-semibold text-[#dcdcdc] bg-[#2d2d2d] border border-[#4d4d4d] hover:bg-[#3b3f41] transition"
            >
              Reset
            </button>

            <motion.button
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="flex-1 py-3 rounded-xl cursor-pointer font-semibold text-white bg-[#f48024] hover:bg-[#e06a00] transition shadow-lg disabled:opacity-60"
            >
              {loading ? "Đang up..." : "Upload"}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}
