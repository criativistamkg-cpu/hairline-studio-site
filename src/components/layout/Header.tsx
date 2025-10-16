import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HairlinesLogo } from '../icons/HairlinesLogo';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <HairlinesLogo className="h-10 w-auto text-primary" />
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/#services" className="transition-colors hover:text-primary">Services</Link>
          <Link href="/#contact" className="transition-colors hover:text-primary">Contact</Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button asChild>
            <Link href="/book">Book Appointment</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Admin</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
