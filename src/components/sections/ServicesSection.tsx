import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scissors, Brush } from 'lucide-react';

export function ServicesSection() {
  return (
    <section id="services" className="py-12 md:py-20 bg-background">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-headline text-primary">Serviços</h2>
          <p className="mt-2 text-lg text-muted-foreground">Serviços dedicados para elas e para eles</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="flex flex-col border-primary/20 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-3"><Brush className="h-6 w-6 text-primary" />Lady's Service</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Disponibilizamos um serviço completo para senhoras. O nosso conceito assenta na modernidade e na irreverência das tendências atuais, sem esquecer o clássico. Os nossos cabeleireiros aplicam as técnicas mais inovadoras em colorimetria, styling e corte...
              </p>
            </CardContent>
          </Card>
          <Card className="flex flex-col border-primary/20 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-3"><Scissors className="h-6 w-6 text-primary" />Gentleman's Service</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Valorizando o conceito de barbearia tradicional, colocamos à vossa disposição um serviço completo para homem. Para isso, contamos com o nosso barbeiro, um profissional criativo em ascensão com formação certificada pela DGERT. As técnicas utilizadas são as mais inovadoras e seguras.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
