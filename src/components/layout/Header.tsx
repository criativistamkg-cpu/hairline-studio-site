'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HairlinesLogo } from '../icons/HairlinesLogo';
import { useUser } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { clientLogout } from '@/lib/auth/actions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';


export function Header() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  const handleBookingClick = () => {
    if (isUserLoading) return; // Do nothing if user state is not determined yet

    if (user) {
      router.push('/book');
    } else {
      toast({
        title: "Login Necessário",
        description: "Precisa de fazer login ou criar uma conta para poder marcar.",
      });
      router.push('/client-login');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <HairlinesLogo className="text-primary" />
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/#services" className="transition-colors hover:text-primary">Serviços</Link>
          <Link href="/#contact" className="transition-colors hover:text-primary">Contacto</Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button onClick={handleBookingClick} disabled={isUserLoading}>
            {isUserLoading ? "A carregar..." : "Marcar Consulta"}
          </Button>

          {isUserLoading ? (
             <div className="h-10 w-10 bg-muted rounded-full animate-pulse" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
                    <AvatarFallback>
                      {user.email ? user.email.charAt(0).toUpperCase() : <UserIcon />}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName || 'Cliente'}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                   <Link href="/client-dashboard"><LayoutDashboard className="mr-2 h-4 w-4" /> Minha Conta</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <form action={clientLogout} className="w-full">
                  <button type="submit" className="w-full">
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </DropdownMenuItem>
                  </button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="sm" asChild>
              <Link href="/client-login">Login Cliente</Link>
            </Button>
          )}

          <Button variant="outline" size="sm" asChild>
            <Link href="/login">Admin</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
