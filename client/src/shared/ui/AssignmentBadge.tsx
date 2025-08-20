export default function AssignmentBadge({ assigned }: { assigned: boolean }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border
      ${
        assigned
          ? "bg-[#1f2a22]/40 text-[#a3e1b7] border-[#274133]"
          : "bg-gray-500/15 text-gray-300 border-gray-500/30"
      }`}
    >
      {assigned ? "Đã phân bổ" : "Chưa phân bổ"}
    </span>
  );
}
