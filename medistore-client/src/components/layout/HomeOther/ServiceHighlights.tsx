import { Truck, ShieldCheck, Clock, Headphones } from "lucide-react";

const ServiceHighlights = () => {
  const features = [
    {
      icon: <Truck className="h-8 w-8 text-blue-600" />,
      title: "Fast Delivery",
      description: "Medicine at your doorstep within 30-60 minutes."
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-green-600" />,
      title: "100% Genuine",
      description: "Directly sourced from top pharmaceutical companies."
    },
    {
      icon: <Clock className="h-8 w-8 text-orange-600" />,
      title: "24/7 Service",
      description: "Order anytime, our team is always ready to help."
    },
    {
      icon: <Headphones className="h-8 w-8 text-purple-600" />,
      title: "Expert Advice",
      description: "Consult with our certified pharmacists for any query."
    }
  ];

  return (
    <section className="py-16 bg-muted/30 mt-10 rounded-3xl mx-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-border/50"
            >
              <div className="mb-4 p-3 bg-muted rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;