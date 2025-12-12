import type { Lead } from "@entities/lead/model/types";
import StatusBadge from "@shared/ui/StatusBadge";
import { time } from "@shared/lib/time";
import { type ColumnDef, SharedTable } from "@shared/ui/Table";
import { useMemo } from "react";

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
        header: "Khách hàng",
        cell: (lead) => (
          <div className="text-sm font-medium text-[#dcdcdc] truncate max-w-[220px]">
            {lead.customerName || "Chưa có tên"}
          </div>
        ),
      },
      {
        header: "Người lên số",
        cell: (lead) => (
          <div className="text-sm text-[#dcdcdc]">
            {lead.createdByName ?? ""}
          </div>
        ),
      },
      {
        header: "Team",
        cell: (lead) => (
          <div className="text-sm text-[#dcdcdc]">
            {lead.createdByTeam ?? ""}
          </div>
        ),
      },
      {
        header: "Ngày lên số",
        cell: (lead) => (
          <div className="text-sm text-[#dcdcdc]">{time(lead.createdAt)}</div>
        ),
      },
      {
        header: "Sản phẩm",
        cell: (lead) => (
          <div className="text-sm text-[#dcdcdc]">{lead.product}</div>
        ),
      },
      {
        header: "Trạng thái",
        cell: (lead) => <StatusBadge status={lead.status} />,
      },
    ],
    []
  );
  return <SharedTable data={leads} columns={columns} onRowClick={onRowClick} />;
}
