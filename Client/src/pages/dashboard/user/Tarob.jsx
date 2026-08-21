import { useState } from "react";
import Loading from "./components/Loading";
import TarobResults from "./components/TarobResults";
import {
  tarob,
  bullseyeIcon,
  fileReadyIcon,
  uploadIcon,
  replaceIcon,
  saveIcon,
  clockIcon,
  pasteIcon,
  arrowRightIcon,
  resetIcon,
  lightningIcon,
  chevronDownIcon,
} from "../../../utils/Icons";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../utils/useToast";

const LOADING_STEPS = [
  "Analyzing resume delta against target JD...",
  "Prioritizing critical skill gaps...",
  "Synthesizing technical mock scenarios...",
  "Aligning behavioral questions to company culture...",
  "Compiling personalized week-by-week curriculum...",
];

const TIMELINE_OPTIONS = [
  { value: "1", label: "1 Week (Crash Course)" },
  { value: "2", label: "2 Weeks" },
  { value: "4", label: "4 Weeks (Recommended)" },
  { value: "6", label: "6 Weeks" },
  { value: "8", label: "8 Weeks (Deep Dive)" },
];

const Icons = {
  Target: ({ className }) => (
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
      {bullseyeIcon}
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
  Clock: ({ className }) => (
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
      {clockIcon}
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
  Lightning: ({ className }) => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {lightningIcon}
    </svg>
  ),
};

// 3. MAIN COMPONENT
export default function TarobPrep() {
  const { user, setUser, recent2tarobScans } = useAuth();
  const toast = useToast();
  const [view, setView] = useState("input"); // 'input' | 'loading' | 'results'
  const [file, setFile] = useState(null);
  const [targetRole, setTargetRole] = useState("");
  const [jdText, setJdText] = useState("");
  const [timeline, setTimeline] = useState("4");
  const [loadingStep, setLoadingStep] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleGenerate = async () => {
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
    }, 800);

    console.log("Tarob data: ", { file, targetRole, jdText, timeline });

    try {
      const payload = {
        jobDes: jdText,
        userId: user._id,
        targetRole: targetRole,
        timeline: timeline,
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
        `${import.meta.env.VITE_BASE_API}/user/analysis/tarobPrep/newAnalysis`,
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
      // await new Promise((r) => setTimeout(r, 400));
      console.log("res data: ", data.analysis);

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
    setTargetRole("");
    setTimeline("4");
    setView("input");
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setJdText(text);
    } catch (err) {
      console.error("Failed to read clipboard", err);
    }
  };

  const isFormValid = file && jdText.length > 50 && targetRole.length > 2;

  if (view === "input") {
    return (
      <div className="max-w-6xl mx-auto pr-4 sm:pr-6 lg:pr-8 py-8 lg:py-10 w-full animate-in fade-in duration-700">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-tarob-green"></div>
            <p className="text-tarob-green font-bold tracking-[0.2em] uppercase text-[10px] flex items-center">
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
                className="mr-1.5 w-3.5 h-3.5"
              >
                {tarob}
              </svg>
              <span>TarobPrep Engine</span>
            </p>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-text-main tracking-tight mb-2">
            Prepare for your target role with{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-text-muted to-tarob-green">
              TAROB PREP&nbsp;
            </span>
          </h1>
          <h3 className="text-3xl md:text-4xl font-medium text-text-main tracking-tight mb-6">
            Build your path to the offer.
          </h3>
          <p className="text-lg text-text-muted font-light max-w-4xl leading-relaxed">
            Provide your target role. We will analyze your skill gaps and
            generate a 4-week execution curriculum, complete with AI technical
            and behavioral mocks.
          </p>
        </div>

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-12">
          {/* Left Column: File Upload */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <label className="text-[11px] font-semibold text-text-main uppercase tracking-widest">
                01. Current Baseline (Resume)
              </label>
              {file && (
                <button
                  onClick={() => setFile(null)}
                  className="text-[10px] font-medium text-text-muted hover:text-score-low transition-colors uppercase tracking-wider relative z-40 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="relative group flex-1 min-h-85">
              <input
                type="file"
                accept=".pdf"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
                onChange={(e) => setFile(e.target.files[0])}
              />

              {file ? (
                <div className="h-full flex flex-col items-center justify-center border border-tarob-green/30 bg-tarob-green/2 rounded-3xl p-8 text-center transition-all relative overflow-hidden shadow-[inset_0_0_20px_rgba(16,185,129,0.02)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,var(--color-emerald-500)_0%,transparent_70%)] opacity-10"></div>

                  <div className="w-14 h-14 rounded-2xl text-tarob-green bg-surface border border-border/80 flex items-center justify-center mb-5 shadow-sm relative z-10">
                    <Icons.FileReady className="w-6 h-6" />
                  </div>

                  <p className="font-medium text-text-main text-sm truncate w-full px-4 relative z-10">
                    {file.name}
                  </p>

                  <div className="flex items-center gap-2 mt-4 bg-surface border border-border/60 px-3 py-1.5 rounded-full relative z-10 shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tarob-green opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-tarob-green"></span>
                    </span>
                    <span className="text-[10px] text-text-main font-medium uppercase tracking-wider">
                      Baseline Captured
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
                <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-border/60 group-hover:border-tarob-green/40 bg-surface group-hover:bg-tarob-green/10 rounded-3xl p-8 text-center transition-all duration-300">
                  <div className="w-14 h-14 rounded-full border border-border/80 bg-main flex items-center justify-center text-text-muted mb-5 group-hover:scale-110 group-hover:border-tarob-green/30 group-hover:text-tarob-green group-hover:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all duration-500">
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
                  className={`w-full text-[12px] mt-4 font-medium text-left flex items-center justify-between transition-colors border border-transparent px-3 py-2.5 rounded-xl group/btn ${
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

          {/* Right Column: JD Input & Target Role */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-6 w-full">
              {/* Target Role Input */}
              <div className="flex-1">
                <label className="text-[11px] font-semibold text-text-main uppercase tracking-widest mb-3 flex items-center h-5">
                  02. Target Role
                </label>
                <div className="relative group flex items-center border border-border/80 rounded-xl bg-surface focus-within:border-tarob-green/50 focus-within:shadow-[0_0_0_1px_rgba(16,185,129,0.2)] transition-all duration-300 overflow-hidden px-4">
                  <Icons.Target className="w-4 h-4 text-text-muted group-focus-within:text-tarob-green transition-colors shrink-0" />
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g. Google SDE 2, Netflix Senior UI Engineer..."
                    className="w-full bg-transparent border-none focus:ring-0 text-sm text-text-main placeholder:text-text-muted/40 py-3 pl-3 outline-none"
                  />
                </div>
              </div>

              {/* Timeline Dropdown Selector */}
              <div className="flex-1">
                <label className="text-[11px] font-semibold text-text-main uppercase tracking-widest mb-3 flex items-center gap-1.5 h-5">
                  <Icons.Clock className="w-3.5 h-3.5 text-text-muted shrink-0" />
                  Timeline Constraint
                </label>
                <div className="relative group flex items-center border border-border/80 rounded-xl bg-surface focus-within:border-tarob-green/50 focus-within:shadow-[0_0_0_1px_rgba(16,185,129,0.2)] transition-all duration-300 overflow-hidden px-2">
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 text-sm text-text-main py-3 px-2 outline-none appearance-none cursor-pointer relative z-10"
                  >
                    {TIMELINE_OPTIONS.map((opt) => (
                      <option
                        key={opt.value}
                        value={opt.value}
                        className="bg-surface text-text-main"
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {/* Custom Dropdown Chevron */}
                  <div className="absolute right-4 pointer-events-none text-text-muted group-focus-within:text-tarob-green transition-colors z-0">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {chevronDownIcon}
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* IDE Style Textarea */}
            <div className="relative flex-1 group flex flex-col rounded-3xl overflow-hidden border border-border/80 bg-surface focus-within:border-tarob-green/50 focus-within:shadow-[0_0_0_1px_rgba(16,185,129,0.2)] transition-all duration-300">
              <div className="h-10 bg-main/50 border-b border-border/50 flex items-center justify-between px-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-border/80 group-hover:bg-score-low/60 group-focus-within:bg-score-low/60 transition-colors"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-border/80 group-hover:bg-score-medium/60 group-focus-within:bg-score-medium/60 transition-colors"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-border/80 group-hover:bg-score-high/60 group-focus-within:bg-tarob-green/60 transition-colors"></div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="border-border border-r-2 pe-4 flex gap-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-colors my-auto duration-300 ${jdText.length > 50 ? "bg-primary shadow-[0_0_8px_rgba(var(--color-primary),0.5)]" : "bg-border"}`}
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
                placeholder="Paste the exact requirements and description of the target role here..."
                className="w-full h-full min-h-48 resize-none bg-transparent p-6 text-sm text-text-main placeholder:text-text-muted/40 focus:outline-none leading-loose"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Action Row & History */}
        <div className="flex flex-col-reverse md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
              Recent 2 Prep Plans
            </span>
            <div className="flex flex-wrap gap-3">
              {recent2tarobScans.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-3 py-1.5 rounded-full border border-border/60 hover:border-text-muted/50 hover:bg-surface/50 transition-colors"
                >
                  <span className="text-[11px] font-medium text-text-main">
                    {item.role}
                  </span>
                  <span className="w-px h-3 bg-border"></span>
                  <span className="text-[10px] font-mono text-tarob-green">
                    {item.timeline}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!isFormValid}
            className="w-full md:w-auto px-10 py-4 rounded-xl bg-text-main text-surface font-medium text-sm shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.2)] hover:bg-emerald-700 hover:text-white hover:-translate-y-0.5 disabled:opacity-40 disabled:pointer-events-none disabled:transform-none transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
          >
            Generate Curriculum
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
        title="Tarob.exe // Generator Active"
        theme="tarob"
      />
    );
  }

  return <TarobResults resultData={analysisResult} resetForm={resetForm} />;
}
