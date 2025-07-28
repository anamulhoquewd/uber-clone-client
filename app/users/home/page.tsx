"use client";

import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchModal } from "./_components/search-modal";
import { RideOptions } from "./_components/ride-options";
import { RideStatus } from "./_components/ride-status";
import { DriverInfo } from "./_components/driver-info";

export default function Component() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isRideOptionsOpne, setIsRideOptionsOpne] = useState<boolean>(false);
  const [isRideStatusOpen, setIsRideStatusOpen] = useState<boolean>(false);
  const [isDriverOpne, setIsDriverOpen] = useState<boolean>(false);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 inset-x-0 z-10 p-4 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent">
        <h1 className="text-2xl font-bold text-white">Uber</h1>
        <Button variant="ghost" size="icon" className="rounded-full text-white">
          <User className="h-6 w-6" />
          <span className="sr-only">Profile</span>
        </Button>
      </header>

      {/* Background Map Image */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          isSearchModalOpen ? "opacity-0" : "opacity-100"
        )}
      >
        <Image
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map of the city with ride-hailing cars"
          layout="fill"
          objectFit="cover"
          priority // Prioritize loading of the map image [^3]
        />
      </div>

      {/* Initial Search Input Section */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-20 bg-background rounded-t-3xl shadow-lg p-4 transition-transform duration-500 ease-in-out",
          isSearchModalOpen ? "translate-y-full" : "translate-y-0"
        )}
      >
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-4">Find a trip</h2>
          <div className="grid gap-3">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-black" />
              <Input
                onClick={() => setIsSearchModalOpen(true)}
                placeholder="Add a pick-up location"
                className="pl-8 bg-muted/50 border-none rounded-lg cursor-pointer"
                readOnly // Make it read-only to only trigger modal on click
                aria-label="Add a pick-up location"
              />
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-black" />
              <Input
                onClick={() => setIsSearchModalOpen(true)}
                placeholder="Enter your destination"
                className="pl-8 bg-muted/50 border-none rounded-lg cursor-pointer"
                readOnly // Make it read-only to only trigger modal on click
                aria-label="Enter your destination"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          Leave Now
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        setIsOpen={setIsSearchModalOpen}
        setIsRideOpen={setIsRideOptionsOpne}
      />

      <RideOptions
        isOpen={isRideOptionsOpne}
        setIsOpen={setIsRideOptionsOpne}
        setIsSearchOpen={setIsSearchModalOpen}
        setIsStatusOpen={setIsRideStatusOpen}
      />
      <RideStatus
        data={{
          destinationAddress: "South banasree.",
          fare: "3km",
          paymentMethod: "COD",
          pickupAddress: "Malibug",
        }}
        isOpen={isRideStatusOpen}
        setIsOpen={setIsRideStatusOpen}
        setIsRideOpne={setIsRideOptionsOpne}
        setIsDriverOpen={setIsDriverOpen}
      />

      <DriverInfo
        data={{
          driverName: "Anamul Hoque",
          driverPhoto: "",
          vehiclePlate: "PG-12-4554",
          vehicleModel: "",
          driverRating: 5,
          eta: "20m",
          pickupStatus: "See you soon",
        }}
        isOpen={isDriverOpne}
        setIsOpen={setIsDriverOpen}
      />
    </div>
  );
}
