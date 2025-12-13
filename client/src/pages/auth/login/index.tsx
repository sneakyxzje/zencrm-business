import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@app/store/hooks";
import { checkAuthStatus, login } from "@entities/user/model/slice";
import { useToast } from "@app/provider/ToastContext";
import { FormCard } from "@pages/auth/components/FormCard";

const LoginView = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { isLoggingin, isLoggedin } = useAppSelector((state) => state.auth);
  const { addToast } = useToast();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(login({ email, password }))
        .unwrap()
        .then(() => {
          dispatch(checkAuthStatus());
          addToast({
            type: "success",
            title: "Successful",
            message: "Login successfully",
            persistent: false,
            duration: 4000,
          });
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
    <div className="min-h-screen bg-[#232629] flex flex-col justify-center items-center overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center mb-8"
        >
          <div className="inline-flex items-center gap-3">
            <div>
              <h1 className="text-2xl text-center sm:text-3xl font-bold tracking-tight text-[#dcdcdc]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f48024] to-[#ff8a00]">
                  ZenCRM
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-[#a7b0b1] mt-2 text-center">
                Enterprise-grade business management platform
              </p>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-center items-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-md"
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
