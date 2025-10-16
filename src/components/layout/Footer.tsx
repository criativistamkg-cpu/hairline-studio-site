import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';
import { HairlinesLogo } from '../icons/HairlinesLogo';

export function Footer() {
  return (
    <footer className="bg-secondary/50">
      <div className="container py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <Link href="/" className="flex items-center space-x-2">
              <HairlinesLogo className="h-10 w-auto text-primary" />
            </Link>
            <p className="text-sm text-muted-foreground">Rustic Charm, Modern Style.</p>
          </div>
          <div>
            <h3 className="font-headline text-md font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              <li><Link href="/#services" className="text-muted-foreground hover:text-primary">Services</Link></li>
              <li><Link href="/book" className="text-muted-foreground hover:text-primary">Book Now</Link></li>
              <li><Link href="/#contact" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-md font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook size={20} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram size={20} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter size={20} /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Hairline Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
