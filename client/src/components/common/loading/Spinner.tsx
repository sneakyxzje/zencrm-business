import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "blue" | "purple" | "green" | "pink" | "indigo";
  text?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  color = "blue",
  text = "Loading...",
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const colorClasses = {
    blue: "border-blue-500",
    purple: "border-purple-500",
    green: "border-green-500",
    pink: "border-pink-500",
    indigo: "border-indigo-500",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center space-y-4 bg-white bg-opacity-80 z-50">
      <div
        className={`${sizeClasses[size]} border-4 ${colorClasses[color]} border-t-transparent rounded-full animate-spin`}
      />
      {text && (
        <p
          className={`${textSizeClasses[size]} text-gray-600 font-medium animate-pulse`}
        >
          {text}
        </p>
      )}
    </div>
  );
};

export default Spinner;
