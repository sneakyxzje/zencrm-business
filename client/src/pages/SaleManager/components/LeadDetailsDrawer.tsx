import type { Lead } from "@entities/lead/model/types";
import { time } from "@shared/lib/time";
import { normalize } from "@shared/lib/normalize";
import { assignLead } from "@features/assign-lead/model/service";
import StatusBadge from "@entities/lead/ui/StatusBadge";
import { useEffect, useMemo, useRef, useState } from "react";
import type { AssignableSales } from "@entities/user/model/types";

export default function LeadDetailsDrawer({
  open,
  lead,
  onClose,
  sales,
  onAssigned,
}: {
  open: boolean;
  lead: Lead | null;
  sales: AssignableSales[];
  onClose: () => void;
  onAssigned?: () => void;
}) {
  const [q, setQ] = useState("");
  const [team, setTeam] = useState("");
  const [saleId, setSaleId] = useState<number | null>(null);
  const [openList, setOpenList] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const f = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpenList(false);
    };
    document.addEventListener("mousedown", f);
    return () => document.removeEventListener("mousedown", f);
  }, []);
  const filtered = useMemo(() => {
    const nq = normalize(q);
    return nq ? sales.filter((s) => normalize(s.fullname).includes(nq)) : sales;
  }, [q, sales]);

  if (!open || !lead) return null;
  const isValid = saleId !== null; // ✅ fix bug

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

        <form
          className="p-6 flex-1 overflow-y-auto"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!isValid) return alert("Id sale k duoc null");
            await assignLead({ leadId: lead.id, saleId: saleId! });
            onAssigned?.();
            onClose();
          }}
        >
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
              <div className="relative" ref={boxRef}>
                <label className="block text-sm font-medium text-[#dcdcdc]">
                  Sale phụ trách
                </label>
                <input
                  type="text"
                  placeholder="Tìm kiếm sale..."
                  value={q}
                  onFocus={() => setOpenList(true)}
                  onChange={(e) => setQ(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-[#3f4245] rounded-md bg-[#27292b] text-[#dcdcdc] placeholder-[#90999a] focus:outline-none focus:ring-2 focus:ring-[#f48024] focus:border-[#f48024]"
                />
                {openList && (
                  <ul className="absolute z-50 mt-1 w-full bg-[#1c1f22] border border-[#3f4245] rounded-md shadow-xl max-h-56 overflow-auto">
                    {filtered.length ? (
                      filtered.map((s) => (
                        <li
                          key={s.id}
                          className="cursor-pointer text-[#dcdcdc] hover:bg-[#25292c] py-2 px-4"
                          onClick={() => {
                            setQ(s.fullname);
                            setTeam(s.teamName);
                            setOpenList(false);
                            setSaleId(s.id);
                          }}
                        >
                          {s.fullname}{" "}
                          <span className="text-[#9aa0a6]">({s.teamName})</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-[#9aa0a6] py-2 px-4">
                        {q ? "Không tìm thấy sale" : "Nhập để tìm kiếm sale"}
                      </li>
                    )}
                  </ul>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#dcdcdc]">
                  Team
                </label>
                <input
                  value={team}
                  disabled
                  placeholder="Team"
                  className="mt-1 w-full px-3 py-2 border border-[#3f4245] rounded-md bg-[#27292b] text-[#9aa0a6] sm:text-sm"
                />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={!isValid}
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
