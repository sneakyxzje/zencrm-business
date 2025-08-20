import React from "react";

interface ErrorPageProps {
  errorCode?: string;
  title?: string;
  message?: string;
  showHomeButton?: boolean;
  showBackButton?: boolean;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({
  errorCode = "404",
  title = "Page Not Found",
  message = "Sorry, the page you are looking for doesn't exist or has been moved.",
  showHomeButton = true,
  showBackButton = true,
}) => {
  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated Error Code */}
        <div className="relative mb-8">
          <h1 className="text-[12rem] md:text-[16rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 leading-none animate-pulse">
            {errorCode}
          </h1>
          <div className="absolute inset-0 text-[12rem] md:text-[16rem] font-bold text-slate-200 -z-10 leading-none">
            {errorCode}
          </div>
        </div>

        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
              <svg
                className="w-16 h-16 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            {/* Floating particles */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
            <div
              className="absolute -bottom-2 -left-2 w-3 h-3 bg-pink-400 rounded-full animate-ping"
              style={{ animationDelay: "0.5s" }}
            ></div>
          </div>
        </div>

        {/* Error Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 animate-fade-in">
          {title}
        </h2>

        {/* Error Message */}
        <p
          className="text-lg md:text-xl text-slate-600 mb-12 leading-relaxed max-w-lg mx-auto animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          {message}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {showHomeButton && (
            <button
              onClick={handleGoHome}
              className="group px-8 py-4 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <svg
                className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>Go Home</span>
            </button>
          )}

          {showBackButton && (
            <button
              onClick={handleGoBack}
              className="group px-8 py-4 bg-white text-slate-700 font-semibold rounded-full border-2 border-slate-200 shadow-lg hover:shadow-xl hover:border-slate-300 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 animate-fade-in"
              style={{ animationDelay: "0.5s" }}
            >
              <svg
                className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Go Back</span>
            </button>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 flex justify-center space-x-2 opacity-50">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};
