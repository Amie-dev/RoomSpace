import React from "react";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const HomeHeader = () => {
  return (
    <TooltipProvider>
      <header
        className="flex justify-between items-center px-8 py-4 sticky top-0 z-50
        bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-lg
        border-b border-gray-200 shadow-md rounded-b-2xl transition-all duration-300"
      >
        {/* 🔹 Brand */}
        <div className="flex flex-col">
          <h1
            className="text-3xl font-extrabold bg-gradient-to-r 
            from-indigo-600 via-purple-500 to-pink-500
            bg-clip-text text-transparent tracking-tight drop-shadow-sm
            hover:brightness-110 hover:scale-105 transition-transform duration-200"
          >
            RoomSpace
          </h1>
        </div>

        {/* 🔹 Actions */}
        <div className="flex items-center gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://github.com/Amie-dev/RoomSpace" 
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  className="rounded-full h-14 w-14 flex items-center justify-center
                  hover:bg-indigo-100 hover:shadow-md
                  transition-all duration-200 hover:scale-110 active:scale-95"
                >
                  <Github className="h-9 w-9 text-gray-700 hover:text-indigo-600 transition-colors" />
                </Button>
              </a>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-sm font-medium">View on GitHub</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </header>
    </TooltipProvider>
  );
};

export default HomeHeader;
