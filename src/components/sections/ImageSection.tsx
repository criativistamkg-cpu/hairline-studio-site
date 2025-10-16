import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function ImageSection() {
  const image = PlaceHolderImages.find(img => img.id === 'hero-salon');

  if (!image) return null;

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container">
        <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-xl">
          <Image
            src={image.imageUrl}
            alt={image.description}
            width={1200}
            height={675}
            className="w-full h-auto object-cover"
            data-ai-hint={image.imageHint}
            quality={100}
          />
        </div>
      </div>
    </section>
  );
}
