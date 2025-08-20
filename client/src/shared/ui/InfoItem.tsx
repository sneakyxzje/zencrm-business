export default function InfoItem({
  label,
  value,
  muted,
}: {
  label: string;
  value: string | number;
  muted?: boolean;
}) {
  return (
    <div>
      <div className="text-[11px] text-[#90999a] mb-1">{label}</div>
      <div className={`text-sm ${muted ? "text-[#90999a]" : "text-[#dcdcdc]"}`}>
        {value}
      </div>
    </div>
  );
}
