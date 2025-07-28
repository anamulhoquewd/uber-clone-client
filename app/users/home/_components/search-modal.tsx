"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronDown,
  MapPin,
  Plane,
  Briefcase,
  BedDouble,
  LocateFixed,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsRideOpen: (value: boolean) => void;
}

export function SearchModal({
  isOpen,
  setIsOpen,
  setIsRideOpen,
}: SearchModalProps) {
  const [pickupLocation, setPickupLocation] = useState("562/11-A"); // Pre-fill based on screenshot
  const [destination, setDestination] = useState("");

  const suggestions = [
    {
      icon: Plane,
      label: "Kempegowda International Airport...",
      address: "KIAL Rd, Devanahalli, Bengaluru, Karnataka",
    },
    {
      icon: MapPin,
      label: "Phoenix Marketcity",
      address: "Whitefield Rd, Devanahalli, Bengaluru, Karnataka",
    },
    {
      icon: Briefcase,
      label: "Salarpuria Aura Block B",
      address:
        "BLOCK-B, TOUCH STONE, Chandana, Kadabeesanahalli, Bengaluru, Karnataka",
    },
    {
      icon: BedDouble,
      label: "Sheraton Grand Bengaluru Whitefield...",
      address:
        "Prestige Shantiniketan Hoodi, Whitefield, Thigalarapalya, Bengaluru, Karnataka",
    },
    {
      icon: MapPin,
      label: "KSR Bengaluru City Junction (Bangalore)",
      address: "KSR Railway Mg. Rd, Bengaluru, Karnataka",
    },
    {
      icon: LocateFixed,
      label: "Set location on map",
      address: "",
    },
  ];

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 h-screen bg-background shadow-lg transition-transform duration-500 ease-in-out",
        isOpen ? "translate-y-0" : "translate-y-full pointer-events-none"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="relative p-4 border-b">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full"
            onClick={() => setIsOpen(false)}
            aria-label="Close search"
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
          <div className="flex flex-col items-center justify-center pt-2">
            <span className="font-semibold text-lg">Choose a destination</span>
          </div>
        </div>

        <div className="p-4 grid gap-3">
          <div className="relative flex items-center">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-black" />
            <Input
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              placeholder="Add a pick-up location"
              className="pl-8 bg-muted/50 border-none rounded-lg"
              aria-label="Pick-up location"
            />
          </div>
          <div className="relative flex items-center">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-black" />
            <Input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter your destination"
              className="pl-8 bg-muted/50 border-none rounded-lg"
              aria-label="Destination"
            />
          </div>
        </div>

        <ScrollArea className="flex-1 overflow-auto">
          <div className="p-4 pt-0">
            {suggestions.map((suggestion, index) => (
              <div key={index}>
                <div className="flex items-center py-3">
                  <div className="flex items-center justify-center w-8 h-8 mr-3 text-muted-foreground">
                    <suggestion.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{suggestion.label}</div>
                    <div className="text-sm text-muted-foreground">
                      {suggestion.address}
                    </div>
                  </div>
                </div>
                {index < suggestions.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </ScrollArea>
        <Button
          variant={"default"}
          onClick={() => {
            setIsRideOpen(true);
            setIsOpen(false);
          }}
          className="m-4"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
