import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../utils/useTheme";
import {
  eyeIcon,
  eyeOffIcon,
  userIcon,
  paletteIcon,
  shieldIcon,
  monitorIcon,
  moonIcon,
  sunIcon,
  settings,
  fileReadyIcon,
} from "../../../utils/Icons";
import { useToast } from "../../../utils/useToast.jsx";

const EMPTY_PASSWORD_STATE = {
  currentPassword: "",
  newPassword: "",
};

const getUserId = (currentUser) => currentUser?._id || currentUser?.id;

const normalizeDisplayName = (value = "") => value.trim().replace(/\s+/g, " ");

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

const Icons = {
  User: ({ className }) => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {userIcon}
    </svg>
  ),
  Palette: ({ className }) => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paletteIcon}
    </svg>
  ),
  Shield: ({ className }) => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {shieldIcon}
    </svg>
  ),
  Monitor: ({ className }) => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {monitorIcon}
    </svg>
  ),
  Moon: ({ className }) => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {moonIcon}
    </svg>
  ),
  Sun: ({ className }) => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {sunIcon}
    </svg>
  ),
  FileReady: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {fileReadyIcon}
    </svg>
  ),
};

const TABS = [
  { id: "profile", label: "General Profile", icon: Icons.User },
  { id: "appearance", label: "Appearance", icon: Icons.Palette },
  { id: "security", label: "Security", icon: Icons.Shield },
];

