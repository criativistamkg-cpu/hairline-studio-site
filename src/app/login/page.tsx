import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminLoginForm } from "@/components/auth/AdminLoginForm";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Login de Administrador</CardTitle>
            <CardDescription>Insira as suas credenciais para aceder ao painel.</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminLoginForm />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
