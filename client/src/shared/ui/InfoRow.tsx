export const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number | undefined | null;
}) => (
  <div className="flex items-center justify-between py-3 border-b border-[#3f4245] last:border-0">
    <div className="flex items-center gap-3 flex-1 min-w-0">
      <div className="flex-shrink-0 text-[#90999a]">{icon}</div>
      <span className="text-sm text-[#90999a] font-medium">{label}</span>
    </div>
    <span className="text-sm text-[#dcdcdc] font-semibold text-right ml-4 max-w-[55%] break-words">
      {value || "Chưa có"}
    </span>
  </div>
);
