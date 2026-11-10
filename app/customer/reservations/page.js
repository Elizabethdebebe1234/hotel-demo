
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import CustomerReservations from "@/components/CustomerReservations";

async function ReservationsContent() {
  const session = await getSession();

  if (!session || session.role !== "customer") {
    redirect("/login");
  }

  return <CustomerReservations />;
}

export default function ReservationsPage() {
  return (
    <Suspense fallback={<main>Loading your reservations...</main>}>
      <ReservationsContent />
    </Suspense>
  );
}
