import type { Lead } from "@entities/lead/model/types";
import StatusBadge from "@shared/ui/StatusBadge";
import { time } from "@shared/lib/time";
import { useMemo } from "react";
import { type ColumnDef, SharedTable } from "@shared/ui/Table";

export default function LeadTable({
  leads,
  onRowClick,
}: {
  leads: Lead[];
  onRowClick: (l: Lead) => void;
}) {
  const columns = useMemo<ColumnDef<Lead>[]>(
    () => [
      {
        header: "Số điện thoại",
        cell: (l) => (
          <div className="flex items-center">
            <span className="mr-3 inline-flex h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#f48024] to-[#ff8a00]" />
            <div>
              <div className="text-sm font-medium text-[#dcdcdc]">
                {l.phoneNumber || "Không rõ"}
              </div>
              <div className="text-[11px] text-[#90999a]">ID: {l.id}</div>
            </div>
          </div>
        ),
      },
      {
        header: "Tên khách hàng",
        cell: (l) => (
          <div className="text-sm text-[#dcdcdc]">
            {l.customerName ?? (
              <span className="text-[#90999a] italic">Chưa có tên</span>
            )}
          </div>
        ),
      },
      {
        header: "Ngày Tạo",
        cell: (l) => (
          <div className="text-sm text-[#dcdcdc]">{time(l.createdAt)}</div>
        ),
      },
      {
        header: "Sales phụ trách",
        cell: (l) => (
          <div className="flex items-center gap-2 text-sm text-[#dcdcdc]">
            {l.assigneeName && l.assigneeTeam ? (
              `${l.assigneeName}_${l.assigneeTeam}`
            ) : (
              <span className="text-[#90999a] italic">Chưa phân bổ</span>
            )}
          </div>
        ),
      },
      {
        header: "Ngày nhận",
        cell: (l) => (
          <div className="text-sm text-[#dcdcdc]">
            {l.assignedAt ? (
              time(l.assignedAt)
            ) : (
              <span className="text-[#90999a] italic">Chưa có</span>
            )}
          </div>
        ),
      },
      {
        header: "Trạng thái",
        cell: (l) => <StatusBadge status={l.status} />,
      },
    ],
    []
  );
  return (
    <SharedTable
      data={leads}
      columns={columns}
      onRowClick={onRowClick}
      emptyMessage="Không tìm thấy lead...."
    />
  );
}
