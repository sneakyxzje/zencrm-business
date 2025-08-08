import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import { login } from "../../redux/slices/AuthSlices";
import useCurrentUser from "../../hooks/useCurrentUser";
const LoginView = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const { isLoggingin, isLoggedin } = useAppSelector((state) => state.auth);
  const user = useCurrentUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (isLoggedin && user) {
      console.log("User already logged in");
    }
  }, [isLoggedin, user]);

  if (isLoggedin && user) {
    return null;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 space-y-6">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-14 h-14 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
            <span className="text-white text-xl font-bold">Z</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800">ZenCRM</h1>
          <p className="text-sm text-gray-500 text-center">
            Your smart business companion
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoggingin}
            className={`w-full text-white font-semibold py-2.5 rounded-lg transition duration-200
    ${
      isLoggingin
        ? "bg-blue-300 cursor-not-allowed"
        : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
    }`}
          >
            {isLoggingin ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginView;
