"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Navigation, Clock, Star } from "lucide-react";

export default function SearchLocationPage() {
  const router = useRouter();
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");

  const handleContinue = () => {
    if (pickupLocation && destination) {
      // Store locations in localStorage or state management
      localStorage.setItem(
        "rideBooking",
        JSON.stringify({
          pickup: pickupLocation,
          destination: destination,
        })
      );
      router.push("/select-vehicle");
    }
  };

  const suggestedLocations = [
    { name: "Current Location", address: "Use GPS location", icon: Navigation },
    { name: "Home", address: "123 Main Street", icon: MapPin },
    { name: "Work", address: "456 Business Ave", icon: MapPin },
    { name: "Airport", address: "International Airport", icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/home">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <span className="text-xl font-bold text-gray-900">Ride</span>
          <div className="w-9" />
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Page Title */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Where to?</h1>
          <p className="text-gray-600">Enter your pickup and destination</p>
        </div>

        {/* Location Inputs */}
        <div className="space-y-4">
          {/* Pickup Location */}
          <div className="space-y-2">
            <Label
              htmlFor="pickup"
              className="text-sm font-medium text-gray-700"
            >
              Pickup Location
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <Input
                id="pickup"
                type="text"
                placeholder="Enter pickup location"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="pl-10 h-14 text-lg border-2 border-gray-200 focus:border-black rounded-xl"
              />
            </div>
          </div>

          {/* Destination */}
          <div className="space-y-2">
            <Label
              htmlFor="destination"
              className="text-sm font-medium text-gray-700"
            >
              Destination
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
              <Input
                id="destination"
                type="text"
                placeholder="Where are you going?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="pl-10 h-14 text-lg border-2 border-gray-200 focus:border-black rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Suggested Locations */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Suggested Locations
          </h2>
          <div className="space-y-2">
            {suggestedLocations.map((location, index) => {
              const IconComponent = location.icon;
              return (
                <Card
                  key={index}
                  className="border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    if (!pickupLocation) {
                      setPickupLocation(location.name);
                    } else if (!destination) {
                      setDestination(location.name);
                    }
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {location.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {location.address}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Searches */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Searches
          </h2>
          <div className="space-y-2">
            <Card className="border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      Home → Downtown Office
                    </p>
                    <p className="text-sm text-gray-600">Yesterday, 8:30 AM</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">4.8</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      Airport → Hotel Plaza
                    </p>
                    <p className="text-sm text-gray-600">Last week</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">4.9</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Continue Button */}
        <div className="pt-4">
          <Button
            onClick={handleContinue}
            disabled={!pickupLocation || !destination}
            className="w-full h-14 bg-black hover:bg-gray-800 text-white text-lg font-semibold rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
