import { checkCircleIcon } from "../utils/Icons";

const STEPS = [
  {
    id: 1,
    title: "Target",
    description: "Paste the exact job description you are aiming for. We strip the noise and extract the core technical and soft requirements.",
    // Keep the specific wrapper classes for Card 1 (p-6)
    visual: (
      <div className="h-48 bg-deep relative flex items-center justify-center p-6 overflow-hidden border-b border-border">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(var(--text-main) 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
        {/* Abstract App Window */}
        <div className="w-full max-w-50 bg-surface border border-border rounded-lg shadow-sm relative z-10 transform group-hover:scale-[1.02] transition-transform duration-500 overflow-hidden flex flex-col">
          <div className="h-6 border-b border-border bg-main/50 flex items-center px-3 gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-border"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          </div>
          <div className="p-4">
            <div className="space-y-2 mb-4">
              <div className="h-1.5 w-full bg-border rounded-full"></div>
              <div className="h-1.5 w-5/6 bg-border/60 rounded-full"></div>
              <div className="h-1.5 w-4/6 bg-border/40 rounded-full"></div>
            </div>
            <div className="flex gap-2">
              <span className="px-2 py-0.5 bg-primary-muted text-primary text-[8px] font-bold uppercase tracking-wider rounded">React</span>
              <span className="px-2 py-0.5 bg-primary-muted text-primary text-[8px] font-bold uppercase tracking-wider rounded">Node</span>
            </div>
          </div>
        </div>
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Analyze",
    description: "Upload your current resume PDF. Our LLM compares your experience against the JD, calculating a hard match score from 0 to 100.",
    visual: (
      <div className="h-48 bg-deep relative flex items-center justify-center p-6 overflow-hidden border-b border-border">
        {/* Dot grid background (subtle) */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(var(--text-main) 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
        
        {/* Radial Gauge */}
        <div className="relative z-10 flex items-center justify-center transform group-hover:scale-[1.02] transition-transform duration-500">
          <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 36 36">
            <path className="stroke-border" fill="none" strokeWidth="2.5" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path className="stroke-score-medium transition-all duration-1000 ease-out" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="68, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-text-main leading-none">68</span>
            <span className="text-[9px] font-semibold text-text-muted uppercase tracking-widest mt-1">Match</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Iterate",
    description: "Stop staring at a blank page. Get line-by-line rewrite suggestions to inject missing keywords without sounding like a robot.",
    // Note: Card 3 has slightly different wrapper classes (flex-col, no p-6) as per your original code
    visual: (
      <div className="h-48 bg-deep relative flex flex-col items-center justify-center overflow-hidden border-b border-border">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(var(--text-main) 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
        {/* PR Diff UI Container */}
        <div className="w-full max-w-55 bg-main transform group-hover:scale-[1.02] transition-transform duration-500 relative z-10 flex flex-col gap-1.5">
          {/* Removed (Red) */}
          <div className="w-full bg-score-low/5 border-l-2 border-score-low/60 rounded-r p-2.5 flex items-start gap-2 shadow-sm">
            <span className="text-score-low text-[10px] font-mono leading-none font-bold mt-0.5">-</span>
            <div className="flex-1 space-y-1.5 mt-1">
              <div className="h-1.5 w-full bg-score-low/30 rounded-full"></div>
              <div className="h-1.5 w-2/3 bg-score-low/30 rounded-full"></div>
            </div>
          </div>
          {/* Added (Green) */}
          <div className="w-full bg-score-high/5 border-l-2 border-score-high/60 rounded-r p-2.5 flex items-start gap-2 shadow-sm">
            <span className="text-score-high text-[10px] font-mono leading-none font-bold mt-0.5">+</span>
            <div className="flex-1 space-y-1.5 mt-1">
              <div className="h-1.5 w-full bg-score-high/40 rounded-full"></div>
              <div className="flex gap-1.5">
                <div className="h-1.5 w-1/3 bg-score-high/80 rounded-full"></div>
                <div className="h-1.5 w-1/2 bg-score-high/40 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 relative bg-main mt-20" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <div className="badge border border-emerald-700/50 text-sm font-extralight px-3 py-1.5 rounded-full mb-4 inline-block bg-emerald-900/30 text-emerald-700">
            <p className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                {checkCircleIcon}
              </svg>
              Optimize in three steps
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-text-main mb-4 tracking-tight">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-text-muted font-extralight max-w-2xl mx-auto">
            No bloated wizards or confusing forms. Just drop your data and get actionable results.
          </p>
        </div>

        {/* 2. Map over the data array to render the cards dynamically */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {STEPS.map((step) => (
            <div key={step.id} className="group bg-surface rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5 hover:-translate-y-1 hover:border-primary/30">
              
              {/* Unique Visual Header from data array */}
              {step.visual}

              {/* Reusable Content Block */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded bg-text-main text-surface text-xs font-bold shadow-sm">
                    {step.id}
                  </span>
                  <h3 className="text-xl font-semibold text-text-main">
                    {step.title}
                  </h3>
                </div>
                <p className="text-text-muted text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}