import React, { useState, useEffect } from "react";
import {
  Wallet,
  TrendingUp,
  PlusCircle,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Menu,
} from "lucide-react";

interface SidebarProps {
  onMenuSelect: (menu: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onMenuSelect }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string>(() => {
    return localStorage.getItem("activeMenu") || "dashboard";
  });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      id: "dashboard",
      label: "Desempenho",
      icon: <Wallet className="w-6 h-6" />,
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      id: "register",
      label: "Adicionar Cripto",
      icon: <PlusCircle className="w-6 h-6" />,
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      id: "monitor",
      label: "Monitorar Lucro",
      icon: <TrendingUp className="w-6 h-6" />,
      gradient: "from-green-400 to-blue-500",
    },
    {
      id: "alerts",
      label: "Alertas Mercado",
      icon: <AlertCircle className="w-6 h-6" />,
      gradient: "from-cyan-400 to-blue-600",
    },
  ];

  const handleMenuSelect = (menuId: string) => {
    setActiveMenu(menuId);
    onMenuSelect(menuId);
    localStorage.setItem("activeMenu", menuId);
    if (isMobile) {
      setIsCollapsed(true);
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 right-4 z-50 bg-[#121212] p-2 rounded-lg text-white hover:bg-[#1e1e1e] transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {isMobile && !isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`${
          isMobile ? "fixed" : "sticky top-0"
        } top-0 left-0 bg-[#121212] transition-all duration-300 ease-in-out h-[100vh]
        ${isCollapsed ? "w-20" : isMobile ? "w-64" : "w-72"}
        shadow-lg border-r border-[#1e1e1e] overflow-y-auto
        ${isMobile ? "z-30" : "z-10"}
        ${isMobile && isCollapsed ? "-translate-x-full" : "translate-x-0"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#1e1e1e]">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <img src="/trivium_logo.svg" alt="Logo" className="w-8 h-8" />
              <h1 className="text-2xl font-bold text-white tracking-tight whitespace-nowrap">
                Trivium
              </h1>
            </div>
          )}
          {!isMobile && (
            <button
              onClick={toggleSidebar}
              className="text-white hover:bg-[#1e1e1e] p-2 rounded-full transition duration-200"
            >
              {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </button>
          )}
        </div>

        {/* Menu */}
        <nav className="mt-4 space-y-2 p-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuSelect(item.id)}
              className={`flex items-center w-full p-2 rounded-lg text-left transition-all duration-300 relative
                ${
                  activeMenu === item.id
                    ? `bg-gradient-to-r ${item.gradient} text-white`
                    : "hover:bg-[#1e1e1e] hover:border-l-4 hover:border-purple-500 text-gray-400"
                }
              `}
            >
              <div
                className={`p-2 rounded-lg transition-colors shrink-0 ${
                  activeMenu === item.id ? "bg-white/20" : "bg-[#1e1e1e]"
                }`}
              >
                {item.icon}
              </div>
              {!isCollapsed && (
                <span className="ml-4 text-sm font-semibold whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};
