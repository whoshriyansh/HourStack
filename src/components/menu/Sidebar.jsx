"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, Folder, Users, LayoutDashboard, Heart } from "lucide-react";
import Profilebar from "./Profilebar";
import useUIStore from "@/store/uiStore";
import { useIsLargeScreen } from "@/store/useIsLargeScreen";

const Sidebar = () => {
  const pathname = usePathname();
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);
  const closeSidebar = useUIStore((state) => state.closeSidebar);
  const isLargeScreen = useIsLargeScreen();

  useEffect(() => {
    if (!isLargeScreen) closeSidebar();
  }, [pathname]);

  if (!isLargeScreen && !isSidebarOpen) return null;

  const navSections = [
    {
      title: "TRACK",

      items: [
        { icon: LayoutDashboard, name: "Console", href: "/console" },
        { icon: Clock, name: "Timer", href: "/timer", isTime: true },
      ],
    },
    {
      title: "MANAGE",
      items: [
        { icon: Folder, name: "Project", href: "/project" },
        { icon: Users, name: "Client", href: "/client" },
      ],
    },
    {
      title: "DEVELOPER",
      items: [{ icon: Heart, name: "About Him", href: "/about-shriyansh" }],
    },
  ];

  return (
    <div className="relative z-50 flex border">
      <Profilebar />
      <div className="flex-1 bg-sidebar text-white h-screen flex flex-col justify-between border-r border-sidebar-border">
        {/* Workspace Header */}
        <div className="p-4">
          <h2 className="text-sm text-foreground font-bold uppercase">
            Workspace
          </h2>
          <p className="text-xs text-gray-400">SHRIYANSHLOHIA0'S...</p>
        </div>

        {/* Sections */}
        <div className="flex-1 overflow-y-auto">
          {navSections.map((section) => (
            <div key={section.title} className="mb-4">
              <p className="text-gray-500 text-xs px-4 mb-2">{section.title}</p>
              <ul className="space-y-1">
                {section.items.map(
                  ({ icon: Icon, name, href, badge, isTime }) => {
                    const isActive = pathname === href;
                    return (
                      <li key={name}>
                        <Link
                          href={href}
                          className={`flex items-center justify-between px-4 py-2 text-sm hover:bg-[#202020] ${
                            isActive
                              ? "bg-sidebar-accent text-sidebar-foreground"
                              : "text-secondary-foreground"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon size={16} />
                            <span>{name}</span>
                          </div>
                          {badge && (
                            <span className="text-[10px] bg-gray-600 px-2 py-0.5 rounded text-white">
                              {badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Spacer */}
        <div className="h-8" />
      </div>
    </div>
  );
};

export default Sidebar;
