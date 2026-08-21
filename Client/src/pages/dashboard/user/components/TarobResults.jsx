import { useState } from "react";
import {
  arrowRightIcon,
  resetIcon,
  lightningIcon,
  tarob,
  chevronDownIcon,
  fileReadyIcon,
  calendarIcon,
  targetIcon,
  history,
} from "../../../../utils/Icons";

const Icons = {
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
  Tarob: ({ className }) => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {tarob}
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
  File: ({ className }) => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {fileReadyIcon || (
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6" />
      )}
    </svg>
  ),
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
      {calendarIcon || <rect x="3" y="4" width="18" height="18" rx="2" />}
    </svg>
  ),
  Target: ({ className }) => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {targetIcon || <circle cx="12" cy="12" r="9" />}
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

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "plan", label: "Prep Plan" },
  { id: "questions", label: "Interview Questions" },
  { id: "resume", label: "Resume Rewrite" },
];

const SKILL_PREVIEW_COUNT = 8;

function SkillList({ title, skills = [], variant }) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = skills.length > SKILL_PREVIEW_COUNT;

  const isMatching = variant === "matching";

  return (
    <div className="flex flex-col">
      <div className="skillHeader border-b border-border pb-4 flex items-center gap-2 mb-4">
        <div
          className={`w-1.5 h-1.5 rounded-full ${isMatching ? "bg-tarob-green" : `bg-score-low`}`}
        ></div>
        <h4 className="text-sm font-semibold text-text-main">{title}</h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((item, idx) => {
          if (!expanded && idx >= SKILL_PREVIEW_COUNT) return null;
          return (
            <div
              key={idx}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/60 text-[13px] font-medium shadow-sm cursor-default bg-surface ${
                isMatching
                  ? "text-tarob-green/90 hover:border-tarob-green/40"
                  : "text-text-main/70 hover:border-text-main/50"
              }`}
            >
              {isMatching ? item : item.skill}
            </div>
          );
        })}
      </div>
      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-[13px] font-medium text-text-muted hover:text-text-main transition-colors cursor-pointer flex items-center gap-1 w-max"
        >
          {expanded ? "Show less" : `View all ${skills.length} skills`}
          <Icons.ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      )}
    </div>
  );
}

function InputMeta({ icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-1.5 px-4 py-3 min-w-35">
      <div className="flex items-center gap-1">
        <div className="text-text-muted">{icon}</div>
        <p className="text-xs font-bold text-text-muted uppercase tracking-wider">
          {label}
        </p>
      </div>
      <p
        className="text-sm text-text-main font-medium truncate w-full"
        title={value}
      >
        {value}
      </p>
    </div>
  );
}

export default function TarobResults({
  resultData,
  resetForm,
  isHistoryReview = false,
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [questionType, setQuestionType] = useState("Technical");
  const [showJD, setShowJD] = useState(false);
  const [jdCopied, setJdCopied] = useState(false);

  const handleCopyJD = () => {
    if (resultData?.targetJobDescription) {
      navigator.clipboard.writeText(resultData.targetJobDescription);
      setJdCopied(true);
      setTimeout(() => setJdCopied(false), 2000);
    }
  };

  if (!isHistoryReview && (!resultData || !resultData.prepResult)) return null;

  const prepResult = resultData.prepResult;

  const technicalQuestions = (prepResult.technicalQuestions || []).map((q) => ({
    type: "Technical",
    topic: q.topic,
    difficulty: q.difficulty,
    text: q.question,
  }));
  const behavioralQuestions = (prepResult.behavioralQuestions || []).map(
    (q) => ({
      type: "Behavioral",
      text: q,
    }),
  );
  const visibleQuestions =
    questionType === "Technical" ? technicalQuestions : behavioralQuestions;

  const roadmap = (prepResult.prepPlan || []).map((week) => ({
    ...week,
  }));

  return (
    <div
      className={`max-w-6xl mx-auto w-full animate-in fade-in slide-in-from-bottom-8 duration-700 font-sans ${isHistoryReview ? "lg:px-0 py-20" : "lg:pr-8 py-8 pr-4 sm:pr-6 lg:py-16"}`}
    >
      {/* Utility Nav */}
      <button
        onClick={resetForm}
        className={`text-[11px] font-bold text-text-muted hover:text-text-main flex items-center gap-2 transition-colors cursor-pointer uppercase tracking-widest ${isHistoryReview ? "hover:bg-surface px-3 py-2 rounded-3xl absolute top-0 left-0 m-5" : "mb-8"}`}
      >
        <Icons.Reset className="w-3.5 h-3.5" />
        {isHistoryReview ? "Go Back" : "New Analysis"}
      </button>

      {/* Header */}
      <header className="mb-12">
        <div className="flex flex-col md:flex-row md:items-start lg:items-center justify-between gap-6 mb-8">
          <div className="">
            <h1 className="text-3xl md:text-5xl flex gap-3 font-bold text-text-main tracking-tight leading-tight mb-2">
              <Icons.Tarob className="w-12 h-12 text-tarob-green my-auto" />
              {resultData?.targetRole}
            </h1>
            {!isHistoryReview && (
              <p className="text-sm text-text-muted font-medium max-w-2xl leading-relaxed">
                Target role analysis complete. Your curated preparation roadmap
                is generated and ready to review.
              </p>
            )}
          </div>

          {resultData && (
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <InputMeta
                icon={<Icons.File className="w-4 h-4" />}
                label="Resume Used"
                value={resultData.resumeFileName}
              />
              <InputMeta
                icon={<Icons.Calendar className="w-4 h-4" />}
                label="Timeline"
                value={
                  resultData.prepDurationWeeks
                    ? `${resultData.prepDurationWeeks} Weeks`
                    : null
                }
              />
            </div>
          )}
        </div>

        {/* JD Toggle */}
        {resultData?.targetJobDescription && (
          <div className="text-tarob-green">
            <button
              onClick={() => setShowJD(!showJD)}
              className="text-[11px] font-bold text-text-muted hover:text-text-main flex items-center gap-2 transition-colors cursor-pointer uppercase tracking-widest"
            >
              {showJD ? "Hide Job Description" : "View Target Job Description"}
              <Icons.ChevronDown
                className={`w-3 h-3 transition-transform duration-300 ${showJD ? "rotate-180" : ""}`}
              />
            </button>

            {showJD && (
              <div className="mt-4 relative bg-surface/40 border border-border/80 rounded-xl px-5 py-4 max-h-48 overflow-y-auto shadow-inner animate-in fade-in slide-in-from-top-2 group">
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
                  {resultData.targetJobDescription}
                </p>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-40 flex items-center gap-8 mb-12 border-b border-border bg-main/90 backdrop-blur-md pt-4 -mx-4 px-4 sm:mx-0 sm:px-0">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative pb-4 text-[11px] font-bold uppercase tracking-widest transition-colors cursor-pointer ${
              activeTab === tab.id
                ? "text-tarob-green"
                : "text-text-muted hover:text-text-main"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-tarob-green rounded-full" />
            )}
          </button>
        ))}
      </div>

      <main className="min-h-125">
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="animate-in fade-in duration-500 space-y-12">
            <section className="bg-surface/80 border border-border/60 p-6 md:p-8 rounded-2xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-tarob-green animate-pulse"></span>
                <h3 className="text-xs font-bold text-text-main tracking-widest uppercase">
                  Quick Summary
                </h3>
              </div>
              <p className="text-lg text-text-main/90 font-normal italic leading-relaxed">
                "{prepResult.summary}"
              </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-surface/80 border border-border/50 p-6 rounded-2xl">
                <SkillList
                  title="Matched Skills"
                  skills={prepResult.matchingSkills}
                  variant="matching"
                />
              </div>
              <div className="bg-surface/80 border border-border/50 p-6 rounded-2xl">
                <SkillList
                  title="Required Skills"
                  skills={prepResult.missingSkills}
                  variant="missing"
                />
              </div>
            </section>
          </div>
        )}

        {/* PREP PLAN TAB */}
        {activeTab === "plan" && (
          <div className="animate-in fade-in duration-500 w-full max-w-full">
            <div className="flex items-center gap-2">
              <Icons.Calendar className="w-5 h-5 text-text-main/70" />
              <span className="text-xs font-bold text-text-main/80 uppercase tracking-[0.2em]">
                {roadmap.length}-Week Execution Plan
              </span>
            </div>

            <div className="relative w-full">
              {/* Grand Vertical Track */}
              <div className="absolute left-7 md:left-10.5 top-12 bottom-4 w-px bg-linear-to-b from-tarob-green/40 via-border to-text-main/30 hidden sm:block" />

              <div className="flex flex-col w-full">
                {roadmap.map((week, idx) => {
                  const isCurrent = week.status === "current";
                  const weekNumStr =
                    week.week < 10 ? `0${week.week}` : week.week;

                  return (
                    <div
                      key={idx}
                      className="relative flex flex-col md:flex-row items-start py-8 md:py-12 group w-full"
                    >
                      {/* Node Tracker */}
                      <div className="hidden sm:flex absolute left-7 md:left-10.5 top-12 md:top-14 -translate-x-1/2 w-3 h-3 rounded-full ring-8 ring-main z-10 transition-all duration-700 ease-out items-center justify-center bg-surface group-hover:scale-125">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${isCurrent ? "bg-tarob-green shadow-[0_0_15px_rgba(16,185,129,0.8)]" : "bg-text-muted/40 group-hover:bg-text-main"}`}
                        />
                      </div>

                      {/* Left Header Col */}
                      <div className="pl-0 sm:pl-17.5 md:pl-22.5 md:w-1/3 xl:w-1/4 shrink-0 pt-2 flex flex-col">
                        <span
                          className={`text-5xl md:text-7xl font-black italic tracking-tighter transition-colors duration-300 text-text-muted/30 group-hover:text-text-muted`}
                        >
                          {weekNumStr}
                        </span>
                        <span
                          className={`text-sm pl-3 font-bold italic uppercase tracking-[0.2em] transition-colors text-text-muted/30 group-hover:text-text-muted`}
                        >
                          Week
                        </span>
                      </div>

                      {/* Right Tasks Col */}
                      <div className="w-full flex-1 py-4">
                        <h4
                          className={`text-2xl md:text-4xl mb-6 font-bold tracking-tight transition-colors duration-300 text-text-main/80 group-hover:text-text-main`}
                        >
                          {week.focus}
                        </h4>
                        <div className="tasksWrapper">
                          {week.tasks && week.tasks.length > 0 && (
                            <div
                              className={`w-full rounded-4xl p-6 md:p-8 lg:p-10 transition-all duration-500 border bg-surface/50 border-border/70 group-hover:bg-surface group-hover:border-border group-hover:shadow-xl group-hover:shadow-black/10`}
                            >
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
                                {week.tasks.map((task, tIdx) => (
                                  <div
                                    key={tIdx}
                                    className="flex items-start gap-4 group/task"
                                  >
                                    <div
                                      className={`mt-0.5 flex items-center justify-center w-5 h-5 rounded-full border transition-colors duration-300 shrink-0 border-border/80 bg-main/50 text-text-muted group-hover/task:border-text-muted/40 group-hover/task:text-text-main`}
                                    >
                                      <svg
                                        className="w-2.5 h-2.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <polyline points="20 6 9 17 4 12" />
                                      </svg>
                                    </div>
                                    <p
                                      className={`text-sm md:text-base leading-relaxed font-medium transition-colors duration-300 text-text-muted group-hover:text-text-main/70 group-hover/task:text-text-main`}
                                    >
                                      {task}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* INTERVIEW QUESTIONS TAB */}
        {activeTab === "questions" && (
          <div className="animate-in fade-in duration-500">
            <div
              className="flex items-center gap-1 bg-surface border border-border/80 rounded-xl p-1 w-max mb-8"
              style={{ boxShadow: "inset -5px 4px 4px rgb(0 0 0 / 10%)" }}
            >
              {["Technical", "Behavioral"].map((type) => (
                <button
                  key={type}
                  onClick={() => setQuestionType(type)}
                  className={`px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all duration-300 cursor-pointer ${
                    questionType === type
                      ? "bg-main/90 text-text-main shadow-md dark:shadow-none"
                      : "text-text-muted hover:text-text-main hover:bg-main/50"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {visibleQuestions.length === 0 && (
                <div className="col-span-full py-16 text-center border border-dashed border-border/80 rounded-2xl bg-surface/30">
                  <p className="text-sm text-text-muted font-medium">
                    No {questionType.toLowerCase()} questions found for this
                    configuration.
                  </p>
                </div>
              )}
              {visibleQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="bg-surface border border-border/60 p-6 rounded-2xl shadow-sm hover:border-text-muted/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="flex items-center gap-2 mb-5 flex-wrap">
                    <span className="text-[12px] font-bold text-text-muted bg-main px-2.5 py-1 rounded-md border border-main uppercase tracking-widest">
                      {q.type}
                    </span>
                    {q.topic && (
                      <span className="text-[12px] font-bold text-text-main bg-border/90 px-2.5 py-1 rounded-md border border-border/80 uppercase tracking-widest shadow-sm">
                        {q.topic}
                      </span>
                    )}
                    {q.difficulty && (
                      <span
                        className={`text-[12px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border shadow-sm ${
                          q.difficulty === "hard"
                            ? "text-score-low bg-score-low/20 border-score-low/10"
                            : q.difficulty === "medium"
                              ? "text-score-medium bg-score-medium/20 border-score-medium/10"
                              : "text-text-main bg-surface border-border/80"
                        }`}
                      >
                        {q.difficulty}
                      </span>
                    )}
                    <span className="text-2xl text-text-muted/50 font-medium ml-auto">
                      Q{idx + 1}
                    </span>
                  </div>
                  <p className="text-sm text-text-main/90 leading-relaxed font-medium">
                    "{q.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RESUME REWRITE TAB */}
        {activeTab === "resume" && (
          <div className="animate-in fade-in duration-500 flex flex-col items-center justify-center py-24 border border-dashed border-border/80 bg-surface/20 rounded-3xl">
            <div className="w-16 h-16 rounded-full bg-main border border-border/80 flex items-center justify-center text-text-muted mb-6 shadow-sm">
              <Icons.File className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-text-main mb-2 tracking-tight">
              Automated ATS Optimization
            </h3>
            <p className="text-sm text-text-muted max-w-md text-center mb-8 leading-relaxed font-medium">
              We are building a tool to dynamically reconstruct your resume
              tailored specifically to the structural demands of this job
              description.
            </p>
            <button
              disabled
              className="px-6 py-2.5 rounded-lg border border-border/60 text-text-muted font-bold text-xs uppercase tracking-widest cursor-not-allowed opacity-50 flex items-center gap-2 bg-surface shadow-sm"
            >
              Coming Soon
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
