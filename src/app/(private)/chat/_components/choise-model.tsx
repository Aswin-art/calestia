"use client";

import React, { useState } from "react";
import { TIER_CONFIG_MODEL } from "@/assets/data";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, CircleCheck } from "lucide-react";

const ChoiseModel: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState(TIER_CONFIG_MODEL[0]); // Default model pertama

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-auto flex-col items-start -space-y-2.5 text-left"
        >
          <div className="flex items-center gap-x-3.5">
            <h3 className="text-2xl font-medium text-white">Calestia</h3>
            <ChevronDown className="size-6" />
          </div>
          <p className="text-lg text-neutral-400">{selectedModel.title}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 rounded-lg bg-neutral-800 md:w-96"
        align="start"
      >
        {TIER_CONFIG_MODEL.map((item, index) => (
          <DropdownMenuItem key={index} onClick={() => setSelectedModel(item)}>
            <div className="flex w-full cursor-pointer items-center justify-between px-2 py-0.5 transition-all hover:rounded-lg hover:border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] hover:text-[rgba(255,255,255,0.8)] hover:backdrop-blur-[30px]">
              <div>
                <h4 className="text-lg">{item.title}</h4>
                <p className="text-muted-foreground text-sm font-medium">
                  {item.description}
                </p>
              </div>
              {selectedModel.model === item.model && (
                <CircleCheck className="size-6 text-green-400" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChoiseModel;
