import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { SidebarItems } from "./SidebarItems";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { displayRole } from "../../../utils/RoleDisplay";
import { useAppDispatch } from "../../../redux/Hooks";
import { logoutUser } from "../../../redux/slices/AuthSlices";

type SidebarProps = {
  sideBarItems: SidebarItems[];
};

const Sidebar: React.FC<SidebarProps> = ({ sideBarItems }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const auth = useAuth();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

  const bottomItems = useMemo(
    () => [
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
        id: "Logout",
        label: "Logout",
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
        onClick: async () => {
          try {
            await dispatch(logoutUser());
            navigate("/");
          } catch (err) {
            console.error(err);
          }
        },
      },
    ],
    [dispatch, navigate]
  );

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const onKey = (e: KeyboardEvent) => {
      const items = Array.from(
        root.querySelectorAll<HTMLButtonElement>("[data-nav-item]")
      );
      const currentIndex = items.findIndex(
        (el) => el.dataset.id === String(activeItem)
      );
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next =
          items[Math.min(currentIndex + 1, items.length - 1)] || items[0];
        next?.focus();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev =
          items[Math.max(currentIndex - 1, 0)] || items[items.length - 1];
        prev?.focus();
      }
    };
    root.addEventListener("keydown", onKey);
    return () => root.removeEventListener("keydown", onKey);
  }, [activeItem]);

  return (
    <div
      className={`relative z-10 flex flex-col bg-[#2a2c2e]/80 backdrop-blur-md border-r border-[#3f4245] transition-[width] duration-300 ease-in-out ${
        isCollapsed ? "w-16" : "w-72"
      }`}
    >
      {/* Top brand */}
      <div className="relative p-4 border-b border-[#3f4245]">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#f48024] to-[#ff8a00] shadow-[0_10px_30px_rgba(244,128,36,0.35)]">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#dcdcdc]">ZenCRM</h2>
                <p className="text-[11px] text-[#a7b0b1]">Enterprise</p>
              </div>
            </motion.div>
          )}

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsCollapsed((v) => !v)}
            aria-label={isCollapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
            className="p-2 rounded-lg bg-[#27292b] hover:bg-[#303234] text-[#dcdcdc] transition-colors border border-[#3f4245]"
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
          </motion.button>
        </div>

        {!isCollapsed ? (
          <div className="mt-3 h-1 w-full rounded-full bg-gradient-to-r from-[#f48024] to-[#ff8a00] opacity-80" />
        ) : (
          <div className="mt-3 h-1 w-6 mx-auto rounded-full bg-gradient-to-r from-[#f48024] to-[#ff8a00] opacity-80" />
        )}
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto py-3 scrollbar-thin scrollbar-thumb-[#3f4245] scrollbar-track-transparent"
      >
        <nav
          className={`px-3 space-y-1 flex flex-col ${
            isCollapsed ? "items-center" : "items-stretch"
          }`}
        >
          {sideBarItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => {
                setActiveItem(item.id);
                navigate(item.path);
              }}
              className={`w-full flex cursor-pointer items-center ${
                isCollapsed ? "justify-center px-0" : "justify-start px-3"
              } py-2.5 rounded-xl text-left transition-colors group border ${
                activeItem === item.id
                  ? "text-[#f48024] border-[#f48024]/30"
                  : "text-[#dcdcdc] border-transparent hover:bg-[#27292b] hover:text-[#f48024]"
              } focus:outline-none focus:ring-2 focus:ring-[#f48024]/40`}
            >
              {!isCollapsed && (
                <span
                  className={`mr-2 h-8 w-1 rounded-full transition-colors ${
                    activeItem === item.id
                      ? "bg-gradient-to-b from-[#f48024] to-[#ff8a00]"
                      : "bg-transparent group-hover:bg-[#3f4245]"
                  }`}
                />
              )}
              <span
                className={`${
                  activeItem === item.id
                    ? "text-[#f48024]"
                    : "text-[#90999a] group-hover:text-[#f48024]"
                } transition-colors ${
                  isCollapsed
                    ? "w-9 h-9 grid place-items-center rounded-lg"
                    : ""
                }`}
              >
                {item.icon}
              </span>
              {!isCollapsed && (
                <motion.span
                  key="label"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  className="ml-3 font-medium text-sm truncate"
                >
                  {item.name}
                </motion.span>
              )}
            </motion.button>
          ))}
        </nav>
      </div>

      <div className="border-t border-[#3f4245] p-3 bg-[#232629]/40 backdrop-blur-sm">
        <div className="space-y-1">
          {bottomItems.map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`w-full flex items-center ${
                isCollapsed ? "justify-center px-0" : "justify-start px-3"
              } py-2.5  cursor-pointer rounded-xl text-left text-[#dcdcdc] hover:bg-[#27292b] hover:text-[#f48024] transition-colors group`}
            >
              <span className="text-[#90999a] group-hover:text-[#f48024] transition-colors">
                {item.icon}
              </span>
              {!isCollapsed && (
                <span className="ml-3 font-medium text-sm">{item.label}</span>
              )}
            </button>
          ))}
        </div>

        <div
          className={
            isCollapsed ? "mt-3" : "mt-4 pt-4 border-t border-[#3f4245]"
          }
        >
          <button
            className={
              isCollapsed
                ? "w-10 h-10 mx-auto grid place-items-center rounded-full bg-gradient-to-br from-[#f48024] to-[#e06a00] text-white text-xs font-semibold ring-1 ring-[#3f4245] hover:scale-105 transition-transform"
                : "w-full flex items-center px-3 py-2.5 rounded-xl bg-[#27292b]/70 border border-[#3f4245] hover:bg-[#303234] transition-colors"
            }
            aria-label="User profile"
          >
            {isCollapsed ? (
              <span>JD</span>
            ) : (
              <>
                <div className="w-8 h-8 bg-gradient-to-br from-[#f48024] to-[#e06a00] rounded-full grid place-items-center text-white text-xs font-semibold">
                  JD
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#dcdcdc] truncate">
                    {auth.user?.username}
                  </p>
                  <p className="text-[11px] text-[#a7b0b1] truncate">
                    {displayRole(auth.user?.role)}
                  </p>
                </div>
                <svg
                  className="w-4 h-4 text-[#90999a] ml-auto"
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
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
