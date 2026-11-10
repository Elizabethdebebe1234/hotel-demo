
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import CustomerReservations from "@/components/CustomerReservations";

export default async function ReservationsPage() {
  const session = await getSession();

  if (!session || session.role !== "customer") {
    redirect("/login");
  }

  return (
    <CustomerReservations />
  );
}