const getInitials = (name) => {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// 3. MAIN COMPONENT
export default function Settings() {
  const { user, setUser } = useAuth();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const { theme, setTheme } = useTheme();
  const [newName, setNewName] = useState(user?.name || "");
  const [passwordData, setPasswordData] = useState(EMPTY_PASSWORD_STATE);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const userId = useMemo(() => getUserId(user), [user]);

  useEffect(() => {
    if (user?.name) {
      setNewName(user.name);
    }
  }, [user?.name]);

  const handleViewResume = async () => {
    setIsModalOpen(true);
    if (pdfUrl) return;

    setLoadingPdf(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API}/user/analysis/savedResume/view`,
        {
          credentials: "include",
        },
      );
      if (!response.ok) throw new Error("Failed to load PDF");

      const blob = await response.blob();
      setPdfUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPdf(false);
    }
  };

  const passwordStrength = useMemo(
    () => getPasswordStrength(passwordData.newPassword),
    [passwordData.newPassword],
  );

  const handleInputChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNameChange = async (e) => {
    e.preventDefault();

    const nextName = normalizeDisplayName(newName);

    if (!nextName) {
      return toast.error("Name can't be empty!");
    }

    if (nextName === user?.name) {
      return toast.error("Use another name than saved name!");
    }

    if (!userId) {
      return toast.error("User session is not available.");
    }

    setIsChanging(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_API}/user/auth/changeName`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newName: nextName, userId }),
        },
      );
      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message || "Name Change failed!");
        throw new Error(errorData.message || "Name Change failed!");
      }

      const data = await res.json();
      setUser((prev) => (prev ? { ...prev, name: nextName } : prev));
      setNewName(nextName);
      toast.success(data.message || "New name is saved successfully!");
    } catch (error) {
      console.error("Error during changing name:", error);
      toast.error(error.message);
    } finally {
      setIsChanging(false);
    }
  };

  const changePasswordHandler = async (e) => {
    e.preventDefault();

    const { currentPassword: currPassword, newPassword } = passwordData;

    if (!newPassword || !currPassword) {
      return toast.error("Fill both fields to continue...");
    }

    if (newPassword === currPassword) {
      return toast.error("Use new Password to change!");
    }

    if (getPasswordStrength(newPassword).percent < 50) {
      return toast.error("Please improve strength of New Password!");
    }

    if (!userId) {
      return toast.error("User session is not available.");
    }

    setIsChanging(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_API}/user/auth/changePassword`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword, currPassword, userId }),
        },
      );
      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message || "Password Change failed!");
        throw new Error(errorData.message || "Password Change failed!");
      }

      const data = await res.json();
      toast.success(data.message || "Password is changed successfully!");
      setPasswordData(EMPTY_PASSWORD_STATE);
    } catch (error) {
      console.error("Error during changing password:", error);
      toast.error(error.message);
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pr-4 sm:pr-6 lg:pr-8 py-8 lg:py-10 w-full animate-in fade-in duration-700">
      {/* 1. Header Section */}
      <div className="mb-16 border-b border-border/60 pb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-text-muted"></div>
          <p className="text-text-muted flex font-bold tracking-[0.2em] uppercase text-[10px]">
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
              className="mr-1 w-3.5 h-3.5"
            >
              {settings}
            </svg>
            <span>System Configuration</span>
          </p>
        </div>
        <h1 className="text-4xl md:text-7xl font-bold text-text-main tracking-tight mb-4">
          Settings.
        </h1>
        <p className="text-lg text-text-muted font-light max-w-2xl leading-relaxed">
          Manage your account preferences, interface settings, and system
          security parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* 2. Left Column: Navigation (Span 4) */}
        <div className="lg:col-span-4">
          <nav className="flex flex-col gap-2 sticky top-24">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 text-left ${
                  activeTab === tab.id
                    ? "bg-surface border border-border/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-text-main"
                    : "border border-transparent text-text-muted hover:bg-surface/60 hover:text-text-main"
                }`}
              >
                <tab.icon
                  className={`w-4 h-4 ${activeTab === tab.id ? "text-primary" : "text-text-muted"}`}
                />
                <span className="text-sm font-semibold">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* 3. Right Column: Content (Span 8) */}
        <div className="lg:col-span-8">
          {activeTab === "profile" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-12">
              <div>
                <h2 className="text-xl font-semibold text-text-main mb-8">
                  General Profile
                </h2>

                <div className="bg-surface border border-border/80 rounded-4xl p-8">
                  {/* Static Avatar Section */}
                  <div className="flex items-center gap-5 mb-10 pb-8 border-b border-border/50">
                    <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary text-2xl font-black">
                      {getInitials(user.name)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-main leading-tight">
                        {user.name}
                      </h3>
                      <p className="text-sm text-text-muted">{user.email}</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[11px] font-semibold text-text-main uppercase tracking-widest mb-3 block">
                          Display Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={newName}
                          onChange={handleInputChange}
                          className="w-full bg-main/60 border border-border/80 rounded-xl px-4 py-3 text-sm text-text-main focus:outline-none focus:border-primary/50 focus:shadow-[0_0_0_1px_rgba(var(--color-primary),0.2)] transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-text-main mb-3 uppercase tracking-widest block">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={user.email}
                          readOnly
                          disabled
                          className="w-full bg-main/60 border border-border/50 rounded-xl px-4 py-3 text-sm text-text-muted cursor-not-allowed opacity-90 focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 pt-6 border-t border-border/50 flex justify-end">
                    <button
                      className={`px-6 py-3 text-main flex align-center gap-2 text-sm font-semibold rounded-xl transition-all duration-300 ${isChanging ? "cursor-not-allowed bg-text-muted/80" : "cursor-pointer bg-text-main/90 hover:bg-text-main hover:-translate-y-0.5 hover:shadow-lg"}`}
                      onClick={handleNameChange}
                      disabled={isChanging}
                    >
                      {isChanging && (
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
                          className="animate-spin"
                        >
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                      )}
                      <span className="align-middle">Save Changes</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Saved Resume Card */}
              <div>
                <h2 className="text-xl font-semibold text-text-main mb-8">
                  Saved Resume
                </h2>

                <div className="bg-surface border border-border/80 rounded-4xl p-8">
                  <p className="text-sm text-text-muted mb-6">
                    This resume is used as your default baseline for fast Tarob
                    and Rezer analysis.
                  </p>

                  {user?.defaultResume?.fileName ? (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-border/60 bg-main/70 hover:border-primary/40 transition-colors">
                      <div className="flex items-center gap-4 overflow-hidden">
                        <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <Icons.FileReady className="w-6 h-6" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-text-main truncate">
                            {user.defaultResume.fileName}
                          </p>
                          <p className="text-xs text-text-muted mt-0.5">
                            Current Saved Resume
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          onClick={handleViewResume}
                          className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-primary-hover transition-colors cursor-pointer"
                        >
                          View Resume
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 px-4 border border-dashed border-border/60 rounded-2xl bg-surface/30">
                      <Icons.FileReady className="w-8 h-8 text-text-muted/50 mb-3" />
                      <p className="text-sm font-medium text-text-main mb-1">
                        No saved resume found
                      </p>
                      <p className="text-xs text-text-muted text-center max-w-sm">
                        Run your first analysis in Tarob or Rezer to
                        automatically save your resume baseline.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-semibold text-text-main mb-8">
                Appearance
              </h2>

              <div className="bg-surface border border-border/80 rounded-4xl p-8">
                <div className="mb-8">
                  <label className="text-[11px] font-semibold text-text-main uppercase tracking-widest mb-2 block">
                    Interface Theme
                  </label>
                  <p className="text-sm text-text-muted font-light mb-6">
                    Select or customize your UI theme.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* System Theme Card */}
                    <button
                      onClick={() => setTheme("system")}
                      className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-300 ${theme === "system" ? "border-primary bg-primary/5" : "border-border/60 hover:border-text-muted/40"}`}
                    >
                      <div className="w-12 h-12 rounded-full bg-main border border-border flex items-center justify-center mb-3">
                        <Icons.Monitor
                          className={`w-5 h-5 ${theme === "system" ? "text-primary" : "text-text-muted"}`}
                        />
                      </div>
                      <span className="text-sm font-semibold text-text-main">
                        System
                      </span>
                    </button>

                    {/* Light Theme Card */}
                    <button
                      onClick={() => setTheme("light")}
                      className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-300 ${theme === "light" ? "border-primary bg-primary/5" : "border-border/60 hover:border-text-muted/40"}`}
                    >
                      <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-3 shadow-sm">
                        <Icons.Sun className="w-5 h-5 text-gray-800" />
                      </div>
                      <span className="text-sm font-semibold text-text-main">
                        Light
                      </span>
                    </button>

                    {/* Dark Theme Card */}
                    <button
                      onClick={() => setTheme("dark")}
                      className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-300 ${theme === "dark" ? "border-primary bg-primary/5" : "border-border/60 hover:border-text-muted/40"}`}
                    >
                      <div className="w-12 h-12 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center mb-3 shadow-sm">
                        <Icons.Moon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-text-main">
                        Dark
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-semibold text-text-main mb-8">
                Security
              </h2>

              <div className="bg-surface border border-border/80 rounded-4xl p-8">
                <h3 className="text-sm font-semibold text-text-main mb-1">
                  Change Password
                </h3>
                <p className="text-xs text-text-muted mb-6">
                  Ensure your account is using a long, random password to stay
                  secure.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="Current Password"
                      className="w-full bg-main/60 border border-border/80 rounded-xl px-4 py-3 pr-11 text-sm text-text-main focus:outline-none focus:border-primary/50 focus:shadow-[0_0_0_1px_rgba(var(--color-primary),0.2)] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main transition-colors cursor-pointer"
                      aria-label={
                        showCurrentPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showCurrentPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  <div>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        placeholder="New Password"
                        className="w-full bg-main/60 border border-border/80 rounded-xl px-4 py-3 pr-11 text-sm text-text-main focus:outline-none focus:border-primary/50 focus:shadow-[0_0_0_1px_rgba(var(--color-primary),0.2)] transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main transition-colors cursor-pointer"
                        aria-label={
                          showNewPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showNewPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>

                    {/* Strength indicator */}
                    {passwordData.newPassword && (
                      <div className="mt-3 space-y-1.5">
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
                        <p
                          className="text-xs font-medium"
                          style={{ color: passwordStrength.color }}
                        >
                          {passwordStrength.label}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <button className={`px-6 py-3 text-main flex align-center gap-2 text-sm font-semibold rounded-xl transition-all duration-300 ${isChanging ? "cursor-not-allowed bg-text-muted/80" : "cursor-pointer bg-text-main/90 hover:bg-text-main hover:-translate-y-0.5 hover:shadow-lg"}`}
                  onClick={changePasswordHandler}
                  disabled={isChanging}
                >
                      {isChanging && (
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
                          className="animate-spin"
                        >
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                      )}
                  Update Password
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* View Resume Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-surface border border-border/80 rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden relative">
            <div className="flex justify-between items-center px-6 py-4 border-b border-border/50 bg-surface">
              <h3 className="font-semibold text-text-main flex items-center gap-2">
                <Icons.FileReady className="w-5 h-5 text-primary" />
                Resume Preview
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-text-muted hover:text-text-main p-1 rounded-md hover:bg-main/50 transition-colors"
              >
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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 w-full bg-main/50 relative flex items-center justify-center overflow-hidden">
              {loadingPdf ? (
                <div className="flex flex-col items-center justify-center gap-3">
                  <svg
                    className="w-8 h-8 text-primary animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span className="text-sm text-text-muted font-medium">
                    Loading PDF...
                  </span>
                </div>
              ) : pdfUrl ? (
                <iframe
                  src={pdfUrl}
                  className="w-full h-full border-none"
                  title="Resume Preview"
                />
              ) : (
                <div className="text-text-muted text-sm">
                  Failed to load resume.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
