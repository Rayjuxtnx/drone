import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    id: 'service-photography',
    title: 'Aerial Photography',
    description: 'Capture stunning high-resolution photos and videos from unique perspectives for real estate, events, and more.',
  },
  {
    id: 'service-delivery',
    title: 'Drone Delivery',
    description: 'Fast, efficient, and contactless delivery of small packages, medical supplies, and food items.',
  },
{
    id: 'service-security',
    title: 'Security Surveillance',
    description: '24/7 monitoring of large areas, construction sites, and private properties with live feeds and threat detection.',
  },
  {
    id: 'service-agriculture',
    title: 'Agriculture Mapping',
    description: 'Optimize crop yields and manage resources with detailed field maps, plant health analysis, and irrigation monitoring.',
  },
  {
    id: 'service-inspection',
    title: 'Infrastructure Inspection',
    description: 'Safely inspect bridges, power lines, wind turbines, and other critical infrastructure with high-precision drones.',
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Drone Services</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We provide a wide range of professional drone solutions tailored to your specific needs.
            </p>
          </div>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const image = PlaceHolderImages.find(img => img.id === service.id);
            return (
              <Card key={service.id} className="group overflow-hidden flex flex-col">
                {image && (
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={image.imageUrl}
                      alt={service.title}
                      width={600}
                      height={400}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={image.imageHint}
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                    <Button variant="outline" className="w-full" asChild>
                        <Link href="/booking">
                            Book Now <ArrowRight className="ml-2 h-4 w-4"/>
                        </Link>
                    </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
