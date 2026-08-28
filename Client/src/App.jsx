import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Logout from "./components/Logout";
import Home from "./pages/Home";

// Public pages
// const Home = lazy(() => import("./pages/Home"));
const Signup = lazy(() => import("./pages/SignUp"));
const Login = lazy(() => import("./pages/Login"));
const Products = lazy(() => import("./pages/Products"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

// Dashboard pages
const UserDash = lazy(() => import("./pages/dashboard/user/UserDash"));
const Settings = lazy(() => import("./pages/dashboard/user/Settings"));
const Rezer = lazy(() => import("./pages/dashboard/user/rezer"));
const TarobPrep = lazy(() => import("./pages/dashboard/user/Tarob"));
const HistoryPage = lazy(() => import("./pages/dashboard/user/History"));
const RezerReportPage = lazy(() =>
  import("./pages/dashboard/user/components/RezerReportPage")
);
const TarobReviewPage = lazy(() =>
  import("./pages/dashboard/user/components/TarobReviewPage")
);

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <span>Loading...</span>
    </div>
  );
}

function App() {
  const location = useLocation();
  const isErrorPage =
    location.pathname !== "/login" &&
    location.pathname !== "/signup" &&
    location.pathname !== "/products" &&
    location.pathname !== "/" &&
    location.pathname !== "/dashboard/user/:name";
  const hideNavbarAndFooter =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/dashboard/user/:name" ||
    isErrorPage;

  return (
    <>
      {!hideNavbarAndFooter && <Navbar />}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/dashboard/user/:name" element={<UserDash />}>
            <Route path="settings" element={<Settings />} />
            <Route path="rezer" element={<Rezer />} />
            <Route path="tarob" element={<TarobPrep />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="rezer/report/:id" element={<RezerReportPage />} />
            <Route path="tarobPrep/review/:id" element={<TarobReviewPage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
      {!hideNavbarAndFooter && <Footer />}
    </>
  );
}

export default App;