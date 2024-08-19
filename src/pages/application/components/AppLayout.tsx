import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";

const AppLayout = () => {
  return (
    <div>
      <TopBar />
      
      <div className="max-w-[800px] mx-auto mt-4">
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout