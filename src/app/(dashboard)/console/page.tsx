import ClientCard from "@/components/console/ClientsCard";
import ProjectCard from "@/components/console/ProjectCard";
import { TimeChart } from "@/components/console/TimeChart";
import { UserCard } from "@/components/console/UserCard";
import React from "react";

const Console = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 py-2">
      <div className="lg:col-span-3">
        <TimeChart />
      </div>
      <div>
        <UserCard />
      </div>
      <div>
        <ProjectCard />
      </div>
      <div>
        <ClientCard />
      </div>
    </div>
  );
};

export default Console;
