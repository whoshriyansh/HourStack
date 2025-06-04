"use client";

import React from "react";
import { X, Code, Video, Sun, Moon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TooltipIconButton from "./helpers/TooltipIconButton";
import useUIStore from "@/store/uiStore";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

const Profilebar = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const closeSidebar = useUIStore((state) => state.closeSidebar);

  return (
    <div className="w-12 h-full flex flex-col items-center justify-between pt-10 pb-5  bg-background">
      <TooltipIconButton tooltip="Close" side={"right"}>
        <Button
          className="cursor-pointer"
          variant="outline"
          size="sm"
          onClick={closeSidebar}
        >
          <X size={24} />
        </Button>
      </TooltipIconButton>

      <div className="flex flex-col gap-4 items-center">
        <Button
          variant="link"
          onClick={() => {
            router.push("/profile");
          }}
        >
          <TooltipIconButton tooltip="User Profile" side={"right"}>
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </TooltipIconButton>
        </Button>

        <TooltipIconButton tooltip="Change Theme" side={"right"}>
          <Button
            className="cursor-pointer"
            variant="outline"
            size="sm"
            onClick={toggleTheme}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </TooltipIconButton>

        <TooltipIconButton tooltip="Go to Code" side={"right"}>
          <Button className="cursor-pointer" variant="outline" size="sm">
            <Code size={24} />
          </Button>
        </TooltipIconButton>
        <TooltipIconButton tooltip="Loom Video" side={"right"}>
          <Button className="cursor-pointer" variant="outline" size="sm">
            <Video size={20} />
          </Button>
        </TooltipIconButton>
      </div>
    </div>
  );
};

export default Profilebar;
