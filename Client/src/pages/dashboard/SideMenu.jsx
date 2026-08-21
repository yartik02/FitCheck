import Logo from "../../assets/FitCheckLogoNew.svg";
import { Link } from "react-router-dom";
import {
  rezer,
  tarob,
  settings,
  logout,
  history
} from "../../utils/Icons";
// import { useAuth } from "../../context/AuthContext";

export default function SideMenu({ activeMenuItem, setActiveMenuItem }) {

  const menuItems = [
    { value: "Rezer", url: "./rezer", icon: rezer, name: "rezer" },
    { value: "Tarob", url: "./tarob", icon: tarob, name: "tarob" },
    { value: "History", url: "./history", icon: history, name: "history" },
    { value: "Settings", url: "./settings", icon: settings, name: "settings" },
  ];

  return (
    <aside className="h-screen group w-20 p-5 text-nowrap overflow-hidden hover:w-70 transition-all duration-300 ease-in-out">
      <div className="flex flex-col overflow-hidden h-full">
        <div className="header flex align-center gap-3">
          <img src={Logo} alt="Logo" className="w-10" />
          <p className="text-4xl font-bold overflow-hidden max-w-0 group-hover:max-w-full whitespace-nowrap transition-all duration-400 ease-in-out">
            Fit<span className="text-primary">Check</span>
          </p>
        </div>
        <ul className="flex flex-col gap-3 my-10">
          {menuItems.map((item, idx) => (
            <li
              key={idx}
              className={`rounded-2xl ${activeMenuItem === item.name ? "text-text-main" : "text-text-muted"} hover:bg-linear-to-l from-gray-600/30 via-gray-600/20 to-transparent transition-colors duration-300 ease-in-out `}
            >
              <Link
                to={item.url}
                className="flex items-center px-2 py-3"
                onClick={()=>setActiveMenuItem(item.name)}
              >
                <span className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={activeMenuItem === item.name ? "2" : "1.5"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {item.icon}
                  </svg>
                </span>
                <span className="text-2xl overflow-hidden max-w-0 group-hover:max-w-full whitespace-nowrap transition-[max-width] duration-300 ease-in-out">
                  {item.value}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className={`p-2 mt-auto text-text-muted rounded-2xl px-2 py-3 hover:bg-linear-to-l from-red-800/20 via-red-800/10 to-transparent`}>

          <Link to="/logout" className="flex items-center" >
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {logout}
              </svg>
            </span>
            <span className="text-2xl overflow-hidden max-w-0 group-hover:max-w-full transition-w duration-300 ease-in-out transition-colors-none">
              Logout
            </span>
          </Link>
        </div>
      </div>
    </aside>
  );
}