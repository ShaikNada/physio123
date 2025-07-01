import React, { useEffect, useRef } from 'react';
import { Award, Users, Clock, MapPin } from 'lucide-react';

const About = () => {
  const achievements = [
    {
      icon: Award,
      number: "15+",
      label: "Years Experience",
      color: "text-physio-blue"
    },
    {
      icon: Users,
      number: "500+",
      label: "Patients Treated",
      color: "text-physio-green"
    },
    {
      icon: Clock,
      number: "98%",
      label: "Success Rate",
      color: "text-physio-teal"
    },
    {
      icon: MapPin,
      number: "3",
      label: "Clinic Locations",
      color: "text-physio-blue"
    }
  ];

  const experts = [
    {
      name: "Dr. Rahul Dogra",
      role: "Ortho Physiotherapist",
      img: "https://www.iconpacks.net/icons/1/free-user-icon-295-thumb.png",
      info: "Expert in orthopedic rehab and joint pain"
    },
    {
      name: "Dr. Mukesh Saran",
      role: "Sports Physiotherapist",
      img: "https://www.iconpacks.net/icons/1/free-user-icon-295-thumb.png",
      info: "Sports injury & spine rehab specialist"
    },
    {
      name: "Dr. Diksha Jamwal",
      role: "Physiotherapist",
      img: "https://www.iconpacks.net/icons/1/free-user-icon-295-thumb.png",
      info: "Neurological rehab and chronic pain"
    },
    {
      name: "Dr. Mohd Faizan",
      role: "Physiotherapist",
      img: "https://www.iconpacks.net/icons/1/free-user-icon-295-thumb.png",
      info: "Post-surgical and spine rehab"
    }
  ];

  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const cardWidth = window.innerWidth < 640 ? 200 : 310; // Smaller card width on mobile
        scrollRef.current.scrollBy({
          left: cardWidth,
          behavior: 'smooth'
        });

        if (
          scrollRef.current.scrollLeft + scrollRef.current.offsetWidth >=
          scrollRef.current.scrollWidth
        ) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="bg-white py-12 px-4 sm:px-6 lg:px-16">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in-up">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold leading-tight">
                Dedicated to Your
                <span className="text-gradient block">Complete Recovery</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                At PhysioHeal, we combine cutting-edge physiotherapy techniques with 
                compassionate care to help you achieve optimal health and mobility. Our 
                team of certified professionals is committed to providing personalized 
                treatment plans that address your unique needs.
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                With over 15 years of experience, we've helped hundreds of patients 
                recover from injuries, manage chronic pain, and improve their quality 
                of life through evidence-based physiotherapy practices.
              </p>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {achievements.map((achievement, index) => (
                <div 
                  key={achievement.label}
                  className="bg-white p-4 rounded-xl shadow-md animate-scale-in"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 ${achievement.color.replace('text-', 'bg-')}/10 rounded-lg flex items-center justify-center`}>
                      <achievement.icon className={`${achievement.color} w-4 h-4 sm:w-5 sm:h-5`} />
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl font-bold text-gray-900">{achievement.number}</div>
                      <div className="text-xs sm:text-sm text-gray-600">{achievement.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Expert Carousel */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div
              ref={scrollRef}
              className="overflow-x-auto no-scrollbar flex space-x-4 sm:space-x-6 w-full max-w-full touch-auto snap-x snap-mandatory"
            >
              {experts.map((expert, idx) => (
                <div
                  key={idx}
                  className="min-w-[180px] sm:min-w-[260px] bg-white rounded-xl shadow-md p-3 sm:p-4 text-center group relative transition-transform duration-300 hover:scale-105 snap-center"
                >
                  <div className="relative w-full h-56 sm:h-72 overflow-hidden rounded-xl">
                    <img
                      src={expert.img}
                      alt={expert.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center text-white text-xs sm:text-sm px-3 sm:px-4 text-center">
                      {expert.info}
                    </div>
                  </div>
                  <h4 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-gray-800">{expert.name}</h4>
                  <p className="text-xs sm:text-sm text-gray-500">{expert.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;