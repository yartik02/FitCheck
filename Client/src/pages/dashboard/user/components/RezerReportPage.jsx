import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import RezerResults from "./RezerResults";

export default function RezerReportPage({ setOpenLogDetails }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [analysisRecord, setAnalysisRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchAnalysisDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${import.meta.env.VITE_BASE_API}/user/analysis/rezer/analysis-details/${id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch analysis details");
        }

        const data = await response.json();

        if (isMounted) {
          setAnalysisRecord(data.details || null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Something went wrong while loading the report.");
          setAnalysisRecord(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchAnalysisDetails();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleClose = () => {
    if (typeof setOpenLogDetails === "function") {
      setOpenLogDetails(false);
      return;
    }

    if (user?.name) {
      navigate(`/dashboard/user/${user.name}/history`);
      return;
    }

    navigate(-1);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center px-4">
        <div className="w-full max-w-xl rounded-3xl border border-border/60 bg-surface p-8 text-center shadow-2xl">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-lg font-medium text-text-main">Loading analysis report...</p>
        </div>
      </div>
    );
  }

  if (!id || !analysisRecord || error) {
    return (
      <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center px-4">
        <div className="w-full max-w-xl rounded-3xl border border-border/60 bg-surface p-8 text-center shadow-2xl">
          <p className="text-lg font-medium text-text-main mb-1">
            {error ? "Report failed to load" : "Report not found"}
          </p>
          <p className="text-sm text-text-muted font-light">
            {error || "This analysis report may have been removed or doesn't exist."}
          </p>
          <button
            onClick={handleClose}
            className="mt-6 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover cursor-pointer"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-main overflow-y-auto">
        <RezerResults
          analysisResult={analysisRecord}
          resetForm={handleClose}
          isHistoryReport={true}
        />
    </div>
  );
}
