
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminDashboardClient from "@/components/AdminDashboardClient";

async function AdminContent() {
  const session = await getSession();

  if (!session || session.role !== "admin") {
    redirect("/admin-login");
  }

  return <AdminDashboardClient />;
}

export default function AdminPage() {
  return (
    <Suspense fallback={<main>Loading admin dashboard...</main>}>
      <AdminContent />
    </Suspense>
  );
}
