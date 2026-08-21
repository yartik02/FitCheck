import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import Loading from "./components/Loading";
import RezerResults from "./components/RezerResults";
import {
  rezer,
  fileReadyIcon,
  uploadIcon,
  replaceIcon,
  saveIcon,
  pasteIcon,
  arrowRightIcon,
  resetIcon,
  crossIcon,
  checkIcon,
} from "../../../utils/Icons";
import { useToast } from "../../../utils/useToast";

// 1. STATIC DATA
// const RECENT_HISTORY = [
//   {
//     id: "h1",
//     role: "Frontend Engineer",
//     resumeName: "yartik_FE_resume_v2.pdf",
//     company: "Linear",
//     date: "2h ago",
//     score: 85,
//   },
//   {
//     id: "h2",
//     role: "Fullstack Dev",
//     resumeName: "yartik_MERN_resume_v3.pdf",
//     company: "Vercel",
//     date: "1d ago",
//     score: 64,
//   },
// ];

const LOADING_STEPS = [
  "Parsing PDF document structure...",
  "Extracting semantic nodes...",
  "Mapping job description parameters...",
  "Executing vector similarity search...",
  "Finalizing diagnostic report...",
];

// 2. REUSABLE UI ICONS
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
  Upload: ({ className }) => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {uploadIcon}
    </svg>
  ),
  Replace: ({ className }) => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {replaceIcon}
    </svg>
  ),
  Save: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {saveIcon}
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
};

// 3. MAIN COMPONENT
export default function Rezer() {
  const { user, setUser, recent2rezerScans } = useAuth();
  const toast = useToast();
  const [view, setView] = useState("input"); // 'input' | 'loading' | 'results'
  const [file, setFile] = useState(null);
  const [jdText, setJdText] = useState("");
  const [loadingStep, setLoadingStep] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalyze = async () => {
    if (!file || !jdText.trim()) return;

    setView("loading");
    setLoadingStep(0);

    const LAST_WAITING_STEP = 4;
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep += 1;
      if (currentStep >= LAST_WAITING_STEP) {
        clearInterval(interval);
        setLoadingStep(LAST_WAITING_STEP);
        return;
      }
      setLoadingStep(currentStep);
    }, 600);

    try {
      const payload = {
        jobDes: jdText,
        userId: user._id,
      };

      if (file.isSaved) {
        payload.useSavedResume = "true";
      } else {
        payload.resume = file;
      }

      const uploadData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        uploadData.append(key, value);
      });

      console.log("data:", Object.fromEntries(uploadData.entries()));

      const response = await fetch(
        `${import.meta.env.VITE_BASE_API}/user/analysis/rezer/newAnalysis`,
        {
          method: "POST",
          credentials: "include",
          body: uploadData,
        },
      );

      clearInterval(interval);

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Analysis failed");
      }

      const data = await response.json();

      if (!file.isSaved) {
        setUser((prev) => ({
          ...prev,
          defaultResume: {
            url: data.analysis.resumeUrl,
            fileName: file.name,
          },
        }));
      }

      // Flash "all complete" state briefly before showing results
      setLoadingStep(5);
      await new Promise((r) => setTimeout(r, 400));

      setAnalysisResult(data.analysis);
      setView("results");
    } catch (err) {
      clearInterval(interval);
      console.error("Analysis error:", err);
      toast.error(err.message || "Something went wrong. Please try again.");
      setView("input");
    }
  };

  const resetForm = () => {
    setFile(null);
    setJdText("");
    setView("input");
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setJdText(text);
    } catch (err) {
      toast.error("Failed to read clipboard", err);
    }
  };

  // VIEW 1: TACTILE WORKSPACE
  if (view === "input") {
    return (
      <div className="max-w-6xl mx-auto pr-4 sm:pr-6 lg:pr-8 py-8 lg:py-10 w-full animate-in fade-in duration-700">
        {/* Error Banner */}
        {/* {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-between">
            <p className="text-sm text-red-400">{error}</p>
            <button
              onClick={() => setError(null)}
              className="text-red-400 hover:text-red-300 ml-4"
            >
              <Icons.Cross className="w-4 h-4" />
            </button>
          </div>
        )} */}
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary"></div>
            <p className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] flex align-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                {rezer}
              </svg>
              <span className="text-center">Rezer Engine</span>
            </p>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-text-main tracking-tight mb-2">
            Diagnostic Workspace with{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-text-muted to-primary">
              REZER
            </span>
          </h1>
          <h3 className="text-3xl md:text-4xl font-medium text-text-main tracking-tight mb-6">
            Check your resume against any job.
          </h3>
          <p className="text-lg text-text-muted font-light max-w-4xl leading-relaxed">
            Configure your inputs. We will map your technical footprint against
            the target role and identify critical rejection points before you
            apply.
          </p>
        </div>

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-12">
          {/* Left Column: File Upload */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] font-semibold text-text-main uppercase tracking-widest">
                01. Resume PDF File
              </p>
              {file && (
                <button
                  onClick={() => setFile(null)}
                  className="text-[10px] font-medium text-text-muted hover:text-score-low transition-colors uppercase tracking-wider relative z-40 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="relative group flex-1 min-h-70">
              <input
                type="file"
                accept=".pdf"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
                onChange={(e) => setFile(e.target.files[0])}
              />

              {file ? (
                <div className="h-full flex flex-col items-center justify-center border border-primary/30 bg-primary/2 rounded-3xl p-8 text-center transition-all relative overflow-hidden shadow-[inset_0_0_20px_rgba(var(--color-primary),0.02)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,var(--color-primary)_0%,transparent_70%)] opacity-10"></div>

                  <div className="w-14 h-14 rounded-2xl text-primary bg-surface border border-border/80 flex items-center justify-center mb-5 shadow-sm relative z-10">
                    <Icons.FileReady className="w-6 h-6" />
                  </div>

                  <p className="font-medium text-text-main text-sm truncate w-full px-4 relative z-10">
                    {file.name}
                  </p>

                  <div className="flex items-center gap-2 mt-4 bg-surface border border-border/60 px-3 py-1.5 rounded-full relative z-10 shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] text-text-main font-medium uppercase tracking-wider">
                      Ready for extraction
                    </span>
                  </div>

                  <div className="absolute w-50 h-50 m-auto inset-0 bg-main/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 pointer-events-none">
                    <div className="flex items-center gap-2 bg-surface px-4 py-2.5 rounded-full border border-border shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Icons.Replace className="w-4 h-4 text-text-main" />
                      <span className="text-xs font-bold text-text-main">
                        Click to replace
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-border/60 group-hover:border-primary/40 bg-surface group-hover:bg-primary/10 rounded-3xl p-8 text-center transition-all duration-300">
                  <div className="w-14 h-14 rounded-full border border-border/80 bg-main flex items-center justify-center text-text-muted mb-5 group-hover:scale-110 group-hover:border-primary/30 group-hover:text-primary group-hover:shadow-[0_0_15px_rgba(var(--color-primary),0.1)] transition-all duration-500">
                    <Icons.Upload className="w-6 h-6" />
                  </div>
                  <p className="font-medium text-text-main text-sm">
                    Upload Resume PDF
                  </p>
                  <p className="text-[11px] text-text-muted mt-2">
                    Drag & drop or click to browse
                  </p>
                </div>
              )}
            </div>

            {!file && (
              <div className="relative group/tooltip mt-4 inline-block w-full">
                <button
                  disabled={!user?.defaultResume?.fileName}
                  onClick={() =>
                    setFile({
                      name: user.defaultResume.fileName,
                      isSaved: true,
                    })
                  }
                  className={`w-full text-[12px] font-medium text-left flex items-center justify-between transition-colors border border-transparent px-3 py-2.5 rounded-xl group/btn ${
                    user?.defaultResume?.fileName
                      ? "text-text-muted hover:text-text-main hover:border-border/50 hover:bg-surface/30 cursor-pointer"
                      : "text-text-muted/40 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icons.Save
                      className={`w-4 h-4 ${!user?.defaultResume?.fileName ? "opacity-40" : ""}`}
                    />
                    {user?.defaultResume?.fileName
                      ? "Use saved:"
                      : "Use saved resume"}
                    {user?.defaultResume?.fileName && (
                      <span className="font-mono text-text-main truncate max-w-50">
                        {user.defaultResume.fileName}
                      </span>
                    )}
                  </div>
                  {user?.defaultResume?.fileName && (
                    <span className="opacity-0 group-hover/btn:opacity-100 transition-opacity text-text-muted">
                      &rarr;
                    </span>
                  )}
                </button>

                {/* Tooltip for new users */}
                {!user?.defaultResume?.fileName && (
                  <div className="absolute left-1/2 -bottom-2 translate-y-full -translate-x-1/2 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap bg-surface border border-border px-3 py-2 rounded-lg shadow-lg text-[10px] text-text-muted uppercase tracking-wider">
                    You are new! Analyze at least one time to use this.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: JD Input */}
          <div className="lg:col-span-7 flex flex-col">
            <p className="text-[11px] font-semibold text-text-main uppercase tracking-widest mb-4">
              02. Target Parameters
            </p>

            <div className="relative flex-1 group flex flex-col rounded-3xl overflow-hidden border border-border/80 bg-surface focus-within:border-primary/50 focus-within:shadow-[0_0_0_1px_rgba(var(--color-primary),0.2)] transition-all duration-300">
              <div className="h-10 bg-main/50 border-b border-border/50 flex items-center justify-between px-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-border/80 group-hover:bg-score-low/60 group-focus-within:bg-score-low/60 transition-colors"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-border/80 group-hover:bg-score-medium/60 group-focus-within:bg-score-medium/60 transition-colors"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-border/80 group-hover:bg-score-high/60 group-focus-within:bg-score-high/60 transition-colors"></div>
                </div>

                <div className="flex gap-3">
                  <div className="flex items-center border-r-2 border-border pe-4 gap-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${jdText.length > 50 ? "bg-primary shadow-[0_0_8px_rgba(var(--color-primary),0.5)]" : "bg-border"}`}
                    ></span>
                    <span
                      className={`text-[10px] font-mono transition-colors ${jdText.length > 50 ? "text-text-main" : "text-text-muted"}`}
                    >
                      {jdText.length} chars
                    </span>
                  </div>
                  <button
                    onClick={handlePaste}
                    className="text-[10px] font-bold text-text-muted hover:text-text-main uppercase tracking-wider flex items-center gap-1.5 px-2 py-1 rounded hover:bg-surface transition-colors cursor-pointer"
                  >
                    <Icons.Paste className="w-3 h-3" />
                    Paste JD
                  </button>
                </div>
              </div>

              <textarea
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                placeholder="Paste the target job description here. Include the requirements and responsibilities for highest accuracy..."
                className="w-full h-full min-h-60 resize-none bg-transparent p-6 text-sm text-text-main placeholder:text-text-muted/40 focus:outline-none leading-loose"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Action Row & History */}
        <div className="flex flex-col-reverse md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
              Recent 2 Scans
            </span>
            <div className="flex flex-wrap gap-3">
              {recent2rezerScans.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-3 py-1.5 rounded-full border border-border/60 hover:border-text-muted/50 hover:bg-surface/50 transition-colors"
                >
                  <span className="text-[11px] font-medium text-text-main">
                    {item.resumeFileName}
                  </span>
                  <span className="w-px h-3 bg-border"></span>
                  <span className="text-[10px] font-mono text-text-muted">
                    {item.score}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!file || jdText.length < 50}
            className="w-full md:w-auto px-10 py-4 rounded-xl bg-text-main text-surface font-medium text-sm shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 disabled:opacity-40 disabled:pointer-events-none disabled:transform-none transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
          >
            Execute Diagnostics
            <Icons.ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // VIEW 2: TERMINAL LOADING STATE
  if (view === "loading") {
    return (
      <Loading 
        loadingStep={loadingStep} 
        steps={LOADING_STEPS} 
        title="Rezer.exe // Process Active" 
        theme="rezer" 
      />
    );
  }

  // VIEW 3: EDITORIAL RESULTS
  return <RezerResults analysisResult={analysisResult} resetForm={resetForm} />;
}
