import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../assets/Resume-bro.svg";
import logo from "../assets/FitCheckLogoNew.svg";
import { useTheme } from "../utils/useTheme.jsx";
import { light, dark, backArrow } from "../utils/Icons.jsx";
import { useToast } from "../utils/useToast.jsx";
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { theme, toggleTheme } = useTheme();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      // alert("Please fill in both email and password fields.");
      toast.warning("Please fill in both email and password fields.");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API}/user/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Login failed");
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      toast.success(data.message || "Login successful!");
      console.log("Login successful:", data);
      setUser(data.user);
      navigate(`/dashboard/user/${data.user.name}`);
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(error.message);
    }

    console.log("Login Data: ", { email, password });
    // Redirect to the analyzer after "login"
  };

  return (
    <div className="min-h-screen w-screen relative flex items-center justify-center bg-surface px-4 py-12">
      {/* backbtn */}
      <button
        className="absolute btnClickAnimation top-4 sm:top-20 left-4 sm:left-20 bg-main hover:bg-gray-400/50 font-medium flex items-center gap-1 px-3 sm:px-5 py-2 rounded-full shadow-sm text-text-main transition-colors cursor-pointer z-10"
        onClick={() => navigate(-1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2"
        >
          {backArrow}
        </svg>
        Back
      </button>

      {/* toggleTheme button */}
      <span className="my-auto absolute top-4 sm:top-20 right-4 sm:right-20 z-10">
        <p
          className="flex btnClickAnimation align-center m-0 p-2 rounded-circle rounded-full bg-main hover:bg-gray-400/40 shadow-sm transition-all"
          role="button"
          onClick={toggleTheme}
          style={{ cursor: "pointer", height: "fit-content" }}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="btnClickAnimation"
          >
            {theme === "light" ? dark : light}
          </svg>
        </p>
      </span>

      <div className="signUpFormWrapper overflow-hidden border flex flex-col lg:flex-row items-center bg-main border-border rounded-2xl sm:rounded-4xl shadow-lg w-full max-w-5xl lg:h-full lg:max-h-130">
        {/* left */}
        <div className="imageWrapper relative h-full w-full hidden lg:flex items-center">
          <img
            src={logo}
            alt="FitCheck Logo"
            className="w-10 h-10 mx-auto mb-8 absolute top-5 left-7 opacity-80"
          />

          <img
            src={loginImage}
            alt="Login Image"
            className="object-cover rounded-lg"
          />
        </div>

        {/* right */}
        <div className="w-full h-full relative max-w-xl bg-primary-muted dark:bg-primary-hover/40 rounded-none lg:rounded-s-[6rem] px-6 sm:px-10 lg:px-15 py-10 lg:py-15 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-text-main">
              Welcome <span className="text-primary">back</span>
            </h1>
            <p className="text-text-muted text-md font-light">
              Log in to view your past resume analyses.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                className="block text-sm font-medium text-text-main mb-1.5"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-main border border-border text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-text-main mb-1.5"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-main border border-border text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-2.5 rounded-lg transition-colors shadow-sm mt-2 btnClickAnimation"
            >
              Log In
            </button>
          </form>

          <div className="mt-6">
            <p className="text-sm text-text-muted font-light">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-primary hover:text-primary-hover font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
