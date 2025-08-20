import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  text?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  text = "Loading...",
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center space-y-4 bg-[#232629] bg-opacity-90 z-50">
      <div
        className={`${sizeClasses[size]} border-4 border-[#f48024] border-t-transparent rounded-full animate-spin`}
      />

      {text && (
        <p
          className={`${textSizeClasses[size]} text-[#f48024] font-medium animate-pulse`}
        >
          {text}
        </p>
      )}
    </div>
  );
};

export default Spinner;
