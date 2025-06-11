import React from "react";
import { X, Code, Video, Sun, Moon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TooltipIconButton from "@/components/helpers/TooltipIconButton";
import useUIStore from "@/store/uiStore";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const Profilebar = () => {
  const router = useRouter();
  const { setTheme } = useTheme();

  const closeSidebar = useUIStore((state) => state.closeSidebar);

  return (
    <div className="w-12 h-full flex flex-col items-center justify-between pt-10 pb-5  bg-background">
      <div className="block lg:hidden">
        <TooltipIconButton tooltip="Close" side="right">
          <Button
            className="cursor-pointer"
            variant="outline"
            size="sm"
            onClick={closeSidebar}
          >
            <X size={24} />
          </Button>
        </TooltipIconButton>
      </div>

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
