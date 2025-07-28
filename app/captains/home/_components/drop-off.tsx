"use client";

import { MapBackground } from "./map-background";
import { ArrowLeft, CornerDownRight, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DropOffPageProps {
  pickupAddress: string;
  destinationAddress: string;
  fare: string;
  eta: string;
  distance: string;
  onCompleteDropoff: () => void;
  onGoBack: () => void;
}

export function DropOffPage({
  pickupAddress,
  destinationAddress,
  fare,
  eta,
  distance,
  onCompleteDropoff,
  onGoBack,
}: DropOffPageProps) {
  const navigationSteps = [
    {
      icon: ArrowUp,
      text: "Head southwest on Madison St",
      details: "18 miles",
    },
    {
      icon: CornerDownRight,
      text: "Turn left onto 4th Ave",
      details: "12 miles",
    },
    {
      icon: CornerDownRight,
      text: "Turn right at 105th N Link Rd",
      details: "Pass by Executive Hotel Pacific (on the left) 40 miles",
    },
    {
      icon: CornerDownRight,
      text: "Turn right at 105 William St, Chicago, US",
      details: "250 miles",
    },
    {
      icon: ArrowUp,
      text: "Continue straight to stay on Vancouver",
      details: "Entering California 24 miles",
    },
    {
      icon: CornerDownRight,
      text: "Keep left, follow signs for SF Intl Airport",
      details: "",
    },
  ];

  return (
    <div className="relative h-full w-full flex flex-col">
      <MapBackground>
        <header className="absolute top-0 inset-x-0 z-10 p-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-black"
            onClick={onGoBack}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold">Drop off</h1>
          <div className="w-6" /> {/* Placeholder for alignment */}
        </header>
        <div className="absolute top-16 inset-x-0 bg-orange-500 text-white p-3 flex items-center text-sm">
          <CornerDownRight className="h-5 w-5 mr-2" />
          <span className="font-semibold mr-1">250m</span> Turn right at 105
          William St, Chicago, US
        </div>
      </MapBackground>

      <div className="absolute inset-x-0 bottom-0 z-20 bg-background rounded-t-3xl shadow-lg p-4 pb-6">
        <div className="flex items-center mb-4">
          <Avatar className="h-10 w-10 mr-3 bg-orange-500 text-white font-bold text-lg flex items-center justify-center">
            A
          </Avatar>
          <div>
            <div className="text-xs text-muted-foreground">Pick up at</div>
            <div className="font-semibold text-lg">{pickupAddress}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center mb-6">
          <div className="p-2 rounded-lg">
            <div className="text-xl font-bold">{eta}</div>
            <div className="text-sm text-muted-foreground">EST</div>
          </div>
          <div className="p-2 rounded-lg">
            <div className="text-xl font-bold">{distance}</div>
            <div className="text-sm text-muted-foreground">Distance</div>
          </div>
          <div className="p-2 rounded-lg">
            <div className="text-xl font-bold">{fare}</div>
            <div className="text-sm text-muted-foreground">Fare</div>
          </div>
        </div>

        <Button
          className="w-full bg-yellow-400 text-black py-3 text-lg font-semibold hover:bg-yellow-500 mb-6"
          onClick={onCompleteDropoff}
        >
          DROP OFF
        </Button>

        <ScrollArea className="h-[200px] overflow-auto">
          <div className="grid gap-4">
            {navigationSteps.map((step, index) => (
              <div key={index} className="flex items-start">
                <step.icon className="h-5 w-5 mr-3 text-gray-600 mt-1" />
                <div>
                  <div className="font-medium">{step.text}</div>
                  {step.details && (
                    <div className="text-sm text-muted-foreground">
                      {step.details}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
