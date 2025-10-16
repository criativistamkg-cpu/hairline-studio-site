import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Image from "next/image";

export function ContactSection() {
  return (
    <section id="contact" className="py-12 md:py-20 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-headline text-primary">Entre em Contacto</h2>
          <p className="mt-2 text-lg text-muted-foreground">Gostaríamos de ouvir de si</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="font-headline">Contacto & Horário</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div className="flex items-start space-x-4">
                <MapPin className="h-5 w-5 mt-1 text-primary" />
                <span>R. Dr. Alberto Iria 11, 8000-511 Faro</span>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="h-5 w-5 mt-1 text-primary" />
                <span>919 999 999</span>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="h-5 w-5 mt-1 text-primary" />
                <span>hairlinesolhao@gmail.com</span>
              </div>
              <div className="flex items-start space-x-4">
                <Clock className="h-5 w-5 mt-1 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Horário de Funcionamento</p>
                  <p>Terça a Sábado: 9:00 - 19:00</p>
                  <p>Domingo e Segunda: Fechado</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden border-primary/20">
            <div className="h-80 w-full bg-muted">
              <Image
                src="https://picsum.photos/seed/map1/600/400"
                alt="Mapa a mostrar a localização do salão"
                width={600}
                height={400}
                className="w-full h-full object-cover"
                data-ai-hint="street map"
              />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
