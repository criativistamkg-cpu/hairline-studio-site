"use client";

import type { Appointment } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { deleteAppointment } from "@/lib/actions";
import { useTransition } from "react";
import { toast } from "@/hooks/use-toast";
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
import { format } from "date-fns";
import { pt } from 'date-fns/locale';
import { Badge } from "../ui/badge";
import Link from "next/link";

export function AppointmentsTable({ appointments }: { appointments: Appointment[] }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteAppointment(id);
      toast({
        title: "Sucesso",
        description: "A marcação foi eliminada.",
      });
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cliente</TableHead>
          <TableHead>Data e Hora</TableHead>
          <TableHead>Serviço</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appt) => (
          <TableRow key={appt.id}>
            <TableCell>
              <div className="font-medium">{appt.clientName}</div>
              <div className="text-sm text-muted-foreground">{appt.clientEmail}</div>
            </TableCell>
            <TableCell>
              <div>{format(new Date(appt.date), "PPP", { locale: pt })}</div>
              <Badge variant="outline">{appt.time}</Badge>
            </TableCell>
            <TableCell>{appt.service}</TableCell>
            <TableCell className="text-right space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/my-appointment/${appt.id}/edit`}>Editar</Link>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" disabled={isPending}>
                    Eliminar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Tem a certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. Isto irá eliminar permanentemente a marcação.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(appt.id)}>
                      Continuar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
