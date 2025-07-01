import React, { useState } from 'react';
import { ArrowRight, Play, Shield, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BackgroundSlideshow from './BackgroundSlideshow';
import BookingModal from './BookingModal';

const Hero = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <BackgroundSlideshow />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Hero Content */}
            <div className="animate-fade-in-up">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-playfair font-bold mb-4 sm:mb-6 leading-tight">
                Your Journey to{' '}
                <span className="text-gradient bg-gradient-to-r from-physio-blue to-physio-green bg-clip-text text-transparent">
                  Complete Healing
                </span>{' '}
                Starts Here
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
                Experience world-class physiotherapy with personalized treatment plans, 
                cutting-edge technology, and compassionate care that gets you back to your best self.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
                <Button 
                  size="lg" 
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full sm:w-auto bg-gradient-physio hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 group touch-manipulation"
                >
                  Book Your Consultation
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto border-2 border-white text-gray-700 hover:bg-white hover:text-physio-blue transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 group backdrop-blur-sm touch-manipulation"
                >
                  <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
                  Watch Our Story
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto px-4">
                <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg touch-manipulation">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-physio-blue/20 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-physio-blue" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-base sm:text-lg text-gray-800">15+ Years</div>
                    <div className="text-xs sm:text-sm text-gray-600">Experience</div>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg touch-manipulation">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-physio-green/20 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-physio-green" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-base sm:text-lg text-gray-800">24/7</div>
                    <div className="text-xs sm:text-sm text-gray-600">Support</div>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg touch-manipulation">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-physio-teal/20 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-physio-teal" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-base sm:text-lg text-gray-800">1000+</div>
                    <div className="text-xs sm:text-sm text-gray-600">Happy Patients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Animation Elements - Hidden on mobile for performance */}
        <div className="hidden sm:block absolute top-20 left-10 w-4 h-4 bg-physio-blue/30 rounded-full animate-float"></div>
        <div className="hidden sm:block absolute top-40 right-20 w-6 h-6 bg-physio-green/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="hidden sm:block absolute bottom-40 left-20 w-8 h-8 bg-physio-teal/30 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="hidden sm:block absolute bottom-20 right-10 w-3 h-3 bg-physio-blue/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      </section>

      <BookingModal 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
};

export default Hero;