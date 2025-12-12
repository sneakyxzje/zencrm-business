import type { Lead } from "@entities/lead/model/types";
import StatusBadge from "@shared/ui/StatusBadge";
import { time } from "@shared/lib/time";
import { useMemo } from "react";
import { type ColumnDef, SharedTable } from "@shared/ui/Table";

export default function AssignedLeadTable({
  leads,
  onSelect,
}: {
  leads: Lead[];
  onSelect: (l: Lead) => void;
}) {
  const columns = useMemo<ColumnDef<Lead>[]>(
    () => [
      {
        header: "Tên khách hàng",
        cell: (lead) => (
          <div className="text-sm font-medium text-[#dcdcdc] truncate max-w-[220px]">
            {lead.customerName || "Chưa có tên"}
          </div>
        ),
      },
      {
        header: "Số điện thoại",
        cell: (lead) => (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border bg-gray-500/15 text-gray-300 border-gray-500/30">
            {lead.phoneNumber}
          </span>
        ),
      },
      {
        header: "Địa chỉ",
        cell: (lead) => (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border bg-gray-500/15 text-gray-300 border-gray-500/30 max-w-[260px] truncate">
            {lead.address ?? "Không có"}
          </span>
        ),
      },
      {
        header: "Người lên số",
        cell: (lead) => (
          <div className="text-sm text-[#dcdcdc]">
            {(lead.createdByName ?? "") + "_" + (lead.createdByTeam ?? "")}
          </div>
        ),
      },
      {
        header: "Trạng thái",
        cell: (lead) => <StatusBadge status={lead.status} />,
      },
      {
        header: "Ngày tạo",
        cell: (lead) => (
          <div className="text-sm text-[#dcdcdc]">{time(lead.createdAt)}</div>
        ),
      },
      {
        header: "Ngày nhận",
        cell: (lead) => (
          <div className="text-sm text-[#dcdcdc]">
            {lead.assignedAt ? time(lead.assignedAt) : "Không rõ"}
          </div>
        ),
      },
    ],
    []
  );
  return <SharedTable data={leads} columns={columns} onRowClick={onSelect} />;
}
