import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

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
                <span>N125 85, 8700-254 Olhão</span>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="h-5 w-5 mt-1 text-primary" />
                <span>289 042 984</span>
              </div>
              <div className="flex items-start space-x-4">
                <Clock className="h-5 w-5 mt-1 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Horário de Funcionamento</p>
                  <p>Segunda a Sábado: 9:00 - 20:00</p>
                  <p>Domingo: Fechado</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden border-primary/20">
            <div className="h-80 w-full bg-muted">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12751.280148729112!2d-7.854095811090095!3d37.03965564883901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1b37385a55639b%3A0x86c3592631551846!2sN125%2085%2C%208700-254%20Olh%C3%A3o!5e0!3m2!1spt-PT!2spt!4v1721147575807!5m2!1spt-PT!2spt"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hairlines Salon Location"
              ></iframe>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
