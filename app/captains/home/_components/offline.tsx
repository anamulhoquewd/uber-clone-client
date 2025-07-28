import { MapBackground } from "./map-background";
import { Menu, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface OfflinePageProps {
  isOnline: boolean;
  onToggleOnline: (online: boolean) => void;
}

export function OfflinePage({ isOnline, onToggleOnline }: OfflinePageProps) {
  return (
    <div className="relative h-full w-full flex flex-col">
      <MapBackground>
        <header className="absolute top-0 inset-x-0 z-10 p-4 flex items-center justify-between">
          <Button
            variant={"ghost"}
            size={"sm"}
            className="bg-gray-500 hover:bg-gray-600"
          >
            <Switch
              className="cursor-pointer"
              checked={isOnline}
              onCheckedChange={onToggleOnline}
            />
          </Button>
          <h1 className="text-xl font-semibold">Offline</h1>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-black"
          >
            <User className="h-6 w-6" />
          </Button>
        </header>
      </MapBackground>

      <div className="absolute inset-x-0 bottom-0 z-20 bg-background rounded-t-3xl shadow-lg p-4 pb-20">
        <div className="bg-orange-500 text-white p-4 rounded-lg flex items-center mb-6">
          <div className="bg-white/20 p-2 rounded-full mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-moon-star"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              <path d="M16.5 3.5L18 2l1.5 1.5" />
              <path d="M17.5 6.5L19 5l1.5 1.5" />
              <path d="M13.5 7.5L15 6l1.5 1.5" />
            </svg>
          </div>
          <div>
            <div className="font-bold text-lg">You are offline !</div>
            <div className="text-sm">Go online to start accepting jobs.</div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Avatar className="h-12 w-12 mr-3">
              <AvatarImage
                src="/images/driver-photo-jeremiah.png"
                alt="Jeremiah Curtis"
              />
              <AvatarFallback>JC</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-lg">Jeremiah Curtis</div>
              <div className="text-sm text-muted-foreground">Basic level</div>
            </div>
          </div>
          <div className="text-lg font-bold">$325.00</div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="text-2xl font-bold">10.2</div>
            <div className="text-sm text-muted-foreground">HOURS ONLINE</div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="text-2xl font-bold">30 KM</div>
            <div className="text-sm text-muted-foreground">TOTAL DISTANCE</div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="text-2xl font-bold">20</div>
            <div className="text-sm text-muted-foreground">TOTAL JOBS</div>
          </div>
        </div>
      </div>
    </div>
  );
}
