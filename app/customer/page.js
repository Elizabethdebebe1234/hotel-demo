
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import CustomerDashboardClient from "@/components/CustomerDashboardClient";

async function CustomerContent() {
  const session = await getSession();

  if (!session || session.role !== "customer") {
    redirect("/login");
  }

  return (
    <CustomerDashboardClient
      customerName={session.name || "Guest"}
    />
  );
}

export default function CustomerDashboard() {
  return (
    <Suspense fallback={<main className="dashboard-page">
      <p>Loading your dashboard...</p>
    </main>}>
      <CustomerContent />
    </Suspense>
  );
}
