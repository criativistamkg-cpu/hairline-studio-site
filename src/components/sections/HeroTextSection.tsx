import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroTextSection() {
  return (
    <section className="bg-background py-12 md:py-20 text-center">
      <div className="container">
        <h1 className="text-4xl md:text-6xl font-headline mb-4 text-primary drop-shadow-md">
          Charme Rústico, Estilo Moderno
        </h1>
        <p className="max-w-2xl mx-auto md:text-xl mb-8 text-muted-foreground drop-shadow-sm">
          Experimente a arte do penteado num ambiente rústico e único. A sua jornada para o cabelo perfeito começa aqui.
        </p>
        <Button size="lg" asChild>
          <Link href="/book">Faça a sua Marcação</Link>
        </Button>
      </div>
    </section>
  );
}
