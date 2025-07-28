"use client";

import { useState } from "react";
import { OfflinePage } from "./_components/offline";
import { OnlinePage } from "./_components/online";
import { SingleRequestPage } from "./_components/single-request";
import { GoToPickupPage } from "./_components/go-to-pickup";
import { DropOffPage } from "./_components/drop-off";

type View =
  | "offline"
  | "online"
  | "single-request"
  | "go-to-pickup"
  | "drop-off";

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
  noted?: string;
  tripFareBreakdown: {
    label: string;
    value: string;
  }[];
}

export default function DriverApp() {
  const [currentView, setCurrentView] = useState<View>("offline");
  const [isOnline, setIsOnline] = useState(false);
  const [activeRequestId, setActiveRequestId] = useState<string | null>(null);
  const [incomingRequestId, setIncomingRequestId] = useState<string | null>(
    null
  );

  const requests: Request[] = [
    {
      id: "123456",
      user: { name: "Esther Berry", photo: "/images/driver-photo-esther.png" },
      fare: "$25.00",
      distance: "2.2 km",
      paymentMethod: "ApplePay",
      discount: "Discount",
      pickup: "7958 Swift Village",
      dropoff: "105 William St, Chicago, US",
      noted:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac vestibulum erat. Cras vulputate auctor lectus at consequat.",
      tripFareBreakdown: [
        { label: "Apple Pay", value: "$15.00" },
        { label: "Discount", value: "$10.00" },
        { label: "Paid amount", value: "$25.00" },
      ],
    },
    {
      id: "123457",
      user: { name: "Callie Greer", photo: "/images/driver-photo-callie.png" },
      fare: "$20.00",
      distance: "1.5 km",
      paymentMethod: "ApplePay",
      discount: "Discount",
      pickup: "62 Kobe Trafficway",
      dropoff: "280 Icie Park Suite 496",
      tripFareBreakdown: [],
    },
    {
      id: "123458",
      user: { name: "Earl Guerrero", photo: "/images/driver-photo-earl.png" },
      fare: "$10.00",
      distance: "0.5 km",
      paymentMethod: "ApplePay",
      pickup: "9965 Soledad Ports",
      dropoff: "123 Main St, Anytown, USA",
      tripFareBreakdown: [],
    },
    {
      id: "123458",
      user: { name: "Earl Guerrero", photo: "/images/driver-photo-earl.png" },
      fare: "$10.00",
      distance: "0.5 km",
      paymentMethod: "ApplePay",
      pickup: "9965 Soledad Ports",
      dropoff: "123 Main St, Anytown, USA",
      tripFareBreakdown: [],
    },
    {
      id: "123458",
      user: { name: "Earl Guerrero", photo: "/images/driver-photo-earl.png" },
      fare: "$10.00",
      distance: "0.5 km",
      paymentMethod: "ApplePay",
      pickup: "9965 Soledad Ports",
      dropoff: "123 Main St, Anytown, USA",
      tripFareBreakdown: [],
    },
    {
      id: "123458",
      user: { name: "Earl Guerrero", photo: "/images/driver-photo-earl.png" },
      fare: "$10.00",
      distance: "0.5 km",
      paymentMethod: "ApplePay",
      pickup: "9965 Soledad Ports",
      dropoff: "123 Main St, Anytown, USA",
      tripFareBreakdown: [],
    },
    {
      id: "123458",
      user: { name: "Earl Guerrero", photo: "/images/driver-photo-earl.png" },
      fare: "$10.00",
      distance: "0.5 km",
      paymentMethod: "ApplePay",
      pickup: "9965 Soledad Ports",
      dropoff: "123 Main St, Anytown, USA",
      tripFareBreakdown: [],
    },
    {
      id: "123458",
      user: { name: "Earl Guerrero", photo: "/images/driver-photo-earl.png" },
      fare: "$10.00",
      distance: "0.5 km",
      paymentMethod: "ApplePay",
      pickup: "9965 Soledad Ports",
      dropoff: "123 Main St, Anytown, USA",
      tripFareBreakdown: [],
    },
  ];

  const handleToggleOnline = (online: boolean) => {
    setIsOnline(online);
    if (online) {
      setCurrentView("online");
      // Simulate an incoming request after a short delay
      // setTimeout(() => {
      //   setIncomingRequestId(requests[0].id);
      // }, 2000);
    } else {
      setCurrentView("offline");
      setIncomingRequestId(null);
      setActiveRequestId(null);
    }
  };

  const handleAcceptRequest = (requestId: string) => {
    setActiveRequestId(requestId);
    setIncomingRequestId(null); // Clear incoming request
    setCurrentView("go-to-pickup");
  };

  const handleIgnoreRequest = (requestId: string) => {
    // For simplicity, just remove the incoming request and stay on online page
    setIncomingRequestId(null);
    // In a real app, you might fetch the next request or show a list
  };

  const handleViewRequest = (requestId: string) => {
    setActiveRequestId(requestId);
    setCurrentView("single-request");
  };

  const handleGoToPickup = (requestId: string) => {
    setCurrentView("go-to-pickup");
  };

  const handleArriveAtPickup = () => {
    setCurrentView("drop-off");
  };

  const handleCompleteDropoff = () => {
    // Ride completed, go back to online or offline
    setActiveRequestId(null);
    setIncomingRequestId(null);
    setCurrentView("online"); // Or "offline" if driver automatically goes offline
  };

  const handleGoBack = () => {
    if (currentView === "single-request") {
      setCurrentView("online");
    } else if (currentView === "go-to-pickup" || currentView === "drop-off") {
      // For simplicity, go back to online page after a ride is done
      setCurrentView("online");
      setActiveRequestId(null);
    }
  };

  const activeRequest = activeRequestId
    ? requests.find((req) => req.id === activeRequestId)
    : null;

  return (
    <main className="h-screen w-screen bg-gray-100 flex items-center justify-center">
      <div className="relative h-full w-full max-w-md bg-white shadow-lg overflow-hidden rounded-lg">
        {currentView === "offline" && (
          <OfflinePage
            isOnline={isOnline}
            onToggleOnline={handleToggleOnline}
          />
        )}

        {currentView === "online" && (
          <OnlinePage
            isOnline={isOnline}
            onToggleOnline={handleToggleOnline}
            requests={requests}
            onAcceptRequest={handleAcceptRequest}
            onIgnoreRequest={handleIgnoreRequest}
            onViewRequest={handleViewRequest}
            incomingRequestId={incomingRequestId}
          />
        )}

        {currentView === "single-request" && activeRequest && (
          <SingleRequestPage
            request={activeRequest}
            onGoBack={handleGoBack}
            onGoToPickup={handleGoToPickup}
          />
        )}

        {currentView === "go-to-pickup" && activeRequest && (
          <GoToPickupPage
            pickupAddress={activeRequest.pickup}
            onArriveAtPickup={handleArriveAtPickup}
            onGoBack={handleGoBack}
          />
        )}

        {currentView === "drop-off" && activeRequest && (
          <DropOffPage
            pickupAddress={activeRequest.pickup}
            destinationAddress={activeRequest.dropoff}
            fare={activeRequest.fare}
            eta="5 min" // Example ETA for drop-off
            distance="2.2 km" // Example distance for drop-off
            onCompleteDropoff={handleCompleteDropoff}
            onGoBack={handleGoBack}
          />
        )}
      </div>
    </main>
  );
}
