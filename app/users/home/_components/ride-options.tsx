"use client";

import Image from "next/image";
import { ChevronDown, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "@/components/ui/button";

interface RideOption {
  type: string;
  image: string;
  capacity: number;
  eta: string;
  price: string;
  description: string;
}

interface RideOptionsModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsSearchOpen: (value: boolean) => void;
  setIsStatusOpen: (value: boolean) => void;
}

const rideOptions: RideOption[] = [
  {
    type: "UberGo3",
    image:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png",
    capacity: 4,
    eta: "2 mins away - 15:24",
    price: "₹193.20",
    description: "Affordable, compact rides",
  },
  {
    type: "UberGo2",
    image:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png",
    capacity: 4,
    eta: "2 mins away - 15:24",
    price: "₹193.20",
    description: "Affordable, compact rides",
  },
  {
    type: "UberGo1",
    image:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png",
    capacity: 4,
    eta: "2 mins away - 15:24",
    price: "₹193.20",
    description: "Affordable, compact rides",
  },
  {
    type: "Moto",
    image:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
    capacity: 1,
    eta: "3 mins away - 15:24",
    price: "₹65.17",
    description: "Affordable motorcycle rides",
  },
  {
    type: "Premier",
    image:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png",
    capacity: 4,
    eta: "4 mins away - 15:25",
    price: "₹193.20",
    description: "Comfortable sedans, top-quality drivers",
  },
  {
    type: "UberAuto",
    image:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
    capacity: 3,
    eta: "2 mins away - 15:24",
    price: "₹118.21",
    description: "Affordable auto-rickshaw rides",
  },
];

export function RideOptions({
  isOpen,
  setIsOpen,
  setIsSearchOpen,
  setIsStatusOpen,
}: RideOptionsModalProps) {
  const [selectedOption, setSelectedOption] = useState<string>(
    rideOptions[0].type
  );

  return (
    <div
      className={cn(
        "translate-y-full h-5/6 absolute inset-x-0 bottom-0 z-20 bg-background rounded-t-3xl shadow-lg p-4 pb-20 transition-transform duration-500 ease-in-out",
        isOpen ? "translate-y-0" : "translate-y-full pointer-events-none"
      )}
    >
      <div className="flex justify-center z-10">
        <Button
          variant={"ghost"}
          onClick={() => {
            setIsOpen(false);
            setIsSearchOpen(true);
          }}
          className="cursor-pointer"
        >
          <ChevronDown size={28} strokeWidth={2.5} />
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)] overflow-auto">
        <div className="grid gap-3">
          {rideOptions.map((option) => (
            <div
              key={option.type}
              className={cn(
                "flex items-center p-3 rounded-lg border transition-colors cursor-pointer hover:bg-gray-100",
                selectedOption === option.type
                  ? "border-2 border-black"
                  : "border-transparent border-2"
              )}
              onClick={() => setSelectedOption(option.type)}
            >
              <Image
                src={option.image || "/placeholder.svg"}
                alt={option.type}
                width={60}
                height={60}
                className="object-contain mr-4"
              />
              <div className="flex-1">
                <div className="font-semibold flex items-center">
                  {option.type}
                  <User className="h-3 w-3 ml-1 mr-0.5" />
                  {option.capacity}
                </div>
                <div className="text-sm text-muted-foreground">
                  {option.eta}
                </div>
                <div className="text-sm text-muted-foreground">
                  {option.description}
                </div>
              </div>
              <div className="font-semibold text-lg">{option.price}</div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Button OUTSIDE scroll area */}
      <div className="absolute bottom-2 left-0 right-0 px-4">
        <Button
          variant={"default"}
          onClick={() => {
            setIsStatusOpen(true);
            setIsOpen(false);
          }}
          className="w-full"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
