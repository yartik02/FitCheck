import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

export default function FeatureBlockAndFooter() {
//   const { isAuthenticated } = useAuth();
const isAuthenticated = false; 

  return (
    <>
      {/* Differentiator / Feature Block */}
      <section className="py-24 relative bg-[linear-gradient(180deg,var(--bg-surface)_0%,transparent_100%)] px-4 sm:px-6 lg:px-8 my-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-surface border border-border rounded-3xl overflow-hidden shadow-sm relative group">
            
            {/* Subtle background glow that follows the theme */}
            <div className="absolute top-0 right-0 w-125 h-125 bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
              
              {/* Left Content */}
              <div className="p-10 lg:p-16 relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-text-main mb-4 tracking-tight">
                  Your job search, <br />
                  <span className="text-primary">
                    tracked and versioned.
                  </span>
                </h2>
                <p className="text-text-muted text-lg mb-8 max-w-md leading-relaxed">
                  Stop losing your tailored resumes. FitCheck saves every analysis, score, and suggestion to your dashboard. Revisit past matches, track your improvement, and build a repository of optimized bullet points.
                </p>
                <Link
                  to={isAuthenticated ? "/analyzer" : "/signup"}
                  className="inline-flex items-center justify-center px-6 py-3 bg-text-main text-surface font-medium rounded-lg hover:opacity-90 transition-opacity shadow-sm"
                >
                  {isAuthenticated ? "Go to Dashboard" : "Create your free account"}
                </Link>
              </div>

              {/* Right Visual: Abstract History List */}
              <div className="relative h-full min-h-100 bg-deep border-l border-border p-8 lg:p-12 flex flex-col justify-center gap-4 overflow-hidden">
                {/* Fade overlays for the edges */}
                <div className="absolute top-0 left-0 w-full h-12 bg-linear-to-b from-deep to-transparent z-10"></div>
                <div className="absolute bottom-0 left-0 w-full h-12 bg-linear-to-t from-deep to-transparent z-10"></div>

                {/* History Item 1: High Score */}
                <div className="bg-surface border border-border rounded-xl p-4 shadow-sm flex items-center gap-4 transform transition-transform duration-500 hover:scale-[1.02] hover:border-score-high/30 hover:shadow-score-high/5">
                  <div className="w-12 h-12 rounded-full border-[3px] border-score-high/20 flex items-center justify-center">
                    <span className="text-score-high font-bold text-sm">85</span>
                  </div>
                  <div className="flex-1">
                    <div className="h-4 w-3/4 bg-border/80 rounded mb-2"></div>
                    <div className="h-3 w-1/2 bg-border/40 rounded"></div>
                  </div>
                  <span className="text-[10px] font-medium text-text-muted uppercase tracking-widest bg-main px-2 py-1 rounded">Just now</span>
                </div>

                {/* History Item 2: Medium Score */}
                <div className="bg-surface border border-border rounded-xl p-4 shadow-sm flex items-center gap-4 transform transition-transform duration-500 hover:scale-[1.02] hover:border-score-medium/30 hover:shadow-score-medium/5">
                  <div className="w-12 h-12 rounded-full border-[3px] border-score-medium/20 flex items-center justify-center">
                    <span className="text-score-medium font-bold text-sm">68</span>
                  </div>
                  <div className="flex-1">
                    <div className="h-4 w-5/6 bg-border/80 rounded mb-2"></div>
                    <div className="h-3 w-2/3 bg-border/40 rounded"></div>
                  </div>
                  <span className="text-[10px] font-medium text-text-muted uppercase tracking-widest bg-main px-2 py-1 rounded">2 days ago</span>
                </div>

                {/* History Item 3: Low Score */}
                <div className="bg-surface border border-border rounded-xl p-4 shadow-sm flex items-center gap-4 transform transition-transform duration-500 hover:scale-[1.02] hover:border-score-low/30 hover:shadow-score-low/5 opacity-60">
                  <div className="w-12 h-12 rounded-full border-[3px] border-score-low/20 flex items-center justify-center">
                    <span className="text-score-low font-bold text-sm">42</span>
                  </div>
                  <div className="flex-1">
                    <div className="h-4 w-2/3 bg-border/80 rounded mb-2"></div>
                    <div className="h-3 w-1/3 bg-border/40 rounded"></div>
                  </div>
                  <span className="text-[10px] font-medium text-text-muted uppercase tracking-widest bg-main px-2 py-1 rounded">Last week</span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}