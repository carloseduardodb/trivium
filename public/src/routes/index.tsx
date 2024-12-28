import { createBrowserRouter } from "react-router";
import { LoginOrRegister } from "../pages/login-register";
import { Dashboard } from "../pages/dashboard";
import DashboardLayout from "../layouts/dashboard";
import { AddCrypto } from "../pages/dashboard/add-crypto";
import { MarketAlerts } from "../pages/dashboard/market-alerts";
import { ProfitMonitor } from "@/pages/dashboard/monitor-profit";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <LoginOrRegister />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "register",
        element: <AddCrypto />,
      },
      {
        path: "monitor",
        element: <ProfitMonitor />,
      },
      {
        path: "alerts",
        element: <MarketAlerts />,
      },
    ],
  },
]);

export default routes;
