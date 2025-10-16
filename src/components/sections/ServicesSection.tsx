import { services } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function ServicesSection() {
  return (
    <section id="services" className="py-12 md:py-20 bg-background">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-headline text-primary">Os Nossos Serviços</h2>
          <p className="mt-2 text-lg text-muted-foreground">Cuidado de qualidade para o seu cabelo</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.name} className="flex flex-col border-primary/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="font-headline">{service.name}</CardTitle>
                {service.description && (
                  <CardDescription>{service.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-end">
                <Separator className="my-4" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">A partir de</span>
                  <span className="font-bold text-lg text-primary">{service.price}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
