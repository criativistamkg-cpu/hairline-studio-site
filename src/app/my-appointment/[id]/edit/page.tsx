import { getAppointmentById, getDailyBookingsCount } from "@/lib/actions";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import { EditBookingForm } from "@/components/booking/EditBookingForm";

export default async function EditAppointmentPage({ params }: { params: { id: string } }) {
  const appointment = await getAppointmentById(params.id);

  if (!appointment) {
    notFound();
  }

  const dailyBookings = await getDailyBookingsCount();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-headline text-primary">Modify Your Appointment</h1>
            <p className="mt-2 text-lg text-muted-foreground">Adjust your booking details below.</p>
          </div>
          <EditBookingForm appointment={appointment} dailyBookings={dailyBookings} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
