import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../utils/useToast.jsx";

export default function Logout() {
  const navigate = useNavigate();
  const { LogoutUser } = useAuth();
  const hasLoggedOut = useRef(false);
  const toast = useToast();

  useEffect(() => {
    if (!hasLoggedOut.current) {
      LogoutUser();
      toast.success("Logged out successfully!");

    //   navigate("/");
      hasLoggedOut.current = true;
    }
  }, [LogoutUser, navigate]);

  return null;
}