import Image from "next/image";
import { MapPin, Square, DollarSign, ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface RideStatusProps {
  pickupAddress: string;
  destinationAddress: string;
  fare: string;
  paymentMethod: string;
}

interface StatusModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsRideOpne: (value: boolean) => void;
  setIsDriverOpen: (value: boolean) => void;
  data: RideStatusProps;
}

export function RideStatus({
  isOpen,
  data,
  setIsOpen,
  setIsRideOpne,
  setIsDriverOpen,
}: StatusModalProps) {
  return (
    <div
      className={cn(
        "absolute inset-x-0 bottom-0 z-20 bg-background rounded-t-3xl shadow-lg p-4 transition-transform duration-500 ease-in-out",
        isOpen ? "translate-y-0" : "translate-y-full pointer-events-none"
      )}
    >
      <div className="flex justify-center z-10">
        <Button
          variant={"ghost"}
          onClick={() => {
            setIsOpen(false);
            setIsRideOpne(true);
          }}
          className="cursor-pointer"
        >
          <ChevronDown size={28} strokeWidth={2.5} />
        </Button>
      </div>
      <div className="text-center text-lg font-semibold mb-4">
        Looking for nearby drivers
      </div>
      <div className="w-full h-0.5 bg-gray-200 mb-6" />

      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32 flex items-center justify-center rounded-full bg-purple-50/50">
          <Image
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
            alt="Car illustration"
            width={500}
            height={500}
            className="object-contain"
          />
        </div>
      </div>

      <div className="grid gap-4 mb-6">
        <div className="flex items-center">
          <MapPin className="h-5 w-5 mr-3 text-gray-600" />
          <div>
            <div className="font-semibold text-xl">
              {data.pickupAddress.split(",")[0]}
            </div>
            <div className="text-sm text-muted-foreground">
              {data.pickupAddress
                .substring(data.pickupAddress.indexOf(",") + 1)
                .trim()}
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex items-center">
          <Square className="h-5 w-5 mr-3 text-gray-600" />
          <div>
            <div className="font-semibold text-xl">
              {data.destinationAddress.split(",")[0]}
            </div>
            <div className="text-sm text-muted-foreground">
              {data.destinationAddress
                .substring(data.destinationAddress.indexOf(",") + 1)
                .trim()}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <div className="flex items-center">
          <DollarSign className="h-5 w-5 mr-3 text-gray-600" />
          <div>
            <div className="font-semibold text-xl">{data.fare}</div>
            <div className="text-sm text-muted-foreground">
              {data.paymentMethod}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-6">
        <Button
          onClick={() => {
            setIsDriverOpen(true);
            setIsOpen(false);
          }}
          className="cursor-pointer"
          variant={"default"}
        >
          Confirm
        </Button>
        <Button
          onClick={() => {
            setIsOpen(false);
            setIsRideOpne(true);
          }}
          className="cursor-pointer"
          variant={"secondary"}
        >
          Cencel
        </Button>
      </div>
    </div>
  );
}
