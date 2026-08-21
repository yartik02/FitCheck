import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-text-main">
        <p
        className="font-black leading-[0.85] mb-0 opacity-20"
        style={{ fontSize: "30vw" }}
      >
        404
      </p>
      <p className="lg:text-xl text-sm mb-8 font-light">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-gray-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
