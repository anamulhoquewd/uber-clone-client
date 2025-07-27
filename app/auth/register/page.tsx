"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type UserRole = "user" | "captain";

type UserFormData = {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type CaptainFormData = UserFormData & {
  vehicleType: "car" | "bike" | "truck" | "cng";
  plateNumber: string;
  color: string;
  capacity: number;
};

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>("user");

  const {
    formState: { errors, isSubmitting },
  } = useForm<CaptainFormData>();

  const formSchema = z.object({
    fullname: z
      .string()
      .min(3, "Full name must be at least 3 characters")
      .nonempty("Full name is required"),
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),

    vehicleType: z.string().min(1, "Vehicle type must be at least 1 character"),
    plateNumber: z
      .string()
      .min(3, "Plate number must be at least 3 characters"),
    color: z.string().min(3, "Color must be at least 3 characters"),
    capacity: z
      .number()
      .min(1, "Capacity must be at least 1")
      .max(50, "Capacity cannot exceed 50")
      .optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      vehicleType: "",
      plateNumber: "",
      color: "",
      capacity: 1,
    },
  });

  const onSubmit = async (data: CaptainFormData | UserFormData) => {
    // Simulate API call
    console.log("Registration data:", { ...data, role: selectedRole });
    // Here you would typically make an API call to register the user
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-8">
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
            variant={selectedRole === "captain" ? "default" : "outline"}
            className={`h-16 flex flex-col items-center justify-center space-y-1 cursor-pointer`}
            onClick={() => setSelectedRole("captain")}
          >
            <Car className="h-5 w-5" />
            <span className="text-sm font-medium">Captain</span>
          </Button>
        </div>

        {/* Captain Registration Note */}
        {selectedRole === "captain" && (
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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
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
                {/* Captain-specific fields */}
                {selectedRole === "captain" && (
                  <>
                    <FormField
                      control={form.control}
                      name="vehicleType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehicle Type</FormLabel>
                          <Select
                            onValueChange={(value) =>
                              field.onChange(value as any)
                            }
                          >
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
                      name="plateNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Plate Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter plate number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="color"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehicle Color</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter vehicle color"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="capacity"
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
                  </>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 cursor-pointer font-semibold mt-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Creating account..."
                    : `Sign up as ${
                        selectedRole === "user" ? "User" : "Captain"
                      }`}
                </Button>
              </form>
            </Form>

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
