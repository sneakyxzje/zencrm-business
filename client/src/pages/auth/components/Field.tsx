export const Field = ({
  label,
  htmlFor,
  children,
  className = "",
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={className}>
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-[#dcdcdc] mb-2"
    >
      {label}
    </label>
    {children}
  </div>
);
