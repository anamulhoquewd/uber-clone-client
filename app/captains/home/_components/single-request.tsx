"use client";

import { MapBackground } from "./map-background";
import { ArrowLeft, Phone, MessageSquare, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface SingleRequestPageProps {
  request: {
    id: string;
    user: {
      name: string;
      photo: string;
    };
    fare: string;
    distance: string;
    paymentMethod: string;
    discount?: string;
    pickup: string;
    dropoff: string;
    noted?: string;
    tripFareBreakdown: {
      label: string;
      value: string;
    }[];
  };
  onGoBack: () => void;
  onGoToPickup: (requestId: string) => void;
}

export function SingleRequestPage({
  request,
  onGoBack,
  onGoToPickup,
}: SingleRequestPageProps) {
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
          <h1 className="text-xl font-semibold">#{request.id}</h1>
          <div className="w-6" /> {/* Placeholder for alignment */}
        </header>
      </MapBackground>

      <div className="absolute inset-x-0 bottom-0 z-20 bg-background rounded-t-3xl shadow-lg p-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Avatar className="h-12 w-12 mr-3">
              <AvatarImage
                src={request.user.photo || "/placeholder.svg"}
                alt={request.user.name}
              />
              <AvatarFallback>{request.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-lg">{request.user.name}</div>
              <div className="flex items-center text-sm">
                {request.paymentMethod && (
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full mr-1">
                    {request.paymentMethod}
                  </span>
                )}
                {request.discount && (
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                    {request.discount}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="text-lg font-bold">
            {request.fare}
            <span className="text-sm text-muted-foreground ml-1">
              {request.distance}
            </span>
          </div>
        </div>

        <div className="grid gap-4 mb-6">
          <div>
            <div className="text-xs text-muted-foreground">PICK UP</div>
            <div className="font-medium">{request.pickup}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">DROP OFF</div>
            <div className="font-medium">{request.dropoff}</div>
          </div>
          {request.noted && (
            <div>
              <div className="text-xs text-muted-foreground">NOTED</div>
              <div className="text-sm text-gray-700">{request.noted}</div>
            </div>
          )}
        </div>

        <div className="mb-6">
          <div className="text-xs text-muted-foreground mb-2">TRIP FARE</div>
          {request.tripFareBreakdown.map((item, index) => (
            <div key={index} className="flex justify-between text-sm mb-1">
              <div>{item.label}</div>
              <div className="font-medium">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mb-6">
          <Button className="flex-1 bg-green-500 text-white py-3 text-lg font-semibold hover:bg-green-600">
            <Phone className="h-5 w-5 mr-2" /> Call
          </Button>
          <Button className="flex-1 bg-blue-500 text-white py-3 text-lg font-semibold hover:bg-blue-600">
            <MessageSquare className="h-5 w-5 mr-2" /> Message
          </Button>
          <Button className="flex-1 bg-gray-200 text-gray-800 py-3 text-lg font-semibold hover:bg-gray-300">
            <Trash2 className="h-5 w-5 mr-2" /> Cancel
          </Button>
        </div>

        <Button
          className="w-full bg-yellow-400 text-black py-3 text-lg font-semibold hover:bg-yellow-500"
          onClick={() => onGoToPickup(request.id)}
        >
          GO TO PICK UP
        </Button>
      </div>
    </div>
  );
}
