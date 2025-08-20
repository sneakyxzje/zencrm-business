import type { LeadStatus } from "@entities/lead/model/types";

function getStatusText(status: LeadStatus) {
  switch (status) {
    case "NEW":
      return "Mới";
    case "contacted":
      return "Đã liên hệ";
    case "interested":
      return "Quan tâm";
    case "not_interested":
      return "Không quan tâm";
    case "converted":
      return "Đã chuyển đổi";
    default:
      return "Khác";
  }
}
function badgeClass(s: LeadStatus) {
  switch (s) {
    case "NEW":
      return "bg-[#27292b] text-[#e6e6e6] border border-[#3f4245]";
    case "contacted":
      return "bg-[#1f2a2f]/60 text-[#9fd6ff] border border-[#28414a]";
    case "interested":
      return "bg-[#1f2a22]/60 text-[#a3e1b7] border border-[#274133]";
    case "converted":
      return "bg-[#2a2520]/60 text-[#ffd5b3] border border-[#4a3b2f]";
    case "not_interested":
      return "bg-[#2b2224]/60 text-[#f1a9a9] border border-[#4a2b30]";
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
