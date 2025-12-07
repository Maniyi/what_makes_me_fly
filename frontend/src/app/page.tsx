import { Card } from "@/components/ui/Card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="md:flex md:items-center md:justify-center py-10">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lounge-gold to-lounge-purple-light tracking-tight sm:text-6xl animate-pulse">
            Welcome to the Lounge
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            Experience the night. Order, relax, and enjoy.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 px-4">
        <Link href="/requests/new" className="group">
          <Card className="h-full hover:bg-white/5 transition-colors border-lounge-gold/20 hover:border-lounge-gold hover:shadow-[0_0_20px_rgba(0,243,255,0.2)]">
            <h3 className="text-xl font-bold text-lounge-gold group-hover:text-white transition-colors">Order Now</h3>
            <p className="mt-2 text-gray-400">Browse our menu and place a request for drinks or service.</p>
          </Card>
        </Link>

        <Link href="/requests" className="group">
          <Card className="h-full hover:bg-white/5 transition-colors border-lounge-purple-light/20 hover:border-lounge-purple-light hover:shadow-[0_0_20px_rgba(255,0,255,0.2)]">
            <h3 className="text-xl font-bold text-lounge-purple-light group-hover:text-white transition-colors">My Requests</h3>
            <p className="mt-2 text-gray-400">Track the status of your orders and calls.</p>
          </Card>
        </Link>

        <Link href="/attendant" className="group">
          <Card className="h-full hover:bg-white/5 transition-colors border-lounge-purple/20 hover:border-lounge-purple hover:shadow-[0_0_20px_rgba(189,0,255,0.2)]">
            <h3 className="text-xl font-bold text-lounge-purple group-hover:text-white transition-colors">Staff Access</h3>
            <p className="mt-2 text-gray-400">Attendant dashboard for managing deliveries.</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
