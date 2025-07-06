
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import BookingModal from './BookingModal';
import { saveContactForm } from '@/services/firebaseService';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Save form data to Firebase
      await saveContactForm(formData);
      console.log('Contact form submitted:', formData);
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });

      // Prepare Gmail compose URL with form data
      const emailBody = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0APhone: ${formData.phone || 'Not provided'}%0D%0AMessage: ${formData.message}`;
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=shaiknaveed7007@gmail.com&su=Physiotherapy Inquiry&body=${encodeURIComponent(emailBody)}`;
      window.open(gmailUrl, '_blank');

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error",
        description: "Failed to save message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCardClick = (type: string) => {
    switch (type) {
      case 'phone':
        window.open('tel:+91 8897261748', '_self');
        break;
      case 'email':
        window.open('https://mail.google.com/mail/?view=cm&fs=1&to=shaiknaveed7007@gmail.com&su=Physiotherapy Inquiry&body=Hello, I would like to inquire about your services.', '_blank');
        break;
      case 'location':
        window.open('https://maps.google.com?q=123+Health+Street,+Medical+District,+New+York,+NY+10001', '_blank');
        break;
      case 'emergency':
        window.open('tel:+91 88972 61748', '_self');
        break;
      default:
        break;
    }
  };

  const contactInfo = [
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Fri: 8:00 AM - 8:00 PM", "Sat-Sun: 9:00 AM - 5:00 PM"],
      color: "text-physio-blue",
      bgColor: "bg-physio-blue/10",
      type: "emergency",
      action: "Emergency Call"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["(91) 8897261748 ", "Emergency: (91) 8897261748"],
      color: "text-physio-green",
      bgColor: "bg-physio-green/10",
      type: "phone",
      action: "Call Now"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["shaiknaveed7007@gmail.com"],
      color: "text-physio-teal",
      bgColor: "bg-physio-teal/10",
      type: "email",
      action: "Send Email"
    }
  ];

  return (
    <>
      <section id="contact" className="bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-16">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold mb-4 sm:mb-6">
              Get In <span className="text-gradient">Touch</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Ready to start your healing journey? Contact us today to schedule your consultation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {/* Contact Information */}
            <div className="space-y-4 sm:space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {contactInfo.map((info, index) => (
                <Card 
                  key={info.title} 
                  className="border-0 shadow-md hover:shadow-lg transition-all duration-300 group transform hover:scale-105 cursor-pointer"
                  onClick={() => handleCardClick(info.type)}
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 ${info.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <info.icon className={`${info.color} w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-pulse`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg group-hover:text-physio-blue transition-colors duration-300">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 text-xs sm:text-sm hover:text-gray-800 transition-colors duration-300">{detail}</p>
                        ))}
                        <div className="mt-2 sm:mt-3">
                          <span className="text-xs text-physio-blue font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Click to {info.action}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <h3 className="text-xl sm:text-2xl font-playfair font-bold mb-4 sm:mb-6 text-gray-900">
                    Send Us a Message
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="group">
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 group-hover:text-physio-blue transition-colors duration-300">
                          Name *
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your name"
                          required
                          className="h-10 sm:h-12 focus:ring-physio-blue focus:border-physio-blue hover:border-physio-blue/50 transition-all duration-300 text-sm sm:text-base"
                        />
                      </div>
                      <div className="group">
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 group-hover:text-physio-blue transition-colors duration-300">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                          className="h-10 sm:h-12 focus:ring-physio-blue focus:border-physio-blue hover:border-physio-blue/50 transition-all duration-300 text-sm sm:text-base"
                        />
                      </div>
                    </div>
                    <div className="group">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 group-hover:text-physio-blue transition-colors duration-300">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                        className="h-10 sm:h-12 focus:ring-physio-blue focus:border-physio-blue hover:border-physio-blue/50 transition-all duration-300 text-sm sm:text-base"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 group-hover:text-physio-blue transition-colors duration-300">
                        Message
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="How can we help you?"
                        className="min-h-[100px] sm:min-h-[120px] resize-none focus:ring-physio-blue focus:border-physio-blue hover:border-physio-blue/50 transition-all duration-300 text-sm sm:text-base"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      size="lg" 
                      disabled={isLoading}
                      className="w-full bg-gradient-physio hover:opacity-90 transition-all duration-300 h-10 sm:h-12 text-sm sm:text-base group"
                    >
                      <Send size={16} className="mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                      {isLoading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <BookingModal 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
};

export default Contact;
