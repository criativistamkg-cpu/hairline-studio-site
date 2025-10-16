"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { updateAppointment } from "@/lib/actions";
import { services, timeSlots } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Appointment } from "@/lib/types";

const MAX_APPOINTMENTS_PER_DAY = 5;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" size="lg" disabled={pending}>
      {pending ? "Updating..." : "Update Appointment"}
    </Button>
  );
}

export function EditBookingForm({ appointment, dailyBookings }: { appointment: Appointment; dailyBookings: Record<string, number> }) {
  const [date, setDate] = useState<Date | undefined>(new Date(appointment.date));
  const [selectedTime, setSelectedTime] = useState<string | undefined>(appointment.time);
  
  const updateAppointmentWithId = updateAppointment.bind(null, appointment.id);
  const [state, dispatch] = useFormState(updateAppointmentWithId, undefined);
  
  const disabledDays = Object.entries(dailyBookings)
    .filter(([dateStr, count]) => count >= MAX_APPOINTMENTS_PER_DAY && dateStr !== appointment.date)
    .map(([dateStr]) => new Date(dateStr));
    
  disabledDays.push({ before: new Date() });

  return (
    <Card>
      <form action={dispatch}>
        <CardContent className="p-6 grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
             <h3 className="font-headline text-xl text-primary">1. New Date & Time</h3>
             <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={disabledDays}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <input type="hidden" name="date" value={date ? format(date, "yyyy-MM-dd") : ""} />
            {date && (
                <div>
                    <Label>Select a Time</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                        {timeSlots.map(time => (
                            <Button 
                                key={time} 
                                variant={selectedTime === time ? 'default' : 'outline'}
                                onClick={() => setSelectedTime(time)}
                                type="button"
                            >
                                {time}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
            <input type="hidden" name="time" value={selectedTime || ""} />
          </div>
          <div className="space-y-4">
             <h3 className="font-headline text-xl text-primary">2. Your Details</h3>
            <div>
              <Label htmlFor="clientName">Full Name</Label>
              <Input id="clientName" name="clientName" required defaultValue={appointment.clientName} />
              {state?.errors?.clientName && <p className="text-sm text-destructive mt-1">{state.errors.clientName}</p>}
            </div>
            <div>
              <Label htmlFor="clientEmail">Email Address</Label>
              <Input id="clientEmail" name="clientEmail" type="email" required defaultValue={appointment.clientEmail} />
              {state?.errors?.clientEmail && <p className="text-sm text-destructive mt-1">{state.errors.clientEmail}</p>}
            </div>
            <div>
              <Label htmlFor="service">Service</Label>
              <Select name="service" required defaultValue={appointment.service}>
                <SelectTrigger id="service">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map(s => <SelectItem key={s.name} value={s.name}>{s.name} - {s.price}</SelectItem>)}
                </SelectContent>
              </Select>
               {state?.errors?.service && <p className="text-sm text-destructive mt-1">{state.errors.service}</p>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-stretch gap-4 p-6 border-t">
          {state?.message && (
            <Alert variant="destructive">
              <AlertTitle>Update Error</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
