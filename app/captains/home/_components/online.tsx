"use client";

import { MapBackground } from "./map-background";
import { Menu, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Request {
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
}

interface OnlinePageProps {
  isOnline: boolean;
  onToggleOnline: (online: boolean) => void;
  requests: Request[];
  onAcceptRequest: (requestId: string) => void;
  onIgnoreRequest: (requestId: string) => void;
  onViewRequest: (requestId: string) => void;
  incomingRequestId?: string | null; // ID of the request currently being shown as incoming
}

export function OnlinePage({
  isOnline,
  onToggleOnline,
  requests,
  onAcceptRequest,
  onIgnoreRequest,
  onViewRequest,
  incomingRequestId,
}: OnlinePageProps) {
  const incomingRequest = incomingRequestId
    ? requests.find((req) => req.id === incomingRequestId)
    : null;

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
          <h1 className="text-xl font-semibold">Online</h1>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-black"
          >
            <User className="h-6 w-6" />
          </Button>
        </header>
      </MapBackground>

      <div className="absolute inset-x-0 bottom-0 z-20 bg-background rounded-t-3xl shadow-lg p-4 pb-6">
        {incomingRequest ? (
          // Single Incoming Request View
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-3">
                  <AvatarImage
                    src={incomingRequest.user.photo || "/placeholder.svg"}
                    alt={incomingRequest.user.name}
                  />
                  <AvatarFallback>
                    {incomingRequest.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-lg">
                    {incomingRequest.user.name}
                  </div>
                  <div className="flex items-center text-sm">
                    {incomingRequest.paymentMethod && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full mr-1">
                        {incomingRequest.paymentMethod}
                      </span>
                    )}
                    {incomingRequest.discount && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                        {incomingRequest.discount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-lg font-bold">
                {incomingRequest.fare}
                <span className="text-sm text-muted-foreground ml-1">
                  {incomingRequest.distance}
                </span>
              </div>
            </div>

            <div className="grid gap-2 mb-6">
              <div>
                <div className="text-xs text-muted-foreground">PICK UP</div>
                <div className="font-medium">{incomingRequest.pickup}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">DROP OFF</div>
                <div className="font-medium">{incomingRequest.dropoff}</div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1 py-3 text-lg font-semibold bg-transparent"
                onClick={() => onIgnoreRequest(incomingRequest.id)}
              >
                Ignore
              </Button>
              <Button
                className="flex-1 bg-yellow-400 text-black py-3 text-lg font-semibold hover:bg-yellow-500"
                onClick={() => onAcceptRequest(incomingRequest.id)}
              >
                Accept
              </Button>
            </div>
          </>
        ) : (
          // List of Requests View
          <>
            {requests.length > 0 && (
              <div className="bg-orange-500 text-white p-4 rounded-lg flex items-center justify-center mb-6">
                <div className="font-bold text-lg">
                  You have {requests.length} new requests.
                </div>
              </div>
            )}

            <ScrollArea className="h-[calc(100vh-200px)] overflow-auto">
              <div className="grid gap-4">
                {requests.map((request) => (
                  <div
                    key={request.id}
                    className="border rounded-lg p-4 cursor-pointer transition-colors hover:bg-gray-100"
                    onClick={() => onViewRequest(request.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage
                            src={request.user.photo || "/placeholder.svg"}
                            alt={request.user.name}
                          />
                          <AvatarFallback>
                            {request.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">
                            {request.user.name}
                          </div>
                          <div className="flex items-center text-xs">
                            {request.paymentMethod && (
                              <span className="bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded-full mr-1">
                                {request.paymentMethod}
                              </span>
                            )}
                            {request.discount && (
                              <span className="bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded-full">
                                {request.discount}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-base font-bold">
                        {request.fare}
                        <span className="text-xs text-muted-foreground ml-1">
                          {request.distance}
                        </span>
                      </div>
                    </div>
                    <div className="grid gap-1">
                      <div>
                        <div className="text-xs text-muted-foreground">
                          PICK UP
                        </div>
                        <div className="font-medium text-sm">
                          {request.pickup}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">
                          DROP OFF
                        </div>
                        <div className="font-medium text-sm">
                          {request.dropoff}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </>
        )}
      </div>
    </div>
  );
}
