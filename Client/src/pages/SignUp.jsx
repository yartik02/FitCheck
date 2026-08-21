import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import signUpImage from "../assets/Online resume-rafiki.svg";
import logo from "../assets/FitCheckLogoNew.svg";
import { useTheme } from "../utils/useTheme.jsx";
import { useToast } from "../utils/useToast.jsx";
import {
  light,
  dark,
  backArrow,
  eyeIcon,
  eyeOffIcon,
} from "../utils/Icons.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {eyeIcon}
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {eyeOffIcon}
  </svg>
);

/* ── Password strength evaluation ── */
function getPasswordStrength(password) {
  if (!password) return { label: "", score: 0, percent: 0, color: "" };

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  // Map 0-6 score to four strength tiers
  if (score <= 2)
    return { label: "Poor", score, percent: 25, color: "var(--score-low)" };
  if (score <= 3)
    return { label: "Fair", score, percent: 50, color: "var(--score-medium)" };
  if (score <= 4)
    return { label: "Good", score, percent: 75, color: "var(--score-high)" };
  return { label: "Strong", score, percent: 100, color: "var(--primary)" };
}

export default function Signup() {
  const { theme, toggleTheme } = useTheme();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //   const { signup } = useAuth();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const passwordStrength = useMemo(
    () => getPasswordStrength(formData.password),
    [formData.password],
  );

  // Confirm password is disabled when password is empty or strength is "Poor"
  const isConfirmDisabled =
    !formData.password || passwordStrength.label === "Poor";

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => {
      // If the user clears/weakens the password, also reset confirmPassword
      if (id === "password") {
        const newStrength = getPasswordStrength(value);
        if (!value || newStrength.label === "Poor") {
          return { ...prev, password: value, confirmPassword: "" };
        }
      }
      return { ...prev, [id]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (passwordStrength.label === "Poor") {
      toast.error("Password strength is too weak");
      return;
    }

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      console.log("Submitting SignUp data: ", formData);
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API}/user/auth/signUp`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message === "User already exists") {
          toast.error("User already exists. Please log in instead.");
        } else {
          toast.error(errorData.message || "Sign-up failed");
        }
        throw new Error(errorData.message || "Sign-up failed");
      }

      const data = await response.json();
      console.log("Sign-up successful: ", data);
      toast.success(`Welcome ${data.user.name}!`);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setUser(data.user);
      navigate(`/dashboard/user/${data.user.name}`)
    } catch (err) {
      console.error("Error during sign-up: ", err);
      if (err.message !== "User already exists") {
        toast.error("User already exists. Please log in instead.");
      } else {
        toast.error("An error occurred during sign-up. Please try again.");
      }
    }

    console.log("SignUp data: ", formData);
    // navigate("/analyzer");
  };

  return (
    <div className="min-h-screen w-screen relative flex items-center justify-center bg-surface px-4 py-12">
      {/* back button */}
      <button
        className="absolute top-4 sm:top-10 btnClickAnimation shadow-sm left-4 sm:left-10 bg-main hover:bg-gray-400/50 font-medium flex items-center gap-1 px-3 sm:px-5 py-2 rounded-full text-text-main transition-colors cursor-pointer z-10"
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
      <span className="my-auto absolute top-4 sm:top-10 right-4 sm:right-10 z-10">
        <p
          className="flex align-center m-0 p-2 btnClickAnimation shadow-sm rounded-circle rounded-full bg-main hover:bg-gray-400/40 transition-all"
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
          >
            {theme === "light" ? dark : light}
          </svg>
        </p>
      </span>

      <div className="signUpFormWrapper overflow-hidden relative border flex flex-col lg:flex-row items-center bg-main border-border rounded-2xl sm:rounded-3xl shadow-lg w-full max-w-6xl lg:h-full lg:max-h-170">
        {/* left */}
        <div className="imageWrapper  h-full w-full hidden lg:flex items-center px-10">
          <img
            src={logo}
            alt="FitCheck Logo"
            className="w-10 h-10 absolute top-5 left-6 opacity-80"
          />
          <img
            src={signUpImage}
            alt="Sign Up Image"
            className="object-cover rounded-lg"
          />
        </div>

        {/* right */}
        <div className="w-full h-full max-w-xl bg-primary-muted dark:bg-primary-hover/40 rounded-none lg:rounded-s-[6rem] px-6 sm:px-10 lg:px-15 py-10 lg:py-15 flex flex-col justify-center">
          <div className="mb-4">
            <h1 className="text-4xl font-bold text-text-main">
              Create an <span className="text-primary">account</span>
            </h1>
            <p className="text-text-muted text-md font-light">
              Start optimizing your resume for better matches.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-text-main mb-1.5"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-main border border-border text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="eg. John Doe"
              />
            </div>

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
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-main border border-border text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="you@example.com"
              />
            </div>

            {/* ── Password field with toggle & strength bar ── */}
            <div>
              <label
                className="block text-sm font-medium text-text-main mb-1.5"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 pr-11 rounded-lg bg-main border border-border text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main transition-colors cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>

              {/* Strength indicator */}
              {formData.password && (
                <div className="mt-2 space-y-1">
                  {/* Progress bar */}
                  <div
                    className="h-1.5 w-full rounded-full overflow-hidden"
                    style={{ backgroundColor: "var(--border)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${passwordStrength.percent}%`,
                        backgroundColor: passwordStrength.color,
                        transition:
                          "width 0.35s ease, background-color 0.35s ease",
                      }}
                    />
                  </div>
                  {/* Label */}
                  <p
                    className="text-xs font-medium"
                    style={{ color: passwordStrength.color }}
                  >
                    {passwordStrength.label}
                  </p>
                </div>
              )}
            </div>

            {/* ── Confirm Password field with toggle ── */}
            <div>
              <label
                className="block text-sm font-medium text-text-main mb-1.5"
                htmlFor="confirmPassword"
                style={{ opacity: isConfirmDisabled ? 0.5 : 1 }}
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  disabled={isConfirmDisabled}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 pr-11 rounded-lg bg-main border border-border text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                    isConfirmDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  placeholder="••••••••"
                />
                {!isConfirmDisabled && (
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main transition-colors cursor-pointer"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full btnClickAnimation bg-primary hover:bg-primary-hover text-white font-medium py-2.5 rounded-lg transition-colors shadow-sm mt-4"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6">
            <p className="text-sm text-text-muted font-light">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:text-primary-hover font-medium"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
