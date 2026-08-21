import { useState } from "react";
import { Link } from "react-router-dom";
import {
  rezer,
  tarob,
  history,
  calendarIcon,
  arrowRightIcon,
  fileReadyIcon,
} from "../../../utils/Icons";
import { useAuth } from "../../../context/AuthContext";
import RezerReportPage from "./components/RezerReportPage";
import TarobReviewPage from "./components/TarobReviewPage";

const Icons = {
  Calendar: ({ className }) => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {calendarIcon}
    </svg>
  ),
  ArrowRight: ({ className }) => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {arrowRightIcon}
    </svg>
  ),
  Rezer: ({ className }) => (
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
      className={className}
    >
      {rezer}
    </svg>
  ),
  Tarob: ({ className }) => (
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
      className={className}
    >
      {tarob}
    </svg>
  ),
  Document: ({ className }) => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {fileReadyIcon}
    </svg>
  ),
  History: ({ className }) => (
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
      className={className}
    >
      {history}
    </svg>
  ),
};

const getScoreStatus = (score) => {
  if (typeof score !== "number" || Number.isNaN(score)) return "low";
  if (score >= 80) return "high";
  if (score >= 50) return "medium";
  return "low";
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
};

const LogCard = ({ log, user, setOpenLogDetails, setIsRezerClicked }) => {
  if (log.type !== "rezer" && log.type !== "tarob") return null;

  const isRezer = log.type === "rezer";
  const status = isRezer ? getScoreStatus(log.score) : null;
  const isHigh = status === "high";
  const isMed = status === "medium";

  const scoreColor = isHigh
    ? "text-score-high border-score-high/30"
    : isMed
      ? "text-score-medium border-score-medium/30"
      : "text-score-low border-score-low/30";

  const glowColor = isRezer
    ? isHigh
      ? "bg-score-high"
      : isMed
        ? "bg-score-medium"
        : "bg-score-low"
    : "bg-tarob-green";

  const hoverBorderColor = isRezer
    ? "hover:border-primary/40"
    : "hover:border-tarob-green/40";
  const hoverShadowColor = isRezer
    ? "hover:shadow-primary/5"
    : "hover:shadow-emerald-500/5";

  return (
    <div
      className={`relative group bg-surface border border-border/80 rounded-4xl p-6 ${hoverBorderColor} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${hoverShadowColor} flex flex-col justify-between min-h-70 overflow-hidden`}
    >
      {/* Ambient Glow */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 ${glowColor} opacity-5 blur-[50px] rounded-full pointer-events-none group-hover:opacity-10 transition-opacity`}
      ></div>

      <div>
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div
            className={`${isRezer ? "bg-primary/10 border-primary/20 text-primary" : "bg-tarob-green/10 border-tarob-green/20 text-tarob-green"} border p-2.5 rounded-xl shadow-sm group-hover:rotate-30 transition-[rotate] duration-300`}
          >
            {isRezer ? (
              <Icons.Rezer className="w-5 h-5" />
            ) : (
              <Icons.Tarob className="w-5 h-5" />
            )}
          </div>

          {isRezer ? (
            <div
              className={`w-12 h-12 rounded-full border-[3px] flex items-center justify-center font-black text-lg ${scoreColor} shadow-sm bg-surface`}
            >
              {log.score}
            </div>
          ) : (
            <div className="text-right">
              <span className="text-[10px] font-mono text-emerald-600 bg-tarob-green/10 px-2 py-1 rounded border border-tarob-green/20 shadow-sm">
                {log.timeline} {log.timeline == 1 ? "week" : "weeks"} Plan
              </span>
            </div>
          )}
        </div>

        <div className="mb-4 relative z-10">
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">
            {log.companyName}
          </p>
          <h3 className="text-lg font-semibold text-text-main leading-snug truncate">
            {log.role}
          </h3>
        </div>

        {isRezer ? (
          <div className="flex items-center gap-2 text-[11px] text-text-muted font-mono mb-6 bg-main/50 w-fit px-2 py-1 rounded border border-border/50">
            <Icons.Document className="w-3 h-3" />
            {log.resumeFileName}
          </div>
        ) : (
          <div className="mb-6 relative z-10">
            <p className="text-[10px] font-medium text-text-muted uppercase tracking-widest truncate max-w-[70%]">
              {log.summary}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-border/60 pt-4 relative z-10">
        <div className="flex items-center gap-1.5 text-[12px] font-medium text-text-muted uppercase tracking-widest">
          <Icons.Calendar className="w-3.5 h-3.5" />
          {formatDate(log.date)}
        </div>
        <Link
          to={`/dashboard/user/${user.name}/${isRezer ? "rezer/report" : "tarobPrep/review"}/${log.id}`}
          onClick={() => {
            if (log.type === "rezer") {
              setIsRezerClicked(true);
            } else setIsRezerClicked(false);
            setOpenLogDetails(true);
          }}
          className={`text-xs font-bold ${isRezer ? "text-primary hover:text-primary-hover" : "text-tarob-green hover:text-emerald-400"} flex items-center gap-1 transition-colors group/link`}
        >
          {isRezer ? "Report" : "Review"}
          <Icons.ArrowRight className="w-3 h-3 transform group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default function HistoryPage() {
  const { allAnalysis, user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [openLogDetails, setOpenLogDetails] = useState(false);
  const [isRezerClicked, setIsRezerClicked] = useState(false);

  const filteredLogs = allAnalysis.filter(
    (log) => activeTab === "all" || log.type === activeTab,
  );

  return (
    <div className="max-w-6xl mx-auto pr-4 sm:pr-6 lg:pr-8 py-8 lg:py-10 w-full animate-in fade-in duration-700">
      {/* 1. Header Section */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-text-muted"></div>
            <p className="text-text-muted font-bold tracking-[0.2em] uppercase text-[10px] flex items-center">
              <Icons.History className="mr-1 w-3.5 h-3.5" />
              <span>System Logs</span>
            </p>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-text-main tracking-tight mb-4">
            Analysis Archive.
          </h1>
          <p className="text-lg text-text-muted font-light max-w-2xl leading-relaxed">
            Your versioned history of diagnostic scans and preparation
            curriculums. Track your trajectory over time.
          </p>
        </div>
      </div>

      {/* 2. Segmented Filter Control */}
      <div className="mb-12 border-b border-border/60 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div
          className="flex gap-1 bg-surface border border-border/80 rounded-xl p-1"
          style={{ boxShadow: "inset -5px 4px 4px rgb(0 0 0 / 10%)" }}
        >
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-2.5 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${
              activeTab === "all"
                ? "bg-main/90 text-text-main shadow-md"
                : "text-text-muted hover:text-text-main hover:bg-main/50"
            }`}
          >
            All Logs
          </button>

          <button
            onClick={() => setActiveTab("rezer")}
            className={`flex items-center gap-2 px-6 py-2.5 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${
              activeTab === "rezer"
                ? "bg-primary/20 text-primary border border-primary/20 shadow-md"
                : "text-text-muted hover:text-primary hover:bg-primary/5 border border-transparent"
            }`}
          >
            <Icons.Rezer className="w-3.5 h-3.5" />
            Rezer Scans
          </button>

          <button
            onClick={() => setActiveTab("tarob")}
            className={`flex items-center gap-2 px-6 py-2.5 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${
              activeTab === "tarob"
                ? "bg-tarob-green/20 text-tarob-green border border-tarob-green/20 shadow-md"
                : "text-text-muted hover:text-tarob-green hover:bg-tarob-green/5 border border-transparent"
            }`}
          >
            <Icons.Tarob className="w-3.5 h-3.5" />
            Tarob Prep
          </button>
        </div>

        <div className="text-[11px] font-mono text-text-muted flex items-center gap-2 bg-surface border border-border/60 px-3 py-1.5 rounded-full">
          Showing {filteredLogs.length} Records
        </div>
      </div>

      {/* 3. The Logs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredLogs.map((log) => (
          <LogCard
            key={log.id}
            log={log}
            user={user}
            setOpenLogDetails={setOpenLogDetails}
            setIsRezerClicked={setIsRezerClicked}
          />
        ))}
      </div>

      {filteredLogs.length === 0 && (
        <div className="w-full flex flex-col items-center justify-center py-24 text-center bg-surface/30 border border-dashed border-border/80 rounded-4xl">
          <div className="w-16 h-16 rounded-full bg-main border border-border flex items-center justify-center text-text-muted mb-4">
            <Icons.Document className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-medium text-text-main mb-1">
            No logs found
          </h3>
          <p className="text-sm text-text-muted font-light">
            You haven't generated any reports in this category yet.
          </p>
        </div>
      )}

      {openLogDetails &&
        (isRezerClicked ? (
          <RezerReportPage setOpenLogDetails={setOpenLogDetails} />
        ) : (
          <TarobReviewPage setOpenLogDetails={setOpenLogDetails} />
        ))}
    </div>
  );
}
