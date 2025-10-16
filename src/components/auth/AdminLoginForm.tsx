'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { login } from '@/lib/actions';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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

  return (
    <form action={dispatch} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Utilizador</Label>
        <Input id="username" name="username" placeholder="admin" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Palavra-passe</Label>
        <Input id="password" name="password" type="password" required />
      </div>
      {state?.message && (
        <Alert variant="destructive">
            <AlertTitle>Erro de Login</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
      <SubmitButton />
    </form>
  );
}
