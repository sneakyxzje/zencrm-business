import { Field } from "@pages/auth/components/Field";
import Spinner from "@shared/ui/Spinner";
import { AnimatePresence, motion } from "framer-motion";

export const FormCard = ({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  isLoggingin,
  handleSubmit,
}: {
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  isLoggingin: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <motion.div whileHover={{ y: -2 }} className="relative group">
      <div className="absolute -inset-[1.5px] rounded-[26px] bg-gradient-to-b from-[#f48024]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      <div className="relative rounded-[24px] border border-[#3f4245] bg-[#2a2c2e]/80 backdrop-blur-md shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
        <div className="h-1.5 w-28 mx-auto mt-5 rounded-full bg-gradient-to-r from-[#f48024] to-[#ff8a00] opacity-80" />

        <form onSubmit={handleSubmit} className="p-8 sm:p-10">
          <Field label="Email Address" htmlFor="email">
            <div className="relative">
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
                className="w-full pl-10 pr-4 py-3 bg-[#27292b] border border-[#3f4245] rounded-xl text-[#dcdcdc] placeholder-[#90999a] focus:outline-none focus:ring-2 focus:ring-[#f48024] focus:border-transparent transition"
                autoComplete="email"
              />
            </div>
          </Field>

          <Field label="Password" htmlFor="password" className="mt-6">
            <div className="relative">
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
                className="w-full pl-10 pr-12 py-3 bg-[#27292b] border border-[#3f4245] rounded-xl text-[#dcdcdc] placeholder-[#90999a] focus:outline-none focus:ring-2 focus:ring-[#f48024] focus:border-transparent transition"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#90999a] hover:text-[#dcdcdc] transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <AnimatePresence initial={false} mode="wait">
                  {showPassword ? (
                    <motion.svg
                      key="hide"
                      initial={{ opacity: 0, rotate: -10 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 10 }}
                      transition={{ duration: 0.15 }}
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
                    </motion.svg>
                  ) : (
                    <motion.svg
                      key="show"
                      initial={{ opacity: 0, rotate: 10 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -10 }}
                      transition={{ duration: 0.15 }}
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
                    </motion.svg>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </Field>

          <motion.button
            type="submit"
            disabled={isLoggingin}
            whileTap={{ scale: isLoggingin ? 1 : 0.98 }}
            className={`mt-7 w-full py-3 cursor-pointer rounded-xl font-semibold text-white transition will-change-transform relative overflow-hidden
              ${
                isLoggingin
                  ? "bg-[#555] cursor-not-allowed"
                  : "bg-[#f48024] hover:bg-[#e06a00] shadow-lg"
              }`}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLoggingin && <Spinner />}
              {isLoggingin ? "Signing in..." : "Sign in"}
            </span>
            {!isLoggingin && (
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent animate-[shine_1.8s_ease_infinite]" />
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};
