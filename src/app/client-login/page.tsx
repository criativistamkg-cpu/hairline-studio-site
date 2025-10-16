'use client';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormStatus } from 'react-dom';
import { clientLogin, clientSignup } from '@/lib/auth/actions';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEffect, useActionState } from 'react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "A processar..." : "Entrar"}
    </Button>
  );
}

export default function ClientLoginPage() {
    const [loginState, loginDispatch] = useActionState(clientLogin, undefined);
    const [signupState, signupDispatch] = useActionState(clientSignup, undefined);
    const { toast } = useToast();

    useEffect(() => {
        const errorState = loginState || signupState;
        if (errorState?.message) {
            toast({
                title: "Erro",
                description: errorState.message,
                variant: 'destructive',
            })
        }
    }, [loginState, signupState, toast])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md grid gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Login de Cliente</CardTitle>
                    <CardDescription>Já tem conta? Entre aqui para ver as suas marcações.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={loginDispatch} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email-login">Email</Label>
                            <Input id="email-login" name="email" type="email" placeholder="voce@exemplo.com" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password-login">Palavra-passe</Label>
                            <Input id="password-login" name="password" type="password" required />
                        </div>
                        {loginState?.message && (
                            <Alert variant="destructive">
                                <AlertDescription>{loginState.message}</AlertDescription>
                            </Alert>
                        )}
                        <SubmitButton />
                    </form>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Criar Conta</CardTitle>
                    <CardDescription>Novo por aqui? Crie uma conta para gerir as suas marcações.</CardDescription>
                </header>
                <CardContent>
                    <form action={signupDispatch} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email-signup">Email</Label>
                            <Input id="email-signup" name="email" type="email" placeholder="voce@exemplo.com" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password-signup">Palavra-passe</Label>
                            <Input id="password-signup" name="password" type="password" required placeholder="Pelo menos 6 caracteres"/>
                        </div>
                         {signupState?.message && (
                            <Alert variant="destructive">
                                <AlertDescription>{signupState.message}</AlertDescription>
                            </Alert>
                        )}
                        <Button type="submit" variant="secondary" className="w-full">Criar Conta</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
