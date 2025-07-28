"use client";

import { MapBackground } from "./map-background";
import { ArrowLeft, CornerDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

interface GoToPickupPageProps {
  pickupAddress: string;
  onArriveAtPickup: () => void;
  onGoBack: () => void;
}

export function GoToPickupPage({
  pickupAddress,
  onArriveAtPickup,
  onGoBack,
}: GoToPickupPageProps) {
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
          <h1 className="text-xl font-semibold">Pick up</h1>
          <div className="w-6" /> {/* Placeholder for alignment */}
        </header>
        <div className="absolute top-16 inset-x-0 bg-orange-500 text-white p-3 flex items-center text-sm">
          <CornerDownRight className="h-5 w-5 mr-2" />
          <span className="font-semibold mr-1">250m</span> Turn right at 105
          William St, Chicago, US
        </div>
      </MapBackground>

      <div className="absolute inset-x-0 bottom-0 z-20 bg-background rounded-t-3xl shadow-lg p-4 pb-10">
        <div className="flex items-center mb-4">
          <Avatar className="h-10 w-10 mr-3 bg-orange-500 text-white font-bold text-lg flex items-center justify-center">
            A
          </Avatar>
          <div>
            <div className="text-xs text-muted-foreground">Pick up at</div>
            <div className="font-semibold text-lg">{pickupAddress}</div>
          </div>
        </div>

        <Button
          className="w-full bg-yellow-400 text-black py-3 text-lg font-semibold hover:bg-yellow-500"
          onClick={onArriveAtPickup}
        >
          ARRIVED AT PICKUP
        </Button>
      </div>
    </div>
  );
}
