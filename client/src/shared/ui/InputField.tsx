export const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
}: {
  label: string;
  value: string | number | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
}) => (
  <div>
    <label className="block text-sm font-medium text-[#dcdcdc] mb-2">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#90999a]">
        {icon}
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 bg-[#27292b] border border-[#3f4245] rounded-xl text-[#dcdcdc] placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#f48024] focus:border-transparent transition"
      />
    </div>
  </div>
);
