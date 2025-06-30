
import React from 'react';
import { Activity, Heart, Zap, Shield, Users, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Services = () => {
  const services = [
    {
      icon: Activity,
      title: "Sports Injury Recovery",
      description: "Specialized treatment for athletes and sports-related injuries with advanced rehabilitation techniques.",
      color: "text-physio-blue",
      bgColor: "bg-physio-blue/10"
    },
    {
      icon: Heart,
      title: "Pain Management",
      description: "Comprehensive pain relief solutions using evidence-based physiotherapy methods and techniques.",
      color: "text-physio-green",
      bgColor: "bg-physio-green/10"
    },
    {
      icon: Zap,
      title: "Manual Therapy",
      description: "Hands-on treatment including massage, joint mobilization, and soft tissue manipulation.",
      color: "text-physio-teal",
      bgColor: "bg-physio-teal/10"
    },
    {
      icon: Shield,
      title: "Injury Prevention",
      description: "Proactive programs to prevent future injuries and maintain optimal physical health.",
      color: "text-physio-blue",
      bgColor: "bg-physio-blue/10"
    },
    {
      icon: Users,
      title: "Group Sessions",
      description: "Therapeutic group classes for rehabilitation and fitness in a supportive environment.",
      color: "text-physio-green",
      bgColor: "bg-physio-green/10"
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Convenient appointment times including evenings and weekends to fit your lifestyle.",
      color: "text-physio-teal",
      bgColor: "bg-physio-teal/10"
    }
  ];

  return (
    <section id="services" className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold mb-6">
            Our <span className="text-gradient">Expert Services</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Comprehensive physiotherapy solutions tailored to your unique needs and recovery goals
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className="hover-lift border-0 shadow-lg bg-white/80 backdrop-blur-sm animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                  <service.icon className={`${service.color} w-8 h-8`} />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

       
      </div>
    </section>
  );
};

export default Services;
