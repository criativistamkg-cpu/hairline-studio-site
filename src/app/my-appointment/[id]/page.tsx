import { getAppointmentById } from "@/lib/actions";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Scissors, User, Mail, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteAppointment } from "@/lib/actions";

export default async function MyAppointmentPage({ params, searchParams }: { params: { id: string }, searchParams: { success?: string } }) {
  const appointment = await getAppointmentById(params.id);

  if (!appointment) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-4">
            {searchParams.success && (
                <Alert variant="default" className="bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-300">
                    <AlertTitle className="font-headline">Success!</AlertTitle>
                    <AlertDescription>Your appointment has been updated.</AlertDescription>
                </Alert>
            )}
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Your Appointment</CardTitle>
                    <CardDescription>Thank you for booking with Hairline Studio. Here are your details.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-primary" />
                        <span>{appointment.clientName}</span>
                    </div>
                     <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-primary" />
                        <span>{appointment.clientEmail}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span>{format(new Date(appointment.date), 'EEEE, MMMM d, yyyy')}</span>
                    </div>
                     <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-primary" />
                        <Badge variant="secondary">{appointment.time}</Badge>
                    </div>
                     <div className="flex items-center gap-3 col-span-full">
                        <Scissors className="w-5 h-5 text-primary" />
                        <span>{appointment.service}</span>
                    </div>
                </CardContent>
                <CardFooter className="flex-col sm:flex-row justify-end gap-2 border-t pt-6">
                    <Button variant="outline" asChild>
                        <Link href={`/my-appointment/${appointment.id}/edit`}><Pencil className="mr-2 h-4 w-4"/> Modify Appointment</Link>
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive"><Trash2 className="mr-2 h-4 w-4"/> Cancel Appointment</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure you want to cancel?</AlertDialogTitle>
                                <AlertDialogDescription>
                                This action cannot be undone. You will need to book a new appointment if you change your mind.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Keep Appointment</AlertDialogCancel>
                                <form action={async () => {
                                    "use server";
                                    await deleteAppointment(appointment.id);
                                    redirect('/book?cancelled=true');
                                }}>
                                    <AlertDialogAction type="submit">Yes, Cancel It</AlertDialogAction>
                                </form>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
