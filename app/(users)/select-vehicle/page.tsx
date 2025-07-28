"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Car, Bike, Truck, Zap, Clock, Users } from "lucide-react";

type VehicleType = "car" | "bike" | "truck" | "cng";

interface Vehicle {
  id: VehicleType;
  name: string;
  icon: React.ComponentType<any>;
  price: string;
  eta: string;
  capacity: string;
  description: string;
}

export default function SelectVehiclePage() {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(
    null
  );
  const [bookingData, setBookingData] = useState<{
    pickup: string;
    destination: string;
  } | null>(null);

  useEffect(() => {
    // Get booking data from localStorage
    const stored = localStorage.getItem("rideBooking");
    if (stored) {
      setBookingData(JSON.parse(stored));
    }
  }, []);

  const vehicles: Vehicle[] = [
    {
      id: "car",
      name: "Car",
      icon: Car,
      price: "$12-15",
      eta: "5 min",
      capacity: "4 seats",
      description: "Comfortable ride for up to 4 people",
    },
    {
      id: "bike",
      name: "Bike",
      icon: Bike,
      price: "$3-5",
      eta: "2 min",
      capacity: "1 seat",
      description: "Quick and affordable for solo rides",
    },
    {
      id: "truck",
      name: "Truck",
      icon: Truck,
      price: "$25-30",
      eta: "8 min",
      capacity: "2 seats",
      description: "Perfect for moving items or cargo",
    },
    {
      id: "cng",
      name: "CNG",
      icon: Zap,
      price: "$8-12",
      eta: "6 min",
      capacity: "3 seats",
      description: "Eco-friendly and economical option",
    },
  ];

  const handleConfirmRide = () => {
    if (selectedVehicle && bookingData) {
      const rideDetails = {
        ...bookingData,
        vehicle: selectedVehicle,
        timestamp: new Date().toISOString(),
      };
      console.log("Ride confirmed:", rideDetails);
      // Here you would typically navigate to a confirmation page or start the ride
      alert(
        `Ride confirmed! A ${selectedVehicle} will pick you up in ${
          vehicles.find((v) => v.id === selectedVehicle)?.eta
        }`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/search">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <span className="text-xl font-bold text-gray-900">Ride</span>
          <div className="w-9" />
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Trip Summary */}
        {bookingData && (
          <Card className="border-gray-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="space-y-3">
                <h2 className="font-semibold text-gray-900">Trip Summary</h2>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">
                      {bookingData.pickup}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">
                      {bookingData.destination}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Page Title */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Choose a vehicle</h1>
          <p className="text-gray-600">Select the best option for your trip</p>
        </div>

        {/* Vehicle Options */}
        <div className="space-y-4">
          {vehicles.map((vehicle) => {
            const IconComponent = vehicle.icon;
            const isSelected = selectedVehicle === vehicle.id;

            return (
              <Card
                key={vehicle.id}
                className={`border-2 cursor-pointer transition-all hover:shadow-md ${
                  isSelected
                    ? "border-black bg-gray-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedVehicle(vehicle.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    {/* Vehicle Icon */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isSelected
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <IconComponent className="h-6 w-6" />
                    </div>

                    {/* Vehicle Info */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {vehicle.name}
                        </h3>
                        <span className="font-bold text-gray-900">
                          {vehicle.price}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {vehicle.description}
                      </p>

                      {/* Vehicle Details */}
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{vehicle.eta}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{vehicle.capacity}</span>
                        </div>
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Price Breakdown */}
        {selectedVehicle && (
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Price Breakdown
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base fare</span>
                  <span className="text-gray-900">$5.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Distance (3.2 km)</span>
                  <span className="text-gray-900">$6.40</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time (12 min)</span>
                  <span className="text-gray-900">$2.40</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">
                    {vehicles.find((v) => v.id === selectedVehicle)?.price}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Confirm Button */}
        <div className="pt-4">
          <Button
            onClick={handleConfirmRide}
            disabled={!selectedVehicle}
            className="w-full h-14 bg-black hover:bg-gray-800 text-white text-lg font-semibold rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {selectedVehicle
              ? `Confirm ${
                  vehicles.find((v) => v.id === selectedVehicle)?.name
                } Ride`
              : "Select a vehicle to continue"}
          </Button>
        </div>

        {/* Additional Info */}
        <div className="text-center text-sm text-gray-500 space-y-1">
          <p>🔒 Your payment method will be charged after the ride</p>
          <p>📱 You'll receive driver details once confirmed</p>
        </div>
      </div>
    </div>
  );
}
