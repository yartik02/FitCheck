import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Logo from "../assets/FitCheckLogoNew.svg";
import { useTheme } from "../utils/useTheme.jsx";
import { light, dark, hamburger, closeIcon } from "../utils/Icons.jsx";

const getInitials = (name) => {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export default function Navbar() {
  const { user } = useAuth();
  const isLoggedIn = !!user;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    setDropdownOpen(false);
    navigate("/logout");
  };

  const navLinks = [
    { name: "Home", path: "/", mobileOnly: true },
    { name: "Products", path: "/products" },
    ...(isLoggedIn
      ? [{ name: "Dashboard", path: `/dashboard/user/${user?.name}` }]
      : []),
  ];

  const renderThemeToggle = (isMobile = false) => (
    <button
      className={
        isMobile
          ? "flex gap-2 items-center text-xl font-light text-text-muted hover:text-text-main transition-all"
          : "p-2 rounded-full bg-gray-400/20 hover:bg-gray-400/40 transition-all cursor-pointer"
      }
      onClick={toggleTheme}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={isMobile ? "w-8 h-8" : "w-6 h-6"}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={isMobile ? "1.5" : "2"}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {theme === "light" ? dark : light}
      </svg>
      {isMobile && `Switch to ${theme === "light" ? "Dark" : "Light"} Theme`}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 w-full h-20 bg-main/10 backdrop-blur-lg transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img src={Logo} alt="Logo" className="w-12 h-12" />
          <span className="font-bold text-2xl sm:text-4xl tracking-tight text-text-main">
            Fit<span className="text-primary">Check</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          {navLinks
            .filter((link) => !link.mobileOnly)
            .map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm transition-colors ${
                  location.pathname === link.path
                    ? "text-primary font-semibold"
                    : "text-text-muted hover:text-text-main font-medium"
                }`}
              >
                {link.name}
              </Link>
            ))}

          {isLoggedIn ? (
            <div className="relative ml-2">
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-primary-muted border border-border text-primary font-semibold text-xl hover:ring-2 hover:ring-primary/40 focus:outline-none transition-all"
              >
                {getInitials(user?.name)}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg bg-surface border border-border shadow-lg py-1 z-50 text-sm origin-top-right transition-all animate-in fade-in scale-95 duration-200">
                  <div className="px-4 py-2.5 border-b border-border">
                    <p className="font-medium text-text-main truncate">
                      {user?.name}
                    </p>
                    <p className="text-xs text-text-muted truncate">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-main transition-colors font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-md font-medium text-text-muted hover:text-text-main transition-colors px-3 py-2"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="text-md font-medium border-2 border-primary bg-primary text-white hover:bg-primary/30 active:scale-[0.9] hover:text-primary px-4 py-2 rounded-lg transition-all shadow-sm"
              >
                Sign Up
              </Link>
            </>
          )}
          {renderThemeToggle()}
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 rounded-lg text-text-main hover:bg-gray-400/20 transition-colors cursor-pointer"
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
            {hamburger}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Drawer (Always mounted for exit animation) */}
      <div
        className={`md:hidden fixed top-0 left-0 w-screen h-screen bg-main z-40 px-6 py-10 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.4,1,0.2,1)] ${
          mobileMenuOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <button
          className="absolute top-4 right-4 text-text-muted hover:text-text-main p-1 rounded-xl hover:bg-gray-300/20 cursor-pointer transition-colors"
          onClick={() => setMobileMenuOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6.5 h-6.5"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {closeIcon}
          </svg>
        </button>

        <div className="flex flex-col justify-between h-full gap-6 text-2xl font-semibold mt-8">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`transition-all duration-300 transform ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-text-muted hover:text-text-main"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-5 pb-10">
            {renderThemeToggle(true)}
            {isLoggedIn ? (
              <>
                <div className="p-3 px-5 bg-gray-300/20 rounded-xl">
                  <p className="font-medium text-text-main text-lg">
                    {user?.name}
                  </p>
                  <p className="text-sm text-text-muted font-normal">
                    {user?.email}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-center font-medium border-2 border-score-low/40 bg-score-low/70 text-white hover:bg-score-low/30 hover:text-score-low px-4 py-2.5 rounded-lg transition-all cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center text-text-muted hover:text-text-main px-3 py-2.5 rounded-lg hover:bg-gray-300/20 transition-colors cursor-pointer"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center font-medium border-2 border-primary bg-primary text-white hover:bg-primary/30 hover:text-primary px-4 py-2.5 rounded-lg transition-all cursor-pointer"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
