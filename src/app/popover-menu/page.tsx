import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { MoreHorizontal } from "lucide-react";
import React from "react";

function PopOverMenuComponent() {
  return (
    <div className="min-h-screen bg-neutral-50 p-12">
      <div className="mb-8 p-4 bg-white rounded-lg border">
        <h2 className="font-semibold mb-2">Exact Edge Alignment Test</h2>
        <p className="text-sm text-neutral-600">
          Red border = trigger container. Content should start exactly at trigger&apos;s edge with sideOffset=0
        </p>
      </div>

      <div className="space-y-16">
        
        {/* RIGHT SIDE - all alignments */}
        <div>
          <h3 className="text-sm font-semibold mb-6 text-neutral-700">
            {`side="right" - Content should start at right edge of trigger`}
          </h3>
          <div className="flex gap-24 items-start">
            
            {/* align="start" */}
            <div className="flex flex-col gap-4">
              <div className="text-xs text-neutral-500 mb-2">{`align="start"`}</div>
              <Popover>
                <div className="border-2 border-red-600 inline-block">
                  <PopoverTrigger>
                    <div className="flex items-center justify-center w-12 h-12 text-neutral-700 rounded-full border-2 border-orange-500 bg-white shadow-lg">
                      <MoreHorizontal className="w-5 h-5" />
                    </div>
                  </PopoverTrigger>
                </div>
                <PopoverContent
                  side="right"
                  align="start"
                  sideOffset={0}
                  collisionPadding={0}
                  className="w-48"
                >
                  <div className="text-xs text-neutral-600">
                    Should align to <strong>top edge</strong> of trigger
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* align="center" */}
            <div className="flex flex-col gap-4">
              <div className="text-xs text-neutral-500 mb-2">{`align="center"`}</div>
              <Popover>
                <div className="border-2 border-red-600 inline-block">
                  <PopoverTrigger>
                    <div className="flex items-center justify-center w-12 h-12 text-neutral-700 rounded-full border-2 border-orange-500 bg-white shadow-lg">
                      <MoreHorizontal className="w-5 h-5" />
                    </div>
                  </PopoverTrigger>
                </div>
                <PopoverContent
                  side="right"
                  align="center"
                  sideOffset={0}
                  collisionPadding={0}
                  className="w-48"
                >
                  <div className="text-xs text-neutral-600">
                    Should <strong>center vertically</strong> on trigger
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* align="end" */}
            <div className="flex flex-col gap-4">
              <div className="text-xs text-neutral-500 mb-2">{`align="end"`}</div>
              <Popover>
                <div className="border-2 border-red-600 inline-block">
                  <PopoverTrigger>
                    <div className="flex items-center justify-center w-12 h-12 text-neutral-700 rounded-full border-2 border-orange-500 bg-white shadow-lg">
                      <MoreHorizontal className="w-5 h-5" />
                    </div>
                  </PopoverTrigger>
                </div>
                <PopoverContent
                  side="right"
                  align="end"
                  sideOffset={0}
                  collisionPadding={0}
                  className="w-48"
                >
                  <div className="text-xs text-neutral-600">
                    Should align to <strong>bottom edge</strong> of trigger
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PopOverMenuComponent;