import React, { useState } from "react";
import type { SidebarItems } from "./SidebarItems";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

type SidebarProps = {
  sideBarItems: SidebarItems[];
};

const Sidebar: React.FC<SidebarProps> = ({ sideBarItems }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const username = useAuth();
  const navigate = useNavigate();
  const bottomItems = [
    {
      id: "settings",
      label: "Settings",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      id: "help",
      label: "Help & Support",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#232629] flex">
      {/* Sidebar */}
      <div
        className={`${
          isCollapsed ? "w-16" : "w-64"
        } bg-[#3b3f41]/80 backdrop-blur-md border-r border-[#4d4d4d] transition-all duration-300 ease-in-out relative z-10 flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#4d4d4d]">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#f48024]/80 to-[#f48024] rounded-xl shadow-lg transform rotate-12">
                  <svg
                    className="w-5 h-5 text-white transform -rotate-12"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#dcdcdc]">ZenCRM</h2>
                  <p className="text-xs text-[#90999a]">Enterprise</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg bg-[#2d2d2d] hover:bg-[#4d4d4d] text-[#dcdcdc] transition-colors border border-[#4d4d4d]"
            >
              <svg
                className={`w-4 h-4 transition-transform ${
                  isCollapsed ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-3 space-y-1">
            {sideBarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveItem(item.id);
                  navigate(item.path);
                }}
                className={`w-full cursor-pointer flex items-center px-3 py-3 rounded-xl text-left transition-all duration-200 group ${
                  activeItem === item.id
                    ? "bg-gradient-to-r from-[#f48024]/20 to-[#f48024]/10 text-[#f48024] border border-[#f48024]/20"
                    : "text-[#dcdcdc] hover:bg-[#2d2d2d] hover:text-[#f48024]"
                }`}
              >
                <div
                  className={`${
                    activeItem === item.id
                      ? "text-[#f48024]"
                      : "text-[#90999a] group-hover:text-[#f48024]"
                  } transition-colors`}
                >
                  {item.icon}
                </div>
                {!isCollapsed && (
                  <span className="ml-3 font-medium  text-sm">{item.name}</span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#4d4d4d] p-3">
          <div className="space-y-1">
            {bottomItems.map((item) => (
              <button
                key={item.id}
                className="w-full flex items-center px-3 py-3 rounded-xl text-left text-[#dcdcdc] hover:bg-[#2d2d2d] hover:text-[#f48024] transition-all duration-200 group"
              >
                <div className="text-[#90999a] group-hover:text-[#f48024] transition-colors">
                  {item.icon}
                </div>
                {!isCollapsed && (
                  <span className="ml-3 font-medium text-sm">{item.label}</span>
                )}
              </button>
            ))}
          </div>

          {!isCollapsed && (
            <div className="mt-4 pt-4 border-t border-[#4d4d4d]">
              <div className="flex items-center px-3 py-2 rounded-xl bg-[#2d2d2d]/50">
                <div className="w-8 h-8 bg-gradient-to-br from-[#f48024] to-[#e06a00] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  JD
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#dcdcdc] truncate">
                    {username.user?.username}
                  </p>
                </div>
                <button className="p-1 rounded-md hover:bg-[#4d4d4d] text-[#90999a] hover:text-[#dcdcdc] transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
