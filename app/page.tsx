import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white flex flex-col items-center justify-between px-4 py-8">
      {/* Header */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
            Ride
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-md">
            Your journey starts here
          </p>
        </div>
      </div>

      {/* Continue Button */}
      <div className="w-full max-w-sm">
        <Link href="/auth/login">
          <Button
            size="lg"
            className="w-full h-14 text-lg font-semibold cursor-pointer rounded-xl"
          >
            Continue
          </Button>
        </Link>
      </div>
    </div>
  );
}
