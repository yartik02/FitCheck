import { useTheme } from "../context/ThemeContext";
import BannerLight from "../assets/FitCheckLightThemeBanner.png";
// import BannerDark from "../assets/FitCheckDarkThemeBanner.png"
import BannerDark2 from "../assets/DarkBanner.png";
import { useNavigate } from "react-router-dom";
import HowItWorks from "../components/HowItWorks";
import FeatureBlockAndFooter from "../components/Featured";
import { scrollArrow } from "../utils/Icons";
// import { useAuth } from '../context/AuthContext';

export default function Home() {
  const isAuthenticated = false;
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="bg-main flex flex-col justify-center">
      {/* Hero Section */}
      <section className="overflow-hidden w-screen bg-heroSectionBg">
        <div className="heroWrapper mx-auto relative max-w-7xl w-full min-h-[70vh] sm:min-h-[80vh] lg:h-[98vh] px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 pt-8 sm:pt-12 lg:pt-0 lg:h-160">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl xl:text-8xl font-black mt-5">
              Stop guessing why your resume gets rejected.
            </h1>
            <p className="max-w-xl text-text-muted text-base sm:text-lg lg:text-xl font-extralight my-6 sm:my-8">
              Paste a job description and get an instant match score with <strong>Rezer</strong>
              — see exactly which keywords you're missing. Then use <strong>TarobPrep</strong> to
              turn that gap into a real plan: targeted interview questions and a
              prep roadmap built around the role you actually want.
            </p>
            <button
              className="bg-primary p-3 sm:p-4 px-4 sm:px-5 rounded-xl my-3 text-base sm:text-lg text-gray-50 hover:bg-primary-hover hover:-translate-y-0.75 transition-all cursor-pointer"
              onClick={() => navigate(isAuthenticated ? "/analyze" : "/signUp")}
            >
              Start Analyzing
            </button>

            <p className="text-sm sm:text-md font-extralight text-slate-500 mt-8 lg:absolute lg:bottom-0 lg:my-5">
              Free to use. Your resume data stays private.
            </p>
          </div>

          <div className="absolute inset-0 z-0 md:block">
            <img
              src={theme === "dark" ? BannerDark2 : BannerLight}
              alt="FitCheck Interface"
              className="absolute bottom-0 right-0 object-contain w-[95vw] sm:w-150 md:w-170 lg:w-220 max-w-none"
            />
          </div>

          <span className="scrollArraow absolute bottom-6 left-1/2 mb-4 hidden sm:flex flex-col items-center gap-1 text-text-muted animate-[bounce_1s_ease-in-out_infinite]">
            SCROLL
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {scrollArrow}
            </svg>
          </span>
        </div>
      </section>

      {/* Rest of the sections will go here */}
      <HowItWorks />
      <FeatureBlockAndFooter />
    </div>
  );
}
