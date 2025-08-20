import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@app/store/hooks";
import { checkAuthStatus, login } from "@entities/user/model/slice";

const LoginView = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { isLoggingin, isLoggedin } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(login({ email, password }))
        .unwrap()
        .then(() => {
          dispatch(checkAuthStatus());
        });
    } catch (err) {
      console.log("Login err", err);
    }
  };

  useEffect(() => {
    if (isLoggedin) {
      console.log("User already logged in");
    }
  }, [isLoggedin]);

  if (isLoggedin) return null;

  return (
    <div className="min-h-screen bg-[#232629] ">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center mb-8"
        >
          <div className="inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f48024] to-[#ff8a00] flex items-center justify-center shadow-[0_10px_30px_rgba(244,128,36,0.35)]">
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#dcdcdc]">
                Welcome to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f48024] to-[#ff8a00]">
                  ZenCRM
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-[#a7b0b1]">
                Enterprise-grade business management platform
              </p>
            </div>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="hidden lg:block"
          >
            <LeftShowcase />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <FormCard
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              isLoggingin={isLoggingin}
              handleSubmit={handleSubmit}
            />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center mt-10 text-xs text-[#90999a]"
        >
          © 2025 ZenCRM · Enterprise Business Solutions · All rights reserved.
        </motion.div>
      </div>
    </div>
  );
};

export default LoginView;

const LeftShowcase = () => {
  return (
    <div className="relative">
      <div className="rounded-3xl border border-[#3f4245] bg-gradient-to-b from-[#2a2c2e] to-[#222426] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[#dcdcdc] text-2xl font-semibold">
              Why teams choose ZenCRM
            </h2>
            <p className="text-[#a7b0b1] mt-2 max-w-md">
              Secure, scalable, and blazing fast. Streamline customer ops with a
              modern, developer‑friendly stack.
            </p>
          </div>
          <BadgeSecure />
        </div>

        <ul className="mt-8 space-y-4">
          {[
            {
              title: "Privacy first",
              desc: "HttpOnly auth with 256‑bit TLS and role‑based access.",
            },
            {
              title: "Fast onboarding",
              desc: "SSO and password auth in one place.",
            },
            {
              title: "Observability",
              desc: "Built‑in audit trails and activity logs.",
            },
          ].map((item, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="flex items-start gap-3"
            >
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#2e3133] border border-[#3f4245]">
                <svg
                  className="w-3.5 h-3.5 text-[#f48024]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19 20.3 7.7l-1.4-1.4z" />
                </svg>
              </span>
              <div>
                <p className="text-[#dcdcdc] font-medium">{item.title}</p>
                <p className="text-[#969fa0] text-sm">{item.desc}</p>
              </div>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 rounded-2xl border border-[#3f4245] bg-[#26282a] p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#f48024] to-[#ff8a00] flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3 13h8l-1 8 11-13h-8l1-8z" />
                </svg>
              </div>
              <div>
                <p className="text-[#dcdcdc] text-sm font-semibold">
                  Realtime Lead Sync
                </p>
                <p className="text-[#90999a] text-xs">
                  0 downtime · 99.99% SLA
                </p>
              </div>
            </div>
            <span className="text-[10px] text-[#a7b0b1]">Preview</span>
          </div>
          <div className="mt-4 h-2 w-full rounded-full bg-[#2f3234] overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#f48024] to-[#ff8a00]"
              initial={{ width: "10%" }}
              animate={{ width: ["10%", "85%", "60%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const BadgeSecure = () => (
  <div className="flex items-center text-xs text-[#90999a] border border-[#3f4245] rounded-lg px-2.5 py-1.5 bg-[#252728]">
    <svg
      className="w-4 h-4 mr-1.5"
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
);

const FormCard = ({
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

          <div className="flex items-center justify-between text-sm mt-6">
            <label className="flex items-center select-none">
              <input
                type="checkbox"
                className="h-4 w-4 text-[#f48024] bg-[#27292b] border-[#3f4245] rounded"
              />
              <span className="ml-2 text-[#dcdcdc]">Remember me</span>
            </label>
            <a href="#" className="text-[#f48024] hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isLoggingin}
            whileTap={{ scale: isLoggingin ? 1 : 0.98 }}
            className={`mt-7 w-full py-3 rounded-xl font-semibold text-white transition will-change-transform relative overflow-hidden
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
            {/* animated shine */}
            {!isLoggingin && (
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent animate-[shine_1.8s_ease_infinite]" />
            )}
          </motion.button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-[#3f4245]" />
            <span className="px-3 text-[#90999a] text-xs">
              or continue with
            </span>
            <hr className="flex-grow border-[#3f4245]" />
          </div>

          {/* Google button */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-[#27292b] hover:bg-[#303234] transition rounded-xl border border-[#3f4245] shadow-sm"
          >
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
            <span className="text-[#dcdcdc] font-medium">
              Continue with Google
            </span>
          </motion.button>

          {/* Security badge */}
          <div className="flex items-center justify-center mt-6 text-xs text-[#90999a]">
            <BadgeSecure />
          </div>
        </form>
      </div>
    </motion.div>
  );
};

const Field = ({
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

const Spinner = () => (
  <span
    className="inline-block h-4 w-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin"
    aria-hidden="true"
  />
);
