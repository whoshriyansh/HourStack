import { calculateBlockHeight, calculateMinutesFromTop } from "@/lib/timeUtils";
import React from "react";

export default function TimeBlock({ block }) {
  const top = calculateMinutesFromTop(new Date(block.start));
  const height = calculateBlockHeight(
    new Date(block.start),
    new Date(block.end)
  );

  return (
    <div
      className="absolute left-0 w-full bg-red-700 text-white text-xs px-2 py-1 rounded"
      style={{ top: `${top}px`, height: `${height}px` }}
    >
      <strong>{block.task}</strong>
      <br />
      {block.project}
    </div>
  );
}
