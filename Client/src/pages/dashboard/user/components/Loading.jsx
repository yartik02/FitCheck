export default function Loading({ loadingStep, steps, title, theme = "rezer" }) {
  const isTarob = theme === "tarob";

  const lineClass = isTarob 
    ? "bg-tarob-green/40 shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
    : "bg-primary/40 shadow-[0_0_10px_rgba(37,99,235,0.5)]";
    
  const dotClass = isTarob ? "bg-tarob-green" : "bg-primary";
  const textClass = isTarob ? "text-tarob-green" : "text-primary";

  return (
    <div className="max-w-2xl mx-auto px-4 py-32 w-full min-h-[70vh] flex flex-col justify-center animate-in fade-in duration-700">
      <div className="bg-surface/30 border border-border rounded-2xl p-8 font-mono text-sm shadow-sm relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-px animate-[scan_2s_ease-in-out_infinite] ${lineClass}`}></div>
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/50">
          <span className="text-[10px] text-text-muted uppercase tracking-widest">
            {title}
          </span>
          <span className={`w-2 h-2 rounded-full animate-pulse ${dotClass}`}></span>
        </div>

        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 transition-opacity duration-500 ${
                idx < loadingStep
                  ? "opacity-40"
                  : idx === loadingStep
                    ? "opacity-100 text-text-main"
                    : "opacity-0"
              }`}
            >
              <span className={`${textClass} mt-0.5`}>
                {idx < loadingStep ? "✓" : ">"}
              </span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
