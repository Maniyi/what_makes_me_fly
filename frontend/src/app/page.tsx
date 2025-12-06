import { Card } from "@/components/ui/Card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Dashboard
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/requests/new">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <h3 className="text-lg font-medium text-gray-900">New Request</h3>
            <p className="mt-2 text-sm text-gray-500">Create a new customer request for items.</p>
          </Card>
        </Link>

        <Link href="/requests">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <h3 className="text-lg font-medium text-gray-900">View Requests</h3>
            <p className="mt-2 text-sm text-gray-500">Track status of all customer requests.</p>
          </Card>
        </Link>

        <Link href="/attendant">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <h3 className="text-lg font-medium text-gray-900">Attendant View</h3>
            <p className="mt-2 text-sm text-gray-500">Manage assigned tasks and deliveries.</p>
          </Card>
        </Link>

        <Link href="/inventory">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <h3 className="text-lg font-medium text-gray-900">Inventory</h3>
            <p className="mt-2 text-sm text-gray-500">Manage stock and prices.</p>
          </Card>
        </Link>

        <Link href="/payments">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <h3 className="text-lg font-medium text-gray-900">Payments</h3>
            <p className="mt-2 text-sm text-gray-500">Record and view payments.</p>
          </Card>
        </Link>

        <Link href="/expenses">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <h3 className="text-lg font-medium text-gray-900">Expenses</h3>
            <p className="mt-2 text-sm text-gray-500">Log and track expenses.</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
