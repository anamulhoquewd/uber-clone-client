import {
  MessageSquare,
  Share2,
  Phone,
  Shield,
  Star,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface DriverInfoData {
  driverName: string;
  driverPhoto: string;
  vehiclePlate: string;
  vehicleModel: string;
  driverRating: number;
  eta: string;
  pickupStatus: string;
}

interface DriverInfoProps {
  data: DriverInfoData;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function DriverInfo({ data, isOpen, setIsOpen }: DriverInfoProps) {
  return (
    <div
      className={cn(
        "translate-y-full h-4/6 absolute inset-x-0 bottom-0 z-20 bg-background rounded-t-3xl shadow-lg p-4 pb-20 transition-transform duration-500 ease-in-out",
        isOpen ? "translate-y-0" : "translate-y-full pointer-events-none"
      )}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-semibold">{data.pickupStatus}</div>
          <div className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
            {data.eta}
          </div>
        </div>

        <div className="flex items-center mb-6">
          <Avatar className="h-16 w-16 mr-4">
            <AvatarImage
              src={data.driverPhoto || "/placeholder.svg"}
              alt={data.driverName}
            />
            <AvatarFallback>{data.driverName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-bold text-xl">{data.driverName}</div>
            <div className="text-sm text-muted-foreground flex items-center">
              {data.vehicleModel}{" "}
              <Star className="h-3 w-3 ml-2 mr-1 fill-yellow-400 text-yellow-400" />{" "}
              {data.driverRating.toFixed(1)}
            </div>
            <div className="text-lg font-semibold">{data.vehiclePlate}</div>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full mb-6 flex items-center justify-center py-2 bg-transparent"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Send a message...
        </Button>

        <div className="flex justify-around mb-6">
          <div className="flex flex-col items-center text-sm text-muted-foreground">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-gray-100 mb-2"
            >
              <Shield className="h-5 w-5" />
            </Button>
            Safety
          </div>
          <div className="flex flex-col items-center text-sm text-muted-foreground">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-gray-100 mb-2"
            >
              <Share2 className="h-5 w-5" />
            </Button>
            Share my trip
          </div>
          <div className="flex flex-col items-center text-sm text-muted-foreground">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-gray-100 mb-2"
            >
              <Phone className="h-5 w-5" />
            </Button>
            Call driver
          </div>
        </div>

        <div className="flex items-center border-t pt-4">
          <MapPin className="h-5 w-5 mr-3 text-gray-600" />
          <div>
            <div className="font-medium">562/11-A</div>
            <div className="text-sm text-muted-foreground">
              Kaikondrahalli, Bengaluru, Karnataka
            </div>
          </div>
        </div>

        <Button
          variant={"destructive"}
          onClick={() => {
            setIsOpen(false);
          }}
          className="w-full my-6"
        >
          Cencel
        </Button>
      </div>
    </div>
  );
}
