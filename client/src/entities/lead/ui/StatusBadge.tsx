import type { LeadStatus } from "@entities/lead/model/types";

function getStatusText(status: LeadStatus) {
  switch (status) {
    case "NEW":
      return "Mới";
    case "CALLED":
      return "Đã gọi";
    case "ASSIGNED":
      return "ASSIGNED";
    case "IN_PROGRESS":
      return "IN PROGRESS";
    default:
      return "Khác";
  }
}
function badgeClass(s: LeadStatus) {
  switch (s) {
    case "NEW":
      return "bg-[#27292b] text-[#e6e6e6] border border-[#3f4245]";
    case "CALLED":
      return "bg-[#1f2a2f]/60 text-[#9fd6ff] border border-[#28414a]";
    case "ASSIGNED":
      return "bg-[#2a2520]/60 text-[#ffd5b3] border border-[#4a3b2f]";
    case "IN_PROGRESS":
      return "bg-orange-500/15 text-orange-400 border border-orange-500/30";
    default:
      return "bg-[#27292b] text-[#cfd4d5] border border-[#3f4245]";
  }
}

export default function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${badgeClass(
        status
      )}`}
    >
      {getStatusText(status)}
    </span>
  );
}
