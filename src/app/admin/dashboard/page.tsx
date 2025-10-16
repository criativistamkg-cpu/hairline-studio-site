import { getAppointments, logout, exportAppointments } from "@/lib/actions";
import { AppointmentsTable } from "@/components/admin/AppointmentsTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, LogOut } from "lucide-react";

export default async function AdminDashboard() {
  const appointments = await getAppointments();

  const handleExport = async () => {
    "use server";
    const csvData = await exportAppointments();
    // In a real app, you would set headers to trigger a download.
    // For this example, we'll just show the data.
    console.log(csvData); 
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="bg-background border-b">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-xl font-headline text-primary">Admin Dashboard</h1>
          <div className="flex items-center gap-2">
             <form action={async () => {
                "use server";
                const csvData = await exportAppointments();
                // This is a server component, so we can't trigger a client-side download directly.
                // A common pattern is to have a client component make a fetch request to an API route that returns the file.
                // For simplicity, we are just logging it.
                console.log("--- EXPORTED DATA ---");
                console.log(csvData);
             }}>
                <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" />Export CSV</Button>
            </form>
            <form action={logout}>
              <Button variant="ghost" size="sm"><LogOut className="mr-2 h-4 w-4" />Logout</Button>
            </form>
          </div>
        </div>
      </header>
      <main className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>All Appointments</CardTitle>
            <CardDescription>
              {appointments.length > 0 
                ? `Total of ${appointments.length} appointment(s).`
                : "No appointments booked yet."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AppointmentsTable appointments={appointments} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
