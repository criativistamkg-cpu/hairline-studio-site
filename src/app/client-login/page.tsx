'use client';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormStatus } from 'react-dom';
import { createSession } from '@/lib/auth/actions';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEffect, useState, useActionState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/firebase';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth';
import { redirect } from 'next/navigation';

function SubmitButton({ text = "Entrar" }: { text?: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "A processar..." : text}
    </Button>
  );
}

export default function ClientLoginPage() {
    const auth = useAuth();
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        if(auth) {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if(user) {
                    redirect('/client-dashboard');
                }
            });
            return () => unsubscribe();
        }
    }, [auth]);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const idToken = await userCredential.user.getIdToken();
            
            const sessionFormData = new FormData();
            sessionFormData.append('idToken', idToken);
            
            const formAction = createSession.bind(null, idToken);
            formAction();

        } catch (err: any) {
            let message = 'Ocorreu um erro ao fazer login.';
            if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                 message = 'Email ou palavra-passe incorretos.';
            }
            setError(message);
            toast({ title: "Erro", description: message, variant: 'destructive' });
        }
    };

    const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const idToken = await userCredential.user.getIdToken();

            const sessionFormData = new FormData();
            sessionFormData.append('idToken', idToken);

            const formAction = createSession.bind(null, idToken);
            formAction();

        } catch (err: any) {
            let message = 'Ocorreu um erro ao criar a conta.';
            if (err.code === 'auth/email-already-in-use') {
                 message = 'Este email já está a ser utilizado.';
            }
            setError(message);
            toast({ title: "Erro", description: message, variant: 'destructive' });
        }
    };

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
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email-login">Email</Label>
                            <Input id="email-login" name="email" type="email" placeholder="voce@exemplo.com" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password-login">Palavra-passe</Label>
                            <Input id="password-login" name="password" type="password" required />
                        </div>
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
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
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSignup} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email-signup">Email</Label>
                            <Input id="email-signup" name="email" type="email" placeholder="voce@exemplo.com" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password-signup">Palavra-passe</Label>
                            <Input id="password-signup" name="password" type="password" required placeholder="Pelo menos 6 caracteres"/>
                        </div>
                         {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <SubmitButton text="Criar Conta" />
                    </form>
                </CardContent>
            </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
