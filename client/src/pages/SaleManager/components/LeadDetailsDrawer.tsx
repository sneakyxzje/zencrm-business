import type { Lead } from "@entities/lead/model/types";
import { time } from "@shared/lib/time";
import StatusBadge from "@shared/ui/StatusBadge";
import React, { useRef, useState } from "react";
import type { AssignableSales } from "@entities/user/model/types";
import { useAssignLead } from "@features/assign-lead/model/useAssignLead";
import { AutocompleteInput } from "@shared/ui/AutoCompleteInput";

export default function LeadDetailsDrawer({
  open,
  lead,
  onClose,
  sales,
}: {
  open: boolean;
  lead: Lead | null;
  sales: AssignableSales[];
  onClose: () => void;
  onAssigned?: () => void;
}) {
  const [saleId, setSaleId] = useState<number | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const selectedAssignee = sales?.find((s) => s.id === saleId) || null;
  const { mutate, isPending } = useAssignLead();
  if (!open || !lead) return null;
  const isValid = saleId !== null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      leadId: lead.id,
      saleId: saleId as number,
    });
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <aside className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#2a2d32] border-l border-[#3f4245] shadow-xl z-50 flex flex-col">
        <div className="p-6 border-b border-[#3f4245] flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#e8eaed]">
            Thông tin Khách hàng
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#9aa0a6] hover:text-white hover:bg-[#3f4245]/40"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <form className="p-6 flex-1 overflow-y-auto" onSubmit={handleSubmit}>
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white">
              {lead.customerName || "Chưa có tên"}
            </h3>
            <p className="text-[#9aa0a6] text-sm">Lead #{lead.id}</p>
            <p className="text-[#dcdcdc] mt-2 font-medium">
              {lead.phoneNumber}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-[#323639] rounded-lg p-4 border border-[#3f4245]">
              <p className="text-xs text-[#9aa0a6] uppercase font-semibold">
                Trạng thái
              </p>
              <div className="mt-1">
                <StatusBadge status={lead.status} />
              </div>
            </div>
            <div className="bg-[#323639] rounded-lg p-4 border border-[#3f4245]">
              <p className="text-xs text-[#9aa0a6] uppercase font-semibold">
                Người tạo
              </p>
              <p className="font-medium text-[#e8eaed] mt-1">
                {lead.createdByName || "-"}
              </p>
            </div>
            <div className="bg-[#323639] rounded-lg p-4 border border-[#3f4245]">
              <p className="text-xs text-[#9aa0a6] uppercase font-semibold">
                Ngày tạo
              </p>
              <p className="font-medium text-[#e8eaed] mt-1">
                {time(lead.createdAt)}
              </p>
            </div>
            <div className="bg-[#323639] rounded-lg p-4 border border-[#3f4245]">
              <p className="text-xs text-[#9aa0a6] uppercase font-semibold">
                Sản phẩm
              </p>
              <p className="font-medium text-[#e8eaed] mt-1">
                {lead.product || "-"}
              </p>
            </div>
          </div>

          <div className="border-t border-[#3f4245] pt-6">
            <h4 className="text-sm font-bold text-[#dcdcdc] mb-4 uppercase">
              Phân công Sale
            </h4>
            <div className="grid grid-cols-1 gap-4">
              <div className="relative" ref={boxRef}></div>
              <AutocompleteInput
                placeholder="Nhập tên Sale hoặc tên Team..."
                items={sales}
                selectedItem={selectedAssignee}
                onSelect={(sale) => setSaleId(sale?.id || null)}
                displayValue={(sale) => `${sale.fullname} - ${sale.teamName}`}
                filterFn={(sale, query) => {
                  const textToCheck =
                    `${sale.fullname} ${sale.teamName}`.toLowerCase();
                  return textToCheck.includes(query.toLowerCase());
                }}
              />

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isPending || !isValid}
                  className="w-full py-3 rounded-lg text-base font-semibold text-white bg-[#f48024] hover:brightness-110 focus:ring-2 focus:ring-[#f48024] transition shadow-md disabled:opacity-50"
                >
                  Gán
                </button>
              </div>
            </div>
          </div>
        </form>
      </aside>
    </>
  );
}
