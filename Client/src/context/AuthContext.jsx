import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [allAnalysis, setAllAnalysis] = useState(null);
  const [recent2rezerScans, setRecent2rezerScans] = useState([]);
  const [recent2tarobScans, setRecent2tarobScans] = useState([]);

  const deriveRecentScans = useCallback((analysisData) => {
    const allItems = Array.isArray(analysisData) ? analysisData : [];

    const top2Rezer = [...allItems]
      .filter((item) => item?.type === "rezer")
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 2)
      .map(({ resumeFileName, score }) => ({
        resumeFileName,
        score,
      }));

    const top2Tarob = [...allItems]
      .filter((item) => item?.type === "tarob")
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 2)
      .map(({ role, timeline }) => ({
        role,
        timeline: timeline ? `${timeline} Week` : "N/A",
      }));

    setRecent2rezerScans(top2Rezer);
    setRecent2tarobScans(top2Tarob);
  }, []);

  const fetchAllAnalysis = useCallback(async (userId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API}/user/analysis/history/allAnalysis/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setAllAnalysis(data.allAnalysis);
        deriveRecentScans(data.allAnalysis);
      }
    } catch (error) {
      console.error("Error fetching analysis history:", error);
    }
  }, [deriveRecentScans]);

  useEffect(() => {
    if (allAnalysis) {
      deriveRecentScans(allAnalysis);
    }
  }, [allAnalysis, deriveRecentScans]);

  const userAuthentication = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API}/user/auth/user-details`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
        setIsAuthenticated(true);
        if (data.userData?._id) {
          fetchAllAnalysis(data.userData._id);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error during user authentication:", error);
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  const LogoutUser = useCallback(async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      setUser(null);
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    userAuthentication();
  }, [userAuthentication]);

  const refreshAllAnalysis = useCallback(() => {
    if (user?._id) {
      fetchAllAnalysis(user._id);
    }
  }, [user, fetchAllAnalysis]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      isAuthenticated,
      LogoutUser,
      allAnalysis,
      setAllAnalysis,
      refreshAllAnalysis,
      recent2rezerScans,
      recent2tarobScans,
    }),
    [user, isAuthenticated, LogoutUser, allAnalysis, refreshAllAnalysis, recent2rezerScans, recent2tarobScans],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
