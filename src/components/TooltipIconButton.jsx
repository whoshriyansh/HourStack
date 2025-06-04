import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

const TooltipIconButton = ({ children, tooltip, side }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side}>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default TooltipIconButton;
