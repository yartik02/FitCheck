import { useState } from "react";
import { Link } from "react-router-dom";
import {
  arrowRightIcon,
  resetIcon,
  crossIcon,
  checkIcon,
  fileReadyIcon,
  pasteIcon,
  chevronDownIcon,
} from "../../../../utils/Icons";

const Icons = {
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
  Paste: ({ className }) => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {pasteIcon}
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
  Reset: ({ className }) => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {resetIcon}
    </svg>
  ),
  Cross: ({ className }) => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {crossIcon}
    </svg>
  ),
  Check: ({ className }) => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {checkIcon}
    </svg>
  ),
  ChevronDown: ({ className }) => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {chevronDownIcon || <path d="M6 9l6 6 6-6" />}
    </svg>
  ),
  CheckCircle: ({ className }) => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Copy: ({ className }) => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  ),
};

export default function RezerResults({
  analysisResult: record,
  resetForm,
  isHistoryReport = false,
}) {
  const [showAllMatching, setShowAllMatching] = useState(false);
  const [showAllMissing, setShowAllMissing] = useState(false);
  const [showJd, setShowJd] = useState(false);
  const [jdCopied, setJdCopied] = useState(false);

  // Safely extract the inner analysis data
  const resultData = record?.analysisResult || {};
  const jobDescription =
    record?.jobDescription || "No Job Description provided.";
  const parsedFilename = record.resumeFileName || "Target Resume.pdf";

  const handleCopyJD = () => {
    if (jobDescription) {
      navigator.clipboard.writeText(jobDescription);
      setJdCopied(true);
      setTimeout(() => setJdCopied(false), 2000);
    }
  };

  return (
    <div
      className={`max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-8 duration-700 ${isHistoryReport ? "lg:px-0 py-20 p" : " lg:pr-8 py-8 pr-4 sm:pr-6 lg:py-10"}`}
    >
      {/* Utility Nav */}
      <button
        onClick={resetForm}
        className={`text-[11px] font-semibold text-text-muted hover:text-text-main flex items-center gap-2 transition-colors uppercase tracking-widest cursor-pointer ${isHistoryReport ? "hover:bg-gray-600/30 px-3 py-2 rounded-3xl absolute top-0 left-0 m-5 transition-all duration-200" : "mb-6"}`}
      >
        <Icons.Reset className="w-3.5 h-3.5" />
        {isHistoryReport ? "Go Back" : "Reset Engine"}
      </button>

      {/* Input Context Row */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Resume Pill */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface/50 border border-border/40 min-w-48 shadow-sm">
          <Icons.FileReady className="w-4 h-4 text-text-muted shrink-0" />
          <span
            className="text-sm font-medium text-text-main truncate max-w-50"
            title={parsedFilename}
          >
            {parsedFilename}
          </span>
        </div>

        {/* JD Pill / Trigger */}
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-surface/50 border flex-1 min-w-0 cursor-pointer hover:bg-surface/80 transition-colors shadow-sm group ${showJd ? "border-primary/50 hover:border-primary/80" : "border-border/40 hover:border-border/80"}`}
          onClick={() => setShowJd(!showJd)}
        >
          <Icons.Paste className="w-4 h-4 text-text-muted shrink-0" />
          <span className="text-sm font-light text-text-muted truncate flex-1 min-w-0">
            {jobDescription}
          </span>
          <span className="ml-auto text-[10px] uppercase tracking-widest text-text-muted flex gap-1 font-bold group-hover:text-text-main transition-colors pl-2 shrink-0">
            {showJd ? "Hide JD" : "View JD"}
            <Icons.ChevronDown
              className={`w-3 h-3 my-auto transition-transform duration-300 ${showJd ? "rotate-180" : ""}`}
            />
          </span>
        </div>
      </div>

      {/* Expandable JD Area */}
      {showJd && (
        <div className="mt-4 mb-8 relative bg-surface/40 border border-border/80 rounded-xl px-5 py-4 max-h-48 overflow-y-auto shadow-inner animate-in fade-in slide-in-from-top-2 group">
          <button
            onClick={handleCopyJD}
            className="absolute top-2 right-2 p-2 bg-surface/80 hover:bg-main border border-border/80 rounded-lg text-text-muted hover:text-text-main transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 flex items-center justify-center shadow-sm"
            title="Copy Job Description"
          >
            {jdCopied ? (
              <Icons.CheckCircle className="w-4 h-4 text-tarob-green" />
            ) : (
              <Icons.Copy className="w-4 h-4" />
            )}
          </button>
          <p className="text-xs text-text-muted leading-relaxed font-mono whitespace-pre-wrap pr-8">
            {jobDescription}
          </p>
        </div>
      )}

      {/* 1. Score + Summary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* The Score */}
        <div className="lg:col-span-4 flex flex-col">
          <div className="border border-border/60 bg-surface/80 backdrop-blur-md rounded-3xl p-8 flex flex-col items-center justify-center relative shadow-sm h-full min-h-75 transition-all hover:border-border/80 hover:shadow-md">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-8 absolute top-8">
              ATS Match Score
            </p>
            <div className="relative flex items-center justify-center w-48 h-48 mt-4 group">
              <svg
                className="w-full h-full transform -rotate-90 drop-shadow-md"
                viewBox="0 0 36 36"
              >
                <path
                  className="stroke-border/30"
                  fill="none"
                  strokeWidth="1.5"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="stroke-primary transition-all duration-1000 ease-out animate-in group-hover:stroke-primary-hover"
                  fill="none"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray={`${resultData?.score ?? 0}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center inset-0">
                <span className="text-6xl font-light text-text-main tracking-tighter">
                  {resultData?.score ?? 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="border border-border/60 bg-surface/80 backdrop-blur-md rounded-3xl p-8 lg:p-12 flex flex-col justify-center h-full relative shadow-sm transition-all hover:border-border/80 hover:shadow-md">
            <div className="absolute top-8 left-8 right-8 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
                Executive Summary
              </p>
            </div>
            <h2 className="text-lg lg:text-xl font-light text-text-main leading-relaxed mt-4 italic">
              "{resultData?.feedback}"
            </h2>
          </div>
        </div>
      </div>

      {/* 2. Skills Differentiation Table (2 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Matching Skills */}
        <div className="border border-border/60 bg-surface/80 backdrop-blur-md rounded-3xl p-8 shadow-sm transition-all hover:border-border/80 hover:shadow-md flex flex-col">
          <div className="flex items-center gap-3 mb-8 border-b border-border/40 pb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-score-high "></div>
            <h3 className="text-base font-medium text-text-main">
              Matching Skills
            </h3>
          </div>
          <ul className="space-y-2 grow">
            {(showAllMatching
              ? (resultData?.matchingSkills ?? [])
              : (resultData?.matchingSkills ?? []).slice(0, 5)
            ).map((skill, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 text-text-muted text-base group hover:bg-surface/60 p-2.5 -mx-2.5 rounded-xl transition-all duration-300 cursor-default"
              >
                <div className="w-6 h-6 rounded-full bg-score-high/10 flex items-center justify-center shrink-0 group-hover:bg-score-high/20 transition-colors">
                  <Icons.Check className="w-3.5 h-3.5 text-score-high" />
                </div>
                <span className="font-light text-text-main group-hover:translate-x-1 transition-transform duration-300">
                  {skill}
                </span>
              </li>
            ))}
          </ul>
          {(resultData?.matchingSkills?.length ?? 0) > 5 && (
            <button
              onClick={() => setShowAllMatching(!showAllMatching)}
              className="mt-6 text-sm font-medium text-score-high hover:text-score-high/80 transition-colors text-left cursor-pointer"
            >
              {showAllMatching
                ? "View Less"
                : `View All (${resultData.matchingSkills.length})`}
            </button>
          )}
        </div>

        {/* Missing Skills / Gaps */}
        <div className="border border-border/60 bg-surface/80 backdrop-blur-md rounded-3xl p-8 shadow-sm transition-all hover:border-border/80 hover:shadow-md flex flex-col">
          <div className="flex items-center gap-3 mb-8 border-b border-border/40 pb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-score-low"></div>
            <h3 className="text-base font-medium text-text-main">
              Missing Skills / Gaps
            </h3>
          </div>
          <ul className="space-y-2 grow">
            {(showAllMissing
              ? (resultData?.missingSkills ?? [])
              : (resultData?.missingSkills ?? []).slice(0, 5)
            ).map((skill, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 text-text-main text-base group hover:bg-surface/60 p-2.5 -mx-2.5 rounded-xl transition-all duration-300 cursor-default"
              >
                <div className="w-6 h-6 rounded-full bg-score-low/10 flex items-center justify-center shrink-0 group-hover:bg-score-low/20 transition-colors">
                  <Icons.Cross className="w-3 h-3 text-score-low" />
                </div>
                <span className="font-light group-hover:translate-x-1 transition-transform duration-300">
                  {skill}
                </span>
              </li>
            ))}
          </ul>
          {(resultData?.missingSkills?.length ?? 0) > 5 && (
            <button
              onClick={() => setShowAllMissing(!showAllMissing)}
              className="mt-6 text-sm font-medium text-score-low hover:text-score-low/80 transition-colors text-left cursor-pointer"
            >
              {showAllMissing
                ? "View Less"
                : `View All (${resultData.missingSkills.length})`}
            </button>
          )}
        </div>
      </div>

      {/* 3. Priority Fixes (Full Width) */}
      <div className="border border-border/60 bg-surface/80 backdrop-blur-md rounded-3xl p-8 shadow-sm transition-all hover:border-border/80 hover:shadow-md">
        <div className="flex items-center gap-3 mb-8 border-b border-border/40 pb-4">
          <div className="w-2.5 h-2.5 rounded-full bg-score-medium"></div>
          <h3 className="text-base font-medium text-text-main">
            Priority Fixes
          </h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
          {(resultData?.priorityFixes ?? []).map((fix, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 bg-surface/50 border border-border/50 p-5 rounded-2xl hover:border-score-medium/40 hover:bg-score-medium/10 transition-all duration-300 group cursor-default"
            >
              <span className="shrink-0 w-8 h-8 rounded-full bg-score-medium/10 text-score-medium text-sm font-bold flex items-center justify-center group-hover:bg-score-medium/20 transition-colors mt-0.5">
                {idx + 1}
              </span>
              <p className="font-light text-text-main leading-relaxed text-base pt-1 group-hover:text-text-main transition-colors">
                {fix}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* The Bridge (Tarob CTA) */}
      {/* <div className="mt-16 pt-12 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-sm font-medium text-text-main mb-1">
            Bridge the gap with TarobPrep.
          </p>
          <p className="text-xs text-text-muted">
            Generate a structured curriculum to master your missing
            requirements.
          </p>
        </div>
        <Link
          to="/dashboard/tarob"
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-surface border border-border text-text-main font-medium text-sm hover:border-emerald-500 hover:text-emerald-500 transition-colors flex items-center justify-center gap-3 shadow-sm group"
        >
          Initialize Preparation
          <Icons.ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div> */}
    </div>
  );
}
