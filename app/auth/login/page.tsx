"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, User, Car } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type LoginFormData = {
  email: string;
  password: string;
};

type UserRole = "user" | "captain";

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>("user");

  const {
    formState: { isSubmitting },
  } = useForm<LoginFormData>();

  const formSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    // Simulate API call
    console.log("Login data:", { ...data, role: selectedRole });
    // Here you would typically make an API call to authenticate the user
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="p-2 cursor-pointer">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold text-gray-900">Sign In</h1>
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

        {/* Captain Login Note */}
        {selectedRole === "captain" && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-4">
              <p className="text-sm text-blue-800 font-medium">
                Do you want to log in as a captain?
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Captain login requires additional verification
              </p>
            </CardContent>
          </Card>
        )}

        {/* Login Form */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold">
              Welcome back
            </CardTitle>
            <CardDescription>
              Enter your credentials to access your account
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
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full h-12 cursor-pointer font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Signing in..."
                    : `Sign in as ${
                        selectedRole === "user" ? "User" : "Captain"
                      }`}
                </Button>
              </form>
            </Form>

            {/* Additional Links */}
            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-gray-600">
                Forgot your password?{" "}
                <Link
                  href="/auth/forgot-password"
                  className="text-black hover:underline font-medium"
                >
                  Reset it here
                </Link>
              </p>
              <p className="text-sm text-gray-600">
                {"Don't have an account? "}
                <Link
                  href="/auth/register"
                  className="text-black hover:underline font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
