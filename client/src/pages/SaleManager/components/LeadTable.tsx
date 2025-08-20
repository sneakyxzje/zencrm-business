import type { Lead } from "@entities/lead/model/types";
import StatusBadge from "@entities/lead/ui/StatusBadge";
import { time } from "@shared/lib/time";

export default function LeadTable({
  leads,
  onRowClick,
}: {
  leads: Lead[];
  onRowClick: (l: Lead) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-[#3f4245]">
        <thead className="bg-[#26282a]">
          <tr>
            {[
              "Khách hàng",
              "Người lên số",
              "Team",
              "Ngày lên số",
              "Sản phẩm",
              "Trạng thái",
            ].map((h) => (
              <th
                key={h}
                className="px-6 py-3 text-left text-xs font-semibold text-[#a7b0b1] uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-[#2a2c2e] divide-y divide-[#3f4245]">
          {leads.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-12 text-center text-[#9aa0a6]">
                Chưa có dữ liệu
              </td>
            </tr>
          ) : (
            leads.map((lead) => (
              <tr
                key={lead.id}
                className="cursor-pointer hover:bg-[#26282a] transition-colors"
                onClick={() => onRowClick(lead)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-[#e8eaed]">
                    {lead.customerName || "Chưa có tên"}
                  </div>
                  <div className="text-sm text-[#9aa0a6]">
                    {lead.phoneNumber}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#dcdcdc]">
                  {lead.createdByName || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#dcdcdc]">
                  {lead.createdByTeam || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#9aa0a6]">
                  {time(lead.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#dcdcdc]">
                  {lead.product || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={lead.status} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
