import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import SideMenu from "../SideMenu";
import ErrorPage from "../../ErrorPage";
import Settings from "./Settings";
import Rezer from "./rezer";
import HistoryPage from "./History";
import TarobPrep from "./Tarob";

function UserDash() {
  const { user } = useAuth();
  const [activeMenuItem, setActiveMenuItem] = useState("rezer");
  // console.log("User from AuthContext:", user);

  if(!user) {return <ErrorPage />}
  return (
    <div className="min-h-screen h-full w-max-screen w-full flex flex-row justify-between">
      <aside className="max-h-screen h-full">
        <SideMenu
          activeMenuItem={activeMenuItem}
          setActiveMenuItem={setActiveMenuItem}
          userName={user.name}
        />
      </aside>
      <main className="max-w-296 w-full py-4 h-screen ">
        <div className="dashWrapper overflow-scroll h-full">
          <div className="main">
          { activeMenuItem==="rezer" && <Rezer/>}
          { activeMenuItem==="tarob" && <TarobPrep/>}
          { activeMenuItem==="history" && <HistoryPage/> }
          { activeMenuItem==="settings" && <Settings/> }
        </div>
        </div>
        
      </main>
    </div>
  );
}

export default UserDash;
