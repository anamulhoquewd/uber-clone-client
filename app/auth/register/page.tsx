"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, User, Car } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCaptainRegister, useUserRegister } from "@/hooks/register-hook";

type UserRole = "user" | "captains";

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>("user");

  const {
    onSubmit: handleUserSubmit,
    isSubmitting: isUserSubmitting,
    form: userForm,
  } = useUserRegister();

  const {
    onSubmit: handleCaptainSubmit,
    isSubmitting: isCaptainSubmitting,
    captainForm,
  } = useCaptainRegister();

  console.log("captainForm errors : ", captainForm.formState.errors);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/auth/login">
          <Button variant="ghost" size="sm" className="p-2 cursor-pointer">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold text-gray-900">Sign Up</h1>
        <div className="w-9" /> {/* Spacer for centering */}
      </div>

      <div className="max-w-md mx-auto space-y-6">
        {/* Role Selector */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant={selectedRole === "user" ? "default" : "outline"}
            className={`h-16 flex flex-col items-center justify-center space-y-1 cursor-pointer`}
            onClick={() => setSelectedRole("user")}
          >
            <User className="h-5 w-5" />
            <span className="text-sm font-medium">User</span>
          </Button>

          <Button
            variant={selectedRole === "captains" ? "default" : "outline"}
            className={`h-16 flex flex-col items-center justify-center space-y-1 cursor-pointer`}
            onClick={() => setSelectedRole("captains")}
          >
            <Car className="h-5 w-5" />
            <span className="text-sm font-medium">Captain</span>
          </Button>
        </div>

        {/* Captain Registration Note */}
        {selectedRole === "captains" && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-4">
              <p className="text-sm text-blue-800 font-medium">
                Register as a captain
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Please provide your vehicle information for captain registration
              </p>
            </CardContent>
          </Card>
        )}

        {/* Registration Form */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold">
              Create account
            </CardTitle>
            <CardDescription>
              {selectedRole === "user"
                ? "Sign up to start booking rides"
                : "Join as a captain and start earning"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedRole === "captains" && (
              <CaptainForms
                form={captainForm}
                handleSubmit={handleCaptainSubmit}
                isSubmitting={isCaptainSubmitting}
              />
            )}
            {selectedRole === "user" && (
              <UserForms
                form={userForm}
                handleSubmit={handleUserSubmit}
                isSubmitting={isUserSubmitting}
              />
            )}

            {/* Additional Links */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-black hover:underline font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const UserForms = ({
  form,
  handleSubmit,
  isSubmitting,
}: {
  form: any;
  handleSubmit: any;
  isSubmitting: boolean;
}) => (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="fullname"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter your full name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Enter your email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Create a password"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Confirm your password"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button
        type="submit"
        className="w-full h-12 cursor-pointer font-semibold mt-6"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating account..." : `Sign up as ${"User"}`}
      </Button>
    </form>
  </Form>
);

const CaptainForms = ({
  form,
  handleSubmit,
  isSubmitting,
}: {
  form: any;
  handleSubmit: any;
  isSubmitting: boolean;
}) => (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="fullname"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter your full name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Enter your email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Create a password"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Confirm your password"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="vehicle.vehicleType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Vehicle Type</FormLabel>
            <Select onValueChange={(value) => field.onChange(value as any)}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="car">Car</SelectItem>
                <SelectItem value="bike">Bike</SelectItem>
                <SelectItem value="truck">Truck</SelectItem>
                <SelectItem value="cng">CNG</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="vehicle.plateNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Plate Number</FormLabel>
            <FormControl>
              <Input placeholder="Enter plate number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="vehicle.color"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Vehicle Color</FormLabel>
            <FormControl>
              <Input placeholder="Enter vehicle color" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="vehicle.capacity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Seating Capacity</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Enter seating capacity"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button
        type="submit"
        className="w-full h-12 cursor-pointer font-semibold mt-6"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating account..." : `Sign up as ${"Captain"}`}
      </Button>
    </form>
  </Form>
);
