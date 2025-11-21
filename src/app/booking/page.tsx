'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { CalendarIcon, MapPin, DollarSign, Book, LocateFixed, Loader2 } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { INITIAL_MISSIONS } from "@/lib/data";
import { Mission, serviceTypes } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useState } from "react";

const bookingFormSchema = z.object({
  serviceType: z.enum(serviceTypes, { required_error: "Please select a service type." }),
  pickupLocation: z.string().min(5, "Pickup location is too short."),
  destinationLocation: z.string().min(5, "Destination location is too short."),
  dateTime: z.date({ required_error: "A date and time is required." }),
  requirements: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

export default function BookingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [missions, setMissions] = useLocalStorage<Mission[]>('missions', INITIAL_MISSIONS);
  const [isDetecting, setIsDetecting] = useState(false);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      pickupLocation: "",
      destinationLocation: "",
      requirements: "",
    },
  });

  const handleDetectLocation = () => {
    setIsDetecting(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // For simplicity, we'll just use the coordinates as the location string.
          // A real app would use a reverse geocoding service to get an address.
          const locationString = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
          form.setValue("pickupLocation", locationString);
          setIsDetecting(false);
          toast({
            title: "Location Detected!",
            description: "Pickup location has been set to your current position.",
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
          setIsDetecting(false);
          toast({
            variant: "destructive",
            title: "Location Error",
            description: "Could not detect your location. Please enter it manually.",
          });
        }
      );
    } else {
      setIsDetecting(false);
      toast({
        variant: "destructive",
        title: "Unsupported",
        description: "Geolocation is not supported by your browser.",
      });
    }
  };


  function onSubmit(data: BookingFormValues) {
    const newMission: Mission = {
      id: `mission-${Math.random().toString(36).substr(2, 9)}`,
      status: 'Pending',
      customerId: 'customer-1', // Mock customer
      estimatedPrice: Math.floor(Math.random() * 400) + 50, // Mock price
      ...data,
      dateTime: data.dateTime.toISOString(),
    };

    setMissions([...missions, newMission]);

    toast({
      title: "Booking Submitted!",
      description: `Your mission request #${newMission.id} has been received.`,
    });

    router.push(`/track?missionId=${newMission.id}`);
  }

  return (
    <>
      <Header />
      <div className="container py-12">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Book a Drone Mission</CardTitle>
            <CardDescription>Fill out the details below to schedule your drone service.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {serviceTypes.map(service => (
                            <SelectItem key={service} value={service}>{service}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="pickupLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center justify-between gap-2">
                            <span className="flex items-center gap-2"><MapPin className="h-4 w-4"/> Pickup Location</span>
                             <Button type="button" variant="link" size="sm" className="p-0 h-auto" onClick={handleDetectLocation} disabled={isDetecting}>
                                {isDetecting ? <Loader2 className="h-4 w-4 animate-spin"/> : <LocateFixed className="h-4 w-4"/>}
                                <span className="ml-1">Detect</span>
                             </Button>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 123 Main St, Anytown" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="destinationLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2"><MapPin className="h-4 w-4"/> Destination Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 456 Oak Ave, Othertown" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="dateTime"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Preferred Date & Time</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Book className="h-4 w-4"/> Optional Requirements</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Any special instructions or files to upload?" {...field} />
                      </FormControl>
                       <FormDescription>
                        For the MVP, please describe any files. A file upload feature will be added later.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Card className="bg-muted/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-semibold flex items-center gap-2"><DollarSign className="h-5 w-5"/> Estimated Price</CardTitle>
                        <div className="text-2xl font-bold text-primary">$125.00</div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-muted-foreground">This is an estimate. The final price will be confirmed by an admin upon booking approval.</p>
                    </CardContent>
                </Card>

                <Button type="submit" className="w-full" size="lg">Confirm and Submit Booking</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
