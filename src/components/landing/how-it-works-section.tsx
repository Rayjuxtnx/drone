import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { HardHat, Send, Map } from 'lucide-react';

const steps = [
  {
    icon: Send,
    title: '1. Request a Mission',
    description: 'Easily select your service, define locations, and set your schedule through our intuitive booking system.',
    imageId: 'how-it-works-1',
  },
  {
    icon: HardHat,
    title: '2. We Assign Resources',
    description: 'Our system instantly assigns the best available drone and a certified operator to fulfill your mission requirements.',
    imageId: 'how-it-works-2',
  },
  {
    icon: Map,
    title: '3. Track in Real-Time',
    description: 'Monitor your drone\'s progress, speed, and altitude on a live map from takeoff to landing.',
    imageId: 'how-it-works-3',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">How It Works</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">A Simple Path to Aerial Success</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              From request to completion, our process is designed for your convenience and peace of mind.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3">
          {steps.map((step) => {
            const image = PlaceHolderImages.find(img => img.id === step.imageId);
            return (
              <Card key={step.title} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                   <div className="bg-primary/20 text-primary p-3 rounded-full">
                     <step.icon className="h-6 w-6" />
                   </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {image && (
                    <div className="aspect-video relative mb-4">
                      <Image 
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        className="rounded-lg object-cover"
                        data-ai-hint={image.imageHint}
                      />
                    </div>
                  )}
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
