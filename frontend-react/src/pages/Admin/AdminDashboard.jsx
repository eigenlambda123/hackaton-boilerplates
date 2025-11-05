import AdminDashboardLayout from "../../components/Admin/AdminDashboardLayout";
import AdminUserTable from "../../components/Admin/AdminUserTable";

export default function AdminDashboard() {
  return (
    <AdminDashboardLayout title="Admin Dashboard">
      <AdminUserTable />
    </AdminDashboardLayout>
  );
}
