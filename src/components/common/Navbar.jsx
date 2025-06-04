"use client";

import React from "react";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import useUIStore from "@/store/uiStore";
import TooltipIconButton from "./helpers/TooltipIconButton";
import { Button } from "./ui/button";

const Navbar = () => {
  const openSidebar = useUIStore((state) => state.openSidebar);

  return (
    <div className="h-14 bg-sidebar px-4 flex justify-start items-center gap-4">
      <TooltipIconButton tooltip="open" side={"bottom"}>
        <Button
          className="cursor-pointer"
          variant="outline"
          size="lg"
          onClick={openSidebar}
        >
          <MenuIcon />
        </Button>
      </TooltipIconButton>

      <div>
        <Image src="/ChronogridLogo.png" alt="Logo" width={100} height={32} />
      </div>
    </div>
  );
};

export default Navbar;
