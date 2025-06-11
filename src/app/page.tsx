import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, LogIn, Timer } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Homepage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-sidebar to-sidebar-border text-foreground flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0f_1px,transparent_1px)] [background-size:20px_20px] z-0 pointer-events-none" />
      <div className="relative z-10 backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl px-10 py-16 shadow-2xl text-center max-w-7xl">
        <div className="mb-8 flex justify-center">
          <Image
            src="/hourStack.png"
            alt="Chronogrid Logo"
            width={180}
            height={60}
            className="object-contain"
          />
        </div>

        <h1 className="text-4xl font-bold mb-4 tracking-tight">
          Start tracking you most valuable asset.
        </h1>

        {/* <p className="text-white/80 mb-10">Start Tracking it like a Pro</p> */}

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            variant="outline"
            className="cursor-pointer transition-transform hover:scale-105"
          >
            <Link href="/login" className="flex items-center">
              <LogIn className="mr-2 h-5 w-5" />
              Login
            </Link>
          </Button>

          <Button
            variant="outline"
            className=" transition-transform hover:scale-105"
          >
            <Link href="/console" className="flex items-center">
              <Timer className="mr-2 h-5 w-5" />
              Start Tracking
            </Link>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
          <Button
            variant="default"
            className="cursor-pointer transition-transform hover:scale-105"
          >
            <Link
              href="https://github.com/whoshriyansh/HourStack"
              target="_blank"
              className="flex items-center"
            >
              <Github />
            </Link>
          </Button>

          <Button
            variant="default"
            className=" transition-transform hover:scale-105"
          >
            <Link
              href="https://www.linkedin.com/in/whoshriyansh/"
              target="_blank"
              className="flex items-center"
            >
              <Linkedin />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
