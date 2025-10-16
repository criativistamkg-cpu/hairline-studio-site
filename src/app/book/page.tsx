import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookingForm } from "@/components/booking/BookingForm";
import { getDailyBookingsCount } from "@/lib/actions";

export default async function BookAppointmentPage() {
  const dailyBookings = await getDailyBookingsCount();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-headline text-primary">Book Your Appointment</h1>
            <p className="mt-2 text-lg text-muted-foreground">Select a date and time that works for you.</p>
          </div>
          <BookingForm dailyBookings={dailyBookings} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
