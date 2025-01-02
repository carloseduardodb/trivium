import { Sidebar } from "../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar
        onMenuSelect={(menu) =>
          navigate(
            `${menu === "dashboard" ? "/dashboard" : "/dashboard/" + menu}`
          )
        }
      />
      <div className="w-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
