import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminDashboardClient from "@/components/AdminDashboardClient";

export default async function AdminDashboard() {
  const session = await getSession();

  if (!session || session.role !== "admin") {
    redirect("/admin-login");
  }

  return (
    <AdminDashboardClient adminName={session.name || "Administrator"} />
  );
}