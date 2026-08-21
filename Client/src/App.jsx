import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import UserDash from "./pages/dashboard/user/UserDash";
import ErrorPage from "./pages/ErrorPage";
import Products from "./pages/Products";
import Settings from "./pages/dashboard/user/Settings";
import Rezer from "./pages/dashboard/user/rezer";
import TarobPrep from "./pages/dashboard/user/Tarob";
import HistoryPage from "./pages/dashboard/user/History";
import Logout from "./components/Logout";
import RezerReportPage from "./pages/dashboard/user/components/RezerReportPage";
import TarobReviewPage from "./pages/dashboard/user/components/TarobReviewPage";

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
      {!hideNavbarAndFooter && <Footer />}
    </>
  );
}

export default App;
