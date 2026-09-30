import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import SideMenu from "../SideMenu";
import ErrorPage from "../../ErrorPage";
import Settings from "./Settings";
import Rezer from "./rezer";
import HistoryPage from "./History";
import TarobPrep from "./Tarob";
import {
  rezer,
  tarob,
  settings,
  history
} from "../../../utils/Icons";
import MobileBottomTab from "../MobileBottomTab";

function UserDash() {
  const { user } = useAuth();
  const [activeMenuItem, setActiveMenuItem] = useState("rezer");

  const menuItems = [
    { value: "Rezer", url: "./rezer", icon: rezer, name: "rezer" },
    { value: "Tarob", url: "./tarob", icon: tarob, name: "tarob" },
    { value: "History", url: "./history", icon: history, name: "history" },
    { value: "Settings", url: "./settings", icon: settings, name: "settings" },
  ];

  if(!user) {return <ErrorPage />}
  return (
    <div className="min-h-screen h-full w-max-screen w-full flex flex-row justify-between">
      <aside className="max-h-screen hidden md:block h-full sticky top-0">
        <SideMenu
          menuItems={menuItems}
          activeMenuItem={activeMenuItem}
          setActiveMenuItem={setActiveMenuItem}
          userName={user.name}
        />
      </aside>
      <footer className="block md:hidden">
        <MobileBottomTab
          activeMenuItem={activeMenuItem}
          setActiveMenuItem={setActiveMenuItem}
        />
      </footer>
      <main className="md:max-w-296 max-w-screen w-full py-4  h-full md:pr-4 px-4 lg:pr-8">
        {/* <div className="dashWrapper">
          <div className="main"> */}
          { activeMenuItem==="rezer" && <Rezer/>}
          { activeMenuItem==="tarob" && <TarobPrep/>}
          { activeMenuItem==="history" && <HistoryPage/> }
          { activeMenuItem==="settings" && <Settings/> }
        {/* </div>
        </div> */}
        
      </main>
    </div>
  );
}

export default UserDash;
