import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { checkIcon, layersIcon, targetIcon, warningOutlineIcon } from "../utils/Icons";

// --- STATIC DATA EXTRACTED TO PREVENT RE-RENDERS ---

const REZER_FEATURES = [
  {
    title: "Instant Match Scoring",
    description: "A hard 0-100 score based on extracted technical and soft skills.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Keyword Extraction & Fixes",
    description: "Identifies missing keywords and provides rewrite suggestions for your bullet points.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

const TAROBPREP_FEATURES = [
  {
    title: "Target-Role Skill Gap Analysis",
    description: "Prioritized mapping of what you lack to reach your specific goal.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "AI Mock Generation",
    description: "Auto-generated technical & behavioral questions mirroring the company's style.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
];

const PRACTICE_QUESTIONS = [
  {
    id: "Q1",
    text: '"Design a rate limiter for an API gateway handling 500k req/sec."',
  },
  {
    id: "Q2",
    text: '"Explain cache eviction policies. When would you use LFU over LRU?"',
  },
];

// --- REUSABLE COMPONENTS ---

const CheckIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    {checkIcon}
  </svg>
);

export default function ProductsPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-main min-h-screen font-sans selection:bg-primary/20 selection:text-primary overflow-hidden">
      
      {/* 1. THE PLATFORM HERO */}
      <section className="relative pt-32 pb-20 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-linear-to-b from-primary/10 to-transparent blur-[80px] pointer-events-none rounded-full"></div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary bg-surface shadow-sm text-xs font-bold tracking-widest uppercase text-primary mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            {layersIcon}
          </svg>
          The FitCheck Ecosystem
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-black tracking-tighter text-text-main leading-[1.05] mb-8 max-w-4xl">
          One unified platform. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-text-muted to-primary/50">
            Two specialized engines.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-text-muted max-w-3xl font-light leading-relaxed mb-12">
          Your placement journey isn't just about writing a resume. It's about knowing where you stand today, and knowing how to prepare for tomorrow. FitCheck is split into two distinct products to solve both problems securely in one account.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <a href="#rezer" className="group flex items-center gap-3 text-sm font-semibold text-text-main hover:text-primary transition-colors">
            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">1</span>
            Explore Rezer (Diagnostic)
          </a>
          <div className="hidden sm:block w-px h-6 bg-border"></div>
          <a href="#tarobprep" className="group flex items-center gap-3 text-sm font-semibold text-text-main hover:text-emerald-500 transition-colors">
            <span className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">2</span>
            Explore TarobPrep (Preparation)
          </a>
        </div>
      </section>

      {/* 2. REZER: THE DIAGNOSTIC PRODUCT */}
      <section id="rezer" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-20">
        <div className="bg-linear-to-br from-surface to-primary/50 border border-border rounded-4xl p-8 lg:p-16 shadow-sm flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-125 h-125 bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="flex-1 w-full relative z-10">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-primary">Product 01</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-text-main mb-6">Rezer.</h2>
            <p className="text-lg text-text-muted font-light leading-relaxed mb-8">
              <strong className="text-text-main font-medium">The Core Diagnostic Engine.</strong> Rezer answers the immediate question: "How well do I fit this specific job?" Paste a JD, upload your resume, and get a brutal, line-by-line ATS match analysis.
            </p>

            <div className="space-y-4">
              {REZER_FEATURES.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className={`w-6 h-6 rounded ${feature.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                    <CheckIcon className={`w-3.5 h-3.5 ${feature.color}`} />
                  </div>
                  <div>
                    <p className="text-text-main font-semibold mb-1">{feature.title}</p>
                    <p className="text-sm text-text-muted">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full relative z-10 group">
            <div className="relative z-10 group bg-surface border border-border rounded-2xl p-6 overflow-hidden transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/30">
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                <div className="absolute top-0 left-[-150%] w-[50%] h-full bg-linear-to-r from-transparent via-emerald-500/15 dark:via-white/10 to-transparent skew-x-[-30deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out"></div>
              </div>
              <div className="absolute inset-0 bg-linear-to-br from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <div className="flex justify-between items-center border-b border-border/60 pb-4 mb-6">
                <div>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Analysis Report</p>
                  <p className="text-text-main font-medium">Backend Engineer - Stripe</p>
                </div>
                <div className="flex flex-col items-center gap-3 relative">
                  <svg className="w-22 h-22 transform -rotate-90" viewBox="0 0 36 36">
                    <path className="stroke-border" fill="none" strokeWidth="3" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="stroke-primary" fill="none" strokeWidth="3" strokeLinecap="round" strokeDasharray="72, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                    <p className="text-2xl absolute left-5 top-8 font-bold text-text-main leading-none">72%</p>
                  <div>
                    <p className="text-xs font-bold text-primary uppercase tracking-widest">Match</p>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-xs font-semibold text-text-main mb-2">Missing Capabilities</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-md bg-score-low/10 border border-score-low/20 text-score-low text-xs font-mono font-medium">Kubernetes</span>
                    <span className="px-3 py-1 rounded-md bg-score-low/10 border border-score-low/20 text-score-low text-xs font-mono font-medium">gRPC</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-main border border-border">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Suggested Rewrite</p>
                  <p className="text-sm text-text-main font-medium leading-relaxed">
                    "Designed scalable microservices using <span className="bg-primary/20 text-primary px-1 rounded">Node.js</span> and <span className="bg-primary/20 text-primary px-1 rounded">Docker</span>, increasing API throughput by 40%."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TAROBPREP: THE PREPARATION PRODUCT */}
      <section id="tarobprep" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-20">
        <div className="bg-linear-to-bl from-surface to-score-high/50 border border-border rounded-4xl p-8 lg:p-16 shadow-sm flex flex-col-reverse lg:flex-row items-center gap-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-125 h-125 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="flex-1 w-full relative z-10 group perspective-1000">
            <div className="relative w-full max-w-md mx-auto min-h-120 mt-8 lg:mt-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none transition-opacity duration-700 opacity-50 group-hover:opacity-100 z-0"></div>

              {/* Back Card */}
              <div className="absolute -top-5 -right-10 w-[85%] bg-surface border border-border rounded-2xl p-5 shadow-sm transform transition-all duration-700 group-hover:translate-x-3 group-hover:-translate-y-6 group-hover:scale-1.05 group-hover:rotate-2 opacity-90 hover:opacity-100 z-10">
                <div className="flex justify-between items-center mb-4 border-b border-border/50 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                      <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {targetIcon}
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-none mb-1">Target Role</p>
                      <p className="text-sm font-bold text-text-main leading-none">Google • SDE 2</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 px-2 py-1 rounded font-medium border border-emerald-500/20 shadow-sm">4-Week Plan</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-bold text-text-main uppercase tracking-widest">Curriculum Progress</p>
                    <p className="text-[10px] font-mono text-emerald-500 font-bold">Week 1/4</p>
                  </div>
                  <div className="h-1.5 w-full bg-main border border-border rounded-full overflow-hidden flex">
                    <div className="w-1/4 bg-emerald-500 rounded-full relative">
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Tag */}
              <div className="absolute top-23 -left-2 sm:-left-6 bg-surface border border-border rounded-lg px-3 py-2 shadow-xl transform transition-transform duration-700 group-hover:-translate-x-10 group-hover:-translate-y-8 z-30 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-[10px] font-bold text-text-main uppercase tracking-widest">Added: Behavioral Set</span>
              </div>

              {/* Front Card */}
              <div className="absolute top-28 left-0 w-[92%] bg-surface/90 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-700 group-hover:scale-[1.02] group-hover:-translate-y-2  z-20">
                <div className="px-5 py-4 border-b border-border bg-main/50 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Module 01 • Technical Setup</span>
                  <span className="text-[10px] font-mono text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded shadow-sm">Action Required</span>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="mb-5 p-3 rounded-lg bg-score-low/5 border border-score-low/20 flex items-start gap-3">
                    <svg className="w-4 h-4 text-score-low shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {warningOutlineIcon}
                    </svg>
                    <div>
                      <p className="text-[10px] font-bold text-score-low uppercase tracking-widest mb-1">Priority Gap Identified</p>
                      <p className="text-[11px] sm:text-xs text-text-main font-medium leading-relaxed">
                        Your resume lacks evidence of <span className="font-bold underline decoration-score-low/40 underline-offset-2">Distributed Systems</span> experience, a hard requirement.
                      </p>
                    </div>
                  </div>

                  <h4 className="text-[10px] sm:text-xs font-bold text-text-muted uppercase tracking-widest mb-3">Generated Practice Set</h4>

                  <div className="space-y-3 mb-6">
                    {PRACTICE_QUESTIONS.map((q) => (
                      <div key={q.id} className="flex gap-3 items-start bg-main/50 p-3 rounded-xl border border-border/50">
                        <span className="text-[10px] sm:text-xs font-mono text-emerald-500 font-bold mt-0.5 shrink-0">{q.id}</span>
                        <p className="text-xs sm:text-sm text-text-main font-medium leading-snug">{q.text}</p>
                      </div>
                    ))}
                  </div>

                  <button className="w-full group/btn relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-text-main px-4 py-3 text-surface font-semibold text-xs shadow-[0_0_15px_rgba(0,0,0,0.1)] transition-all hover:bg-emerald-600 dark:hover:bg-emerald-500">
                    <CheckIcon className="w-4 h-4 text-surface transition-transform group-hover/btn:scale-110" />
                    Mark Module Complete
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full relative z-10">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-emerald-500">Product 02</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-text-main mb-6">TarobPrep.</h2>
            <p className="text-lg text-text-muted font-light leading-relaxed mb-8">
              <strong className="text-text-main font-medium">The Preparation Engine.</strong> Don't just diagnose the gap—close it. Provide your dream role, and TarobPrep builds a personalized, week-by-week technical and behavioral curriculum based entirely on that target JD.
            </p>

            <div className="space-y-4">
              {TAROBPREP_FEATURES.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className={`w-6 h-6 rounded ${feature.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                    <CheckIcon className={`w-3.5 h-3.5 ${feature.color}`} />
                  </div>
                  <div>
                    <p className="text-text-main font-semibold mb-1">{feature.title}</p>
                    <p className="text-sm text-text-muted">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. UNIFIED CTA */}
      <section className="text-center my-20 mb-40">
        <div className="wrapper relative overflow-hidden py-32 px-6 lg:px-12 border w-3/4 mx-auto rounded-[4rem] border-gray-700/10 bg-gray-400/5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full flex justify-center blur-[120px] opacity-20 pointer-events-none">
            <div className="w-1/2 h-full bg-primary rounded-full"></div>
            <div className="w-1/2 h-full bg-emerald-500 rounded-full"></div>
          </div>

          <div className="max-w-2xl mx-auto relative z-10">
            <h2 className="text-4xl font-bold text-text-main tracking-tight mb-4">Start building your leverage.</h2>
            <p className="text-lg text-text-muted mb-10">One account. All your analyses, resumes, and prep history saved securely.</p>
            <Link
              to={isAuthenticated ? "/dashboard" : "/signup"}
              className="inline-flex items-center justify-center px-10 py-4 bg-text-main text-surface text-base font-bold rounded-xl hover:scale-105 transition-transform duration-300 shadow-xl"
            >
              {isAuthenticated ? "Enter the Ecosystem" : "Create your free account"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}