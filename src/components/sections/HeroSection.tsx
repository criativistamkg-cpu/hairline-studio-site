import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-salon');

  return (
    <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-primary-foreground">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center p-4">
        <h1 className="text-4xl md:text-6xl font-headline mb-4 drop-shadow-md">
          Rustic Charm, Modern Style
        </h1>
        <p className="max-w-2xl mx-auto md:text-xl mb-8 drop-shadow-sm">
          Experience the art of hairstyling in a unique, rustic setting. Your journey to perfect hair starts here.
        </p>
        <Button size="lg" asChild>
          <Link href="/book">Book Your Appointment</Link>
        </Button>
      </div>
    </section>
  );
}
