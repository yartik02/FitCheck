import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Logo from "../assets/FitCheckLogoNew.svg";
import { useTheme } from "../utils/useTheme.jsx";
import { light, dark, hamburger, closeIcon } from "../utils/Icons.jsx";

// const user = {
//   id: "user_1",
//   name: "Yartik",
//   email: "yartik@example.com",
// };

export default function Navbar() {
  const { user, isAuthenticated } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [location.pathname, mobileMenuOpen]);

  const handleLogout = () => {
    setDropdownOpen(false);
    navigate("/logout");
  };

  // Helper to extract initials (e.g. "Yartik" -> "Y", "Yartik Sharma" -> "YS")
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full h-20 bg-main/10 backdrop-blur-lg transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-12 h-12 flex items-center justify-center">
              <img src={Logo} alt="Logo" />
            </div>
            <span className="font-bold text-2xl sm:text-4xl tracking-tight text-text-main">
              Fit<span className="text-primary">Check</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {/* Dashboard / History Link */}
                <Link
                  to={`/dashboard/user/${user?.name}`}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === `/dashboard/user/${user?.name}`
                      ? "text-primary font-semibold"
                      : "text-text-muted hover:text-text-main"
                  }`}
                >
                  Dashboard
                </Link>
                
                {/* User Menu Dropdown */}
                <div className="relative ml-2" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-primary-muted border border-border text-primary font-semibold text-xl hover:ring-2 hover:ring-primary/40 focus:outline-none transition-all"
                    aria-expanded={dropdownOpen}
                    aria-label="User menu"
                  >
                    {getInitials(user?.name)}
                  </button>

                  {/* Dropdown Menu Box */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-lg bg-surface border border-border shadow-lg py-1 z-50 text-sm">
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
              </>
            ) : (
              <>
                {/* Unauthenticated Actions */}
                <Link
                  to="/products"
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === `/products`
                      ? "text-primary font-semibold"
                      : "text-text-muted hover:text-text-main"
                  }`}
                >
                  Products
                </Link>

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

            <span className="my-auto">
              <p
                className="flex align-center m-0 p-2 rounded-circle rounded-full bg-gray-400/20 hover:bg-gray-400/40 transition-all"
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
          </nav>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <p
              className="flex align-center m-0 p-2 rounded-full bg-gray-400/20 hover:bg-gray-400/40 transition-all"
              role="button"
              onClick={toggleTheme}
              style={{ cursor: "pointer", height: "fit-content" }}
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
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
                {theme === "light" ? dark : light}
              </svg>
            </p>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-text-main hover:bg-gray-400/20 transition-colors"
              aria-label="Toggle menu"
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
                {mobileMenuOpen ? closeIcon : hamburger}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-main/95 backdrop-blur-lg">
          <div className="px-4 py-4 space-y-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`block text-sm font-medium px-3 py-2.5 rounded-lg transition-colors ${
                    location.pathname === "/dashboard"
                      ? "text-primary bg-primary-muted"
                      : "text-text-muted hover:text-text-main hover:bg-surface"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/analyzer"
                  className={`block text-sm font-medium px-3 py-2.5 rounded-lg transition-colors ${
                    location.pathname === "/analyzer"
                      ? "bg-primary text-white"
                      : "bg-primary-muted text-primary hover:bg-primary/20"
                  }`}
                >
                  New Analysis
                </Link>
                <div className="border-t border-border pt-3 mt-3">
                  <div className="px-3 py-2">
                    <p className="font-medium text-text-main text-sm">
                      {user?.name}
                    </p>
                    <p className="text-xs text-text-muted">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2.5 text-red-500 hover:bg-surface rounded-lg transition-colors text-sm font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-sm font-medium text-text-muted hover:text-text-main px-3 py-2.5 rounded-lg hover:bg-surface transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="block text-sm text-center font-medium border-2 border-primary bg-primary text-white hover:bg-primary/30 hover:text-primary px-4 py-2.5 rounded-lg transition-all"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
