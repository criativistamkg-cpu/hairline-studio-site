"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { login } from "@/lib/actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "../ui/alert";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "A entrar..." : "Entrar"}
    </Button>
  );
}

export function AdminLoginForm() {
  const [state, dispatch] = useActionState(login, undefined);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message) {
      toast({
        title: "Falha no Login",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <form action={dispatch} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Utilizador</Label>
        <Input
          id="username"
          name="username"
          placeholder="hairline"
          required
          defaultValue="hairline"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Palavra-passe</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          defaultValue="HairLineStudio01"
        />
      </div>
      {state?.message && (
        <Alert variant="destructive">
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
      <SubmitButton />
    </form>
  );
}
