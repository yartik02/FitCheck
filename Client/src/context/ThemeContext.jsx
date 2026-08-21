import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;

    return "system";
  });

  useEffect(() => {
    const applyTheme = (t) => {
      let resolvedTheme = t;
      if (t === "system") {
        resolvedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
      document.documentElement.setAttribute("data-theme", resolvedTheme);
    };

    applyTheme(theme);
    localStorage.setItem("theme", theme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") applyTheme("system");
    };
    mediaQuery.addEventListener("change", handleChange);
    
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      let currentResolved = prevTheme;
      if (prevTheme === "system") {
        currentResolved = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
      return currentResolved === "light" ? "dark" : "light";
    });
  };

  const value = useMemo(() => ({ theme, toggleTheme, setTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
