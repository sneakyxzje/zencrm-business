import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import { login } from "../../redux/slices/AuthSlices";

const LoginView = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { isLoggingin, isLoggedin } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (isLoggedin) {
      console.log("User already logged in");
    }
  }, [isLoggedin]);

  if (isLoggedin) return null;

  return (
    <div className="min-h-screen bg-[#232629] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-8 -left-8 w-72 h-72 bg-[#3b3f41] rounded-full mix-blend-overlay filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -top-8 -right-8 w-72 h-72 bg-[#2d2f31] rounded-full mix-blend-overlay filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-12 left-16 w-72 h-72 bg-[#282a2c] rounded-full mix-blend-overlay filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="bg-[#3b3f41]/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-[#4d4d4d]">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#f48024]/80 to-[#f48024] rounded-2xl shadow-lg mb-4 transform rotate-12 hover:rotate-0 transition-transform duration-300">
              <svg
                className="w-8 h-8 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-[#dcdcdc] mb-2">
              Welcome to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f48024] to-[#ff8a00]">
                ZenCRM
              </span>
            </h1>
            <p className="text-[#90999a] text-sm">
              Enterprise-grade business management platform
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#dcdcdc] mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                {/* original email icon */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-[#90999a]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="john@company.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#2d2d2d] border border-[#4d4d4d] rounded-xl text-[#dcdcdc] placeholder-[#90999a] focus:outline-none focus:ring-2 focus:ring-[#f48024] transition"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#dcdcdc] mb-2"
              >
                Password
              </label>
              <div className="relative">
                {/* original lock icon */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-[#90999a]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 bg-[#2d2d2d] border border-[#4d4d4d] rounded-xl text-[#dcdcdc] placeholder-[#90999a] focus:outline-none focus:ring-2 focus:ring-[#f48024] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#90999a] hover:text-[#dcdcdc] transition"
                >
                  {showPassword ? (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.878 9.878l4.242 4.242"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-[#f48024] bg-[#2d2d2d] border-[#4d4d4d] rounded focus:ring-[#f48024]"
                />
                <span className="ml-2 text-[#dcdcdc]">Remember me</span>
              </label>
              <a href="#" className="text-[#f48024] hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoggingin}
              className={`w-full py-3 cursor-pointer rounded-xl font-semibold text-white transition transform ${
                isLoggingin
                  ? "bg-[#555] cursor-not-allowed"
                  : "bg-[#f48024] hover:bg-[#e06a00] hover:scale-[1.02] shadow-lg"
              }`}
            >
              {isLoggingin ? "Signing in..." : "Signin"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-[#4d4d4d]" />
            <span className="px-4 text-[#90999a]">or continue with</span>
            <hr className="flex-grow border-[#4d4d4d]" />
          </div>

          <div className="flex justify-center">
            <button className="flex items-center cursor-pointer justify-center space-x-2 px-5 py-3 bg-[#2d2d2d] hover:bg-[#3b3f41] transition rounded-xl border border-[#4d4d4d] shadow-sm">
              <div className="w-5 h-5">
                <svg
                  className="w-5 h-5 text-[#dcdcdc]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </div>
              <span className="text-[#dcdcdc] font-medium">
                Continue with Google
              </span>
            </button>
          </div>

          {/* Security Badge */}
          <div className="flex items-center justify-center mt-6 text-xs text-[#90999a]">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            256-bit SSL encryption
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-[#90999a]">
          © 2025 ZenCRM. Enterprise Business Solutions. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default LoginView;
