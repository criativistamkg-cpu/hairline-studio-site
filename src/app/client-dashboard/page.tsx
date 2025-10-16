'use client';

import { useUser, useFirestore, useMemoFirebase, useCollection } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Appointment } from '@/lib/types';
import { AppointmentsTable } from '@/components/admin/AppointmentsTable';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function ClientDashboardPage() {
  const { user, isUserLoading, userError } = useUser();
  const firestore = useFirestore();

  const appointmentsQuery = useMemoFirebase(() => {
    if (!firestore || !user?.email) return null;
    return query(collection(firestore, 'appointments'), where('clientEmail', '==', user.email));
  }, [firestore, user?.email]);

  const { data: appointments, isLoading: isLoadingAppointments, error: appointmentsError } = useCollection<Appointment>(appointmentsQuery);

  const renderContent = () => {
    if (isUserLoading || (isLoadingAppointments && !appointments)) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
          <div className="space-y-2 mt-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      );
    }
    
    if (userError || appointmentsError) {
       return (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{userError?.message || appointmentsError?.message || 'Failed to load your data. Please try again later.'}</AlertDescription>
        </Alert>
       )
    }

    if (!user) {
      return (
        <div className="text-center">
            <p className="mb-4">Precisa de iniciar sessão para ver as suas marcações.</p>
            <Button asChild>
                <Link href="/client-login">Login</Link>
            </Button>
        </div>
      )
    }
    
    if (appointments && appointments.length === 0) {
        return (
            <div className="text-center text-muted-foreground">
                <p>Ainda não tem marcações.</p>
                <Button asChild variant="link" className="mt-2">
                    <Link href="/book">Fazer a primeira marcação</Link>
                </Button>
            </div>
        )
    }

    return (
        <AppointmentsTable appointments={appointments || []} />
    )
  }


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container py-12 md:py-20">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">As Minhas Marcações</CardTitle>
            <CardDescription>Veja aqui o seu histórico de marcações.</CardDescription>
          </CardHeader>
          <CardContent>
            {renderContent()}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
