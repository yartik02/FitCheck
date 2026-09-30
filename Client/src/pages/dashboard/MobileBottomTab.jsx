import { rezer, tarob, settings, history } from "../../utils/Icons";

const menuItems = [
  { value: "Rezer", url: "./rezer", icon: rezer, name: "rezer" },
  { value: "Tarob", url: "./tarob", icon: tarob, name: "tarob" },
  { value: "History", url: "./history", icon: history, name: "history" },
  { value: "Settings", url: "./settings", icon: settings, name: "settings" },
];

export default function MobileBottomTab({ activeMenuItem, setActiveMenuItem }) {
  // console.log("menuItems in bottom tab: ", menuItems);

  return (
    <div
      className="fixed left-0 right-0 z-100 flex justify-center md:hidden pointer-events-none px-2"
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
      aria-label="Mobile dashboard navigation"
    >
      <div className="flex items-center justify-between w-full max-w-120 px-3 py-2 gap-1.5 bg-background/85 backdrop-blur-3xl border border-border/60 rounded-[32px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] pointer-events-auto">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`font-medium ${activeMenuItem === item.name ? "text-primary bg-primary/25 px-3" : ""} p-2 rounded-2xl flex items-center gap-1 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
            onClick={() => setActiveMenuItem(item.name)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              //   width="30"
              //   height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            //   strokeWidth={activeMenuItem === item.name ? "2" : "1.5"}
              className={`${
                activeMenuItem === item.name
                  ? "h-5.5 w-5.5 text-accent stroke-2 scale-100"
                  : "h-7.5 w-7.5 text-text-secondary/60 stroke-[1.6] scale-95 group-active:scale-90"
              }`}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {item.icon}
            </svg>

            {activeMenuItem === item.name && (
              <span className="transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                {item.value}
              </span>
            )}
          </button>
        ))}
        {/* </button> */}
        {/* <button className="text-primary hover:text-primary-hover font-medium">
          Profile
        </button> */}
      </div>
    </div>
  );
}
