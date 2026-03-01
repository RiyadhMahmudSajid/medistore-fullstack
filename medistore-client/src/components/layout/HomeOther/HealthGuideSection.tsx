import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeartPulse, Stethoscope, ShieldAlert } from "lucide-react";

const HealthGuideSection = () => {
  return (
    <section className="container mx-auto py-20 px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
  
        <div className="space-y-6">
          <Badge variant="outline" className="px-4 py-1 border-primary text-primary font-semibold">
            Health Guide
          </Badge>
          <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Your Health is Our <span className="text-primary">Priority</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Get expert advice on how to manage your medicines and maintain a healthy lifestyle. Our pharmacists are here to guide you every step of the way.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-xl border bg-card hover:shadow-md transition-all group">
              <HeartPulse className="h-10 w-10 text-red-500 mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold">Regular Checkups</h4>
              <p className="text-sm text-muted-foreground">Keep track of your vital signs daily.</p>
            </div>
            <div className="p-4 rounded-xl border bg-card hover:shadow-md transition-all group">
              <ShieldAlert className="h-10 w-10 text-amber-500 mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold">Safety First</h4>
              <p className="text-sm text-muted-foreground">Always check expiry dates before use.</p>
            </div>
          </div>

          <Button size="lg" className="rounded-full px-8">
            Consult a Pharmacist
          </Button>
        </div>

        <div className="bg-muted/50 p-8 rounded-3xl border border-border">
          <div className="flex items-center gap-2 mb-6">
            <Stethoscope className="text-primary h-6 w-6" />
            <h3 className="text-2xl font-bold">Common Questions</h3>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left font-medium">How can I order medicine online?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Simply search for your medicine, add to cart, upload your prescription if required, and checkout. We deliver within 60 minutes.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-medium">Is a prescription mandatory?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                For OTC (Over-The-Counter) medicines like Napa, it’s not required. But for Antibiotics and high-dose drugs, a valid prescription is mandatory.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-medium">How do I store my medicines?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Most medicines should be stored in a cool, dry place away from direct sunlight. Some (like Insulin) require refrigeration.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

      </div>
    </section>
  );
};

export default HealthGuideSection;