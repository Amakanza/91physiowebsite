import React, { useState, useEffect, useRef } from "react";
import { 
  trackWhatsAppClick, 
  trackPhoneClick, 
  trackEmailClick, 
  trackSocialClick, 
  trackDirectionsClick,
  trackBookingIntent,
  trackSectionView 
} from './utils/analytics';

export default function PhysioPracticeSite() {
  const [hoveredService, setHoveredService] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const observerRef = useRef();

  // Intersection Observer for scroll animations and section tracking
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.dataset.animate]: true
            }));
            
            // Track section views
            const sectionId = entry.target.id;
            if (sectionId) {
              trackSectionView(sectionId);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    // Observe all elements with data-animate attribute
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observerRef.current?.observe(el));

    // Also observe main sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observerRef.current?.observe(section));

    return () => observerRef.current?.disconnect();
  }, []);

  // Counter animation hook
  const useCountUp = (end, duration = 2000) => {
    const [count, setCount] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
      if (!isActive) return;
      
      let startTime;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }, [isActive, end, duration]);

    return [count, setIsActive];
  };

  const bodyPartServices = [
    {
      id: 'musculoskeletal',
      title: 'Musculoskeletal',
      description: 'Back & neck pain, shoulder injuries, sports rehab, and posture correction',
      details: [
        "Back & neck pain (incl. sciatica)",
        "Shoulder, knee, ankle injuries", 
        "Tendinopathy & overuse injuries",
        "Sports rehab & return-to-play",
        "Posture & ergonomics, TMJ"
      ]
    },
    {
      id: 'cardio',
      title: 'Cardiorespiratory',
      description: 'Chest physiotherapy, breathing retraining, and post-COVID recovery',
      details: [
        "Paediatric chest physiotherapy",
        "Airway clearance (PEP/ACT)",
        "Breathing retraining",
        "Post-operative chest physiotherapy",
        "Pneumonia/COPD support",
        "Post-COVID recovery"
      ]
    },
    {
      id: 'neuro',
      title: 'Neurological', 
      description: 'Stroke rehabilitation, balance training, and brain injury support',
      details: [
        "Stroke rehabilitation & balance training",
        "Gait re-education & coordination",
        "Brain injury rehabilitation",
        "Functional independence & carer training"
      ]
    },
    {
      id: 'pediatric',
      title: 'Pediatric',
      description: 'Cerebral palsy management, developmental delay, and youth sports',
      details: [
        "Cerebral palsy (CP) management",
        "Developmental delay support", 
        "Congenital conditions",
        "Youth sports injuries",
        "Family education"
      ]
    }
  ];

  return (
    <div className="relative min-h-screen bg-white text-neutral-800 overflow-hidden">
      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-emerald-50/30" />
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-200/20 rounded-full animate-float-slow" />
        <div className="absolute top-40 right-20 w-20 h-20 bg-blue-200/30 rounded-full animate-float-delayed" />
        <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-emerald-300/20 rounded-full animate-float" />
      </div>
      
      {/* Top Bar */}
      <div className="w-full bg-slate-900 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">📍 Windhoek North · Namibia</span>
            <span className="text-slate-300">🕒 Mon–Fri 07:30–18:00 · Sat 08:00–13:00</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="tel:+264813719494" 
              onClick={() => trackPhoneClick('mobile', 'top_bar')}
              className="hover:text-emerald-300 hover:scale-105 transition-all duration-200"
            >
              📱 +264 81 371 9494
            </a>
            <a
              href="https://wa.me/264813719494?text=Hi%20Ronelle%20Isaacs%20Physiotherapists%2C%20I%27d%20like%20to%20chat."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('top_bar')}
              className="hover:text-emerald-300 hover:scale-105 transition-all duration-200"
            >
              💬 WhatsApp
            </a>
            <a 
              href="mailto:reception91@iway.na" 
              onClick={() => trackEmailClick('top_bar')}
              className="hover:text-emerald-300 hover:scale-105 transition-all duration-200"
            >
              ✉️ Email
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=100057088824283&mibextid=sCpJLy" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackSocialClick('facebook', 'top_bar')}
              className="hover:text-emerald-300 hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <img src="/facebook-icon.png" alt="Facebook" className="w-4 h-4" />
              Facebook
            </a>
            <a 
              href="https://www.instagram.com/91physio_ronelle_isaacs_physio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackSocialClick('instagram', 'top_bar')}
              className="hover:text-emerald-300 hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <img src="/instagram-icon.png" alt="Instagram" className="w-4 h-4" />
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Header / Nav */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="#home" className="font-bold text-xl tracking-tight text-slate-900 transform hover:scale-105 transition-transform duration-200">
            Ronelle Isaacs Physiotherapists
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#home" className="relative text-slate-700 hover:text-emerald-600 transition-colors duration-200 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-emerald-600 before:transition-all before:duration-300 hover:before:w-full">Home</a>
            <a href="#services" className="relative text-slate-700 hover:text-emerald-600 transition-colors duration-200 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-emerald-600 before:transition-all before:duration-300 hover:before:w-full">Services</a>
            <a href="#faq" className="relative text-slate-700 hover:text-emerald-600 transition-colors duration-200 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-emerald-600 before:transition-all before:duration-300 hover:before:w-full">FAQ</a>
            <a href="#contact" className="relative text-slate-700 hover:text-emerald-600 transition-colors duration-200 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-emerald-600 before:transition-all before:duration-300 hover:before:w-full">Contact</a>
            <a 
              href="#booking" 
              onClick={() => trackBookingIntent('header_nav')}
              className="rounded-full bg-emerald-600 text-white px-6 py-2.5 hover:bg-emerald-700 hover:scale-105 hover:shadow-lg transition-all duration-200 shadow-sm"
            >
              Book Now
            </a>
          </nav>
          <a 
            href="#booking" 
            onClick={() => trackBookingIntent('mobile_header')}
            className="md:hidden rounded-full bg-emerald-600 text-white px-4 py-2 text-sm hover:bg-emerald-700 hover:scale-105 transition-all duration-200"
          >
            Book
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-emerald-50/30" />
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div 
              className={`transform transition-all duration-1000 ${
                isVisible['hero-text'] ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              data-animate="hero-text"
            >
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-slate-900">
                <span className="block animate-fade-in-up">Reach Your</span>
                <span className="block text-emerald-600 animate-fade-in-up animation-delay-300">Goals with Us</span>
              </h1>
              <p className="mt-6 text-xl text-slate-600 leading-relaxed animate-fade-in-up animation-delay-600">
                Whether it's pain management, respiratory care, or improvement in functional abilities, we can help. 
                Our practice uses evidence-based guidelines to improve your quality of life.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4 animate-fade-in-up animation-delay-900">
                <a 
                  href="#booking" 
                  onClick={() => trackBookingIntent('hero_primary')}
                  className="group rounded-xl bg-emerald-600 text-white px-8 py-4 font-semibold hover:bg-emerald-700 hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg"
                >
                  <span className="group-hover:animate-pulse">Book an Appointment</span>
                </a>
                <a
                  href="https://wa.me/264813719494?text=Hi%20Ronelle%20Isaacs%20Physiotherapists%2C%20I%27d%20like%20to%20enquire%20about%20physiotherapy."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('hero_secondary')}
                  className="rounded-xl border-2 border-emerald-600 text-emerald-600 px-8 py-4 font-semibold hover:bg-emerald-50 hover:scale-105 hover:shadow-lg transition-all duration-300"
                >
                  WhatsApp Us
                </a>
              </div>

              {/* Key Benefits */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "✅ First-line practitioners (no referral required)",
                  "✅ Direct medical aid claiming", 
                  "✅ Hospital & outpatient care",
                  "✅ Sports & musculoskeletal care"
                ].map((benefit, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center gap-3 text-slate-700 font-medium transform transition-all duration-500 hover:scale-105 ${
                      isVisible['hero-text'] 
                        ? 'translate-x-0 opacity-100' 
                        : 'translate-x-4 opacity-0'
                    }`}
                    style={{ transitionDelay: `${1200 + index * 200}ms` }}
                  >
                    <span className="text-emerald-600 text-lg animate-bounce-subtle">{benefit.split(' ')[0]}</span>
                    <span>{benefit.substring(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div 
              className={`relative transform transition-all duration-1200 ${
                isVisible['hero-image'] ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
              }`}
              data-animate="hero-image"
            >
              <div className="aspect-[4/5] bg-gradient-to-br from-emerald-100 to-blue-100 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 hover:shadow-3xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white transform translate-y-4 animate-slide-up animation-delay-1500">
                  <h3 className="text-xl font-semibold animate-fade-in animation-delay-1800">Professional Care</h3>
                  <p className="text-sm opacity-90 animate-fade-in animation-delay-2100">Personalized treatment plans</p>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-emerald-500 rounded-full opacity-20 animate-float" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500 rounded-full opacity-10 animate-float-delayed" />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-100/30 rounded-full -translate-x-32 -translate-y-32 animate-float-slow" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-100/30 rounded-full translate-x-24 translate-y-24 animate-float-delayed" />
        
        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <div 
            className={`transform transition-all duration-1000 ${
              isVisible['philosophy'] ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            data-animate="philosophy"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-6 animate-fade-in-up">Our Philosophy</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-300">
              The body is wonderfully complex. As first-line practitioners, we are trained to give you 
              evidence-based evaluation and expert treatment plans for physiotherapy management. 
              Let us hear your story, and let us be part of the solution.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Services Section */}
      <section id="services" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div 
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible['services-header'] ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            data-animate="services-header"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Specialized Treatment Areas</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Explore our comprehensive range of physiotherapy services tailored to your specific needs
            </p>
          </div>

          {/* Interactive Service Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {bodyPartServices.map((service, index) => (
              <div
                key={service.id}
                className={`relative group cursor-pointer transition-all duration-500 transform ${
                  hoveredService === service.id 
                    ? 'scale-105 -translate-y-2' 
                    : 'hover:scale-102'
                } ${
                  isVisible[`service-${index}`] 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                data-animate={`service-${index}`}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border-2 border-transparent hover:border-emerald-200 relative overflow-hidden">
                  {/* Animated background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-blue-50/50 transition-opacity duration-500 ${
                    hoveredService === service.id ? 'opacity-100' : 'opacity-0'
                  }`} />
                  
                  <div className="relative">
                    <div className={`w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full mb-6 flex items-center justify-center transform transition-all duration-500 ${
                      hoveredService === service.id ? 'scale-110 rotate-12' : ''
                    }`}>
                      <span className="text-white font-bold text-xl">
                        {service.title.charAt(0)}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                    <p className="text-slate-600 mb-4">{service.description}</p>
                    
                    <div className={`transition-all duration-500 ${
                      hoveredService === service.id 
                        ? 'max-h-96 opacity-100' 
                        : 'max-h-0 opacity-0 overflow-hidden'
                    }`}>
                      <ul className="space-y-2 pt-4 border-t border-emerald-100">
                        {service.details.map((detail, detailIndex) => (
                          <li 
                            key={detailIndex} 
                            className={`text-sm text-slate-600 flex items-start gap-2 transform transition-all duration-300 ${
                              hoveredService === service.id 
                                ? 'translate-x-0 opacity-100' 
                                : 'translate-x-2 opacity-0'
                            }`}
                            style={{ transitionDelay: `${detailIndex * 100}ms` }}
                          >
                            <span className="text-emerald-500 mt-1 animate-bounce-subtle">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Services */}
          <div 
            className={`grid md:grid-cols-2 gap-8 transform transition-all duration-1000 ${
              isVisible['additional-services'] ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            data-animate="additional-services"
          >
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-8 border border-slate-200 transform hover:scale-105 hover:-translate-y-1 transition-all duration-500 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold">🏥</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Hospital Care</h3>
              </div>
              <ul className="space-y-3 text-slate-600">
                {[
                  "Early mobilisation & discharge planning",
                  "Post-operative (abdominal/thoracic) care",
                  "ICU physiotherapy (as arranged)",
                  "Respiratory care & PEP techniques"
                ].map((item, index) => (
                  <li 
                    key={index}
                    className={`flex items-start gap-3 transform transition-all duration-300 ${
                      isVisible['additional-services'] 
                        ? 'translate-x-0 opacity-100' 
                        : 'translate-x-4 opacity-0'
                    }`}
                    style={{ transitionDelay: `${600 + index * 150}ms` }}
                  >
                    <span className="text-emerald-500 mt-1 animate-bounce-subtle">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-8 border border-slate-200 transform hover:scale-105 hover:-translate-y-1 transition-all duration-500 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold">🏠</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Home Visits</h3>
              </div>
              <ul className="space-y-3 text-slate-600">
                {[
                  "Home-based rehab after hospital discharge",
                  "Falls prevention & mobility training",
                  "Equipment advice (walkers, wheelchairs)",
                  "Elderly care & caregiver training"
                ].map((item, index) => (
                  <li 
                    key={index}
                    className={`flex items-start gap-3 transform transition-all duration-300 ${
                      isVisible['additional-services'] 
                        ? 'translate-x-0 opacity-100' 
                        : 'translate-x-4 opacity-0'
                    }`}
                    style={{ transitionDelay: `${800 + index * 150}ms` }}
                  >
                    <span className="text-emerald-500 mt-1 animate-bounce-subtle">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Actions */}
          <div 
            className={`mt-16 grid sm:grid-cols-2 lg:grid-cols-5 gap-4 transform transition-all duration-1000 ${
              isVisible['quick-actions'] ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            data-animate="quick-actions"
          >
            {[
              {
                href: "https://wa.me/264813719494?text=Hi%20Ronelle%20Isaacs%20Physiotherapists%2C%20I%27d%20like%20to%20book%20an%20appointment.",
                text: "WhatsApp Booking",
                icon: "💬",
                onClick: () => {
                  trackWhatsAppClick('services_quick_action');
                  trackBookingIntent('whatsapp');
                }
              },
              {
                href: "tel:+264813719494", 
                text: "Call Mobile",
                icon: "📱",
                onClick: () => trackPhoneClick('mobile', 'services_quick_action')
              },
              {
                href: "mailto:reception91@iway.na",
                text: "Email Us", 
                icon: "✉️",
                onClick: () => trackEmailClick('services_quick_action')
              },
              {
                href: "https://maps.app.goo.gl/1EZhzDxG4BJTdFME9",
                text: "Get Directions",
                icon: "🗺️",
                onClick: () => trackDirectionsClick('services_quick_action')
              },
              {
                href: "#contact",
                text: "Contact & Hours",
                icon: "📍",
                onClick: () => trackSectionView('contact')
              }
            ].map((action, index) => (
              <a
                key={index}
                href={action.href}
                target={action.href.startsWith('http') ? '_blank' : undefined}
                rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                onClick={action.onClick}
                className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 p-6 text-center border border-slate-200 hover:border-emerald-200 transform hover:scale-105 hover:-translate-y-2 ${
                  isVisible['quick-actions'] 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl mb-3 group-hover:scale-125 group-hover:animate-bounce transition-transform duration-300">{action.icon}</div>
                <div className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors duration-200">{action.text}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20 bg-gradient-to-br from-emerald-600 to-blue-600 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float-slow" />
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-white/10 rounded-full animate-float-delayed" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/5 rounded-full animate-float" />
        
        <div className="max-w-5xl mx-auto px-4 text-center relative">
          <div 
            className={`transform transition-all duration-1000 ${
              isVisible['booking'] ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            data-animate="booking"
          >
            <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">Ready to Start Your Recovery?</h2>
            <p className="text-xl mb-8 text-emerald-100 animate-fade-in-up animation-delay-300">
              Scheduling is handled in real time by our team. Reach out using your preferred method below.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              {[
                {
                  href: "https://wa.me/264813719494?text=Hi%20Ronelle%20Isaacs%20Physiotherapists%2C%20I%27d%20like%20to%20book%20an%20appointment.",
                  text: "💬 WhatsApp Booking",
                  primary: true,
                  onClick: () => {
                    trackWhatsAppClick('booking_section');
                    trackBookingIntent('whatsapp');
                  }
                },
                {
                  href: "tel:+264813719494",
                  text: "📱 Call Mobile",
                  primary: false,
                  onClick: () => {
                    trackPhoneClick('mobile', 'booking_section');
                    trackBookingIntent('phone');
                  }
                },
                {
                  href: "mailto:reception91@iway.na",
                  text: "✉️ Email Us",
                  primary: false,
                  onClick: () => trackEmailClick('booking_section')
                }
              ].map((button, index) => (
                <a
                  key={index}
                  href={button.href}
                  target={button.href.startsWith('http') ? '_blank' : undefined}
                  rel={button.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  onClick={button.onClick}
                  className={`transform transition-all duration-500 hover:scale-105 hover:-translate-y-1 ${
                    isVisible['booking'] 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-8 opacity-0'
                  } ${
                    button.primary
                      ? "bg-white text-emerald-600 rounded-xl px-8 py-4 font-semibold hover:bg-slate-50 hover:shadow-2xl shadow-lg group"
                      : "bg-transparent border-2 border-white text-white rounded-xl px-8 py-4 font-semibold hover:bg-white hover:text-emerald-600 hover:shadow-xl"
                  }`}
                  style={{ transitionDelay: `${600 + index * 200}ms` }}
                >
                  <span className={button.primary ? "group-hover:animate-pulse" : ""}>{button.text}</span>
                </a>
              ))}
            </div>
            
            <div 
              className={`transform transition-all duration-1000 ${
                isVisible['booking'] 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: '1200ms' }}
            >
              <p className="text-sm text-emerald-200 animate-fade-in animation-delay-1200">
                📅 Hours: Mon–Fri 07:30–18:00 · Sat 08:00–13:00 · Sun & Public Holidays Closed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-50 rounded-full -translate-y-24 translate-x-24 animate-float-slow" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full translate-y-32 -translate-x-32 animate-float-delayed" />
        
        <div className="max-w-4xl mx-auto px-4 relative">
          <div 
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible['faq-header'] ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            data-animate="faq-header"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-600">
              Common questions about our physiotherapy services and booking process
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "Do I need a doctor's referral to book an appointment?",
                answer: "No, you don't need a referral! As first-line practitioners, we can assess and treat you directly. You can book an appointment with us without needing to see your GP first. However, if you have medical aid, check if they require a referral for reimbursement purposes."
              },
              {
                question: "What should I bring to my first appointment?",
                answer: "Please bring a form of ID, your medical aid card (if applicable), any recent medical reports or scans related to your condition (digital version works as well), a list of current medications, and wear comfortable clothing that allows easy access to the area being treated."
              },
              {
                question: "Do you accept medical aid?",
                answer: "Yes, we offer direct medical aid claiming for your convenience. We work with most major medical aid schemes in Namibia. Please bring your medical aid card to your appointment, and we'll handle the claiming process for you."
              },
              {
                question: "How long is a typical physiotherapy session?",
                answer: "Our sessions last 40 minutes, which includes assessment, diagnosis, and treatment."
              },
              {
                question: "Do you offer home visits?",
                answer: "Yes, we provide home visit services for patients who cannot easily travel to our clinic. This includes post-hospital discharge rehabilitation, elderly care, mobility training, and equipment advice. Contact us to discuss your specific needs and arrange a home visit."
              },
              {
                question: "What conditions do you treat?",
                answer: "We treat a wide range of conditions including musculoskeletal injuries (back pain, sports injuries), cardiorespiratory conditions (chest physiotherapy, breathing problems), neurological conditions (stroke rehabilitation, balance issues), and pediatric conditions (cerebral palsy, developmental delays)."
              },
              {
                question: "How soon can I get an appointment?",
                answer: "Appointment availability varies depending on our current schedule. We work on a first-come first-serve basis and typically have availability within a few days. Contact us via WhatsApp or phone for the most up-to-date availability and to discuss any urgent needs."
              },
              {
                question: "What are your payment options?",
                answer: "We accept cash, card payments, and direct medical aid claiming. If you're paying privately, payment is expected at the time of service. For medical aid patients, we handle the claiming process directly with your scheme where possible."
              }
            ].map((faq, index) => (
              <div 
                key={index} 
                className={`bg-slate-50 rounded-xl p-6 border border-slate-200 hover:border-emerald-200 hover:shadow-lg transform transition-all duration-500 hover:scale-102 hover:-translate-y-1 group ${
                  isVisible[`faq-${index}`] 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                data-animate={`faq-${index}`}
              >
                <h3 className="text-lg font-semibold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div 
            className={`mt-12 text-center transform transition-all duration-1000 ${
              isVisible['faq-cta'] ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            data-animate="faq-cta"
          >
            <div className="bg-emerald-50 rounded-xl p-8 border border-emerald-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Still Have Questions?</h3>
              <p className="text-slate-600 mb-6">
                Don't see your question answered above? Our team is happy to help with any specific concerns or queries you may have.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://wa.me/264813719494?text=Hi%20Ronelle%20Isaacs%20Physiotherapists%2C%20I%20have%20a%20question%20about%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('faq_cta')}
                  className="bg-emerald-600 text-white rounded-xl px-6 py-3 font-semibold hover:bg-emerald-700 hover:scale-105 hover:shadow-lg transition-all duration-300 group"
                >
                  <span className="group-hover:animate-pulse">💬 Ask on WhatsApp</span>
                </a>
                <a 
                  href="tel:+264813719494" 
                  onClick={() => trackPhoneClick('mobile', 'faq_cta')}
                  className="border-2 border-emerald-600 text-emerald-600 rounded-xl px-6 py-3 font-semibold hover:bg-emerald-50 hover:scale-105 hover:shadow-lg transition-all duration-300"
                >
                  📱 Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-emerald-100/40 rounded-full animate-float-slow" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-100/40 rounded-full animate-float-delayed" />
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div 
              className={`transform transition-all duration-1000 ${
                isVisible['contact-info'] ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
              }`}
              data-animate="contact-info"
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-8">Find Your Physiotherapist</h2>
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-8 border border-slate-200 transform hover:scale-102 transition-all duration-500">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">Ronelle Isaacs Physiotherapists</h3>
                <div className="space-y-4 text-slate-600">
                  {[
                    {
                      icon: "📍",
                      title: "Main Office",
                      content: (
                        <div>
                          <div>91 PHYSIO @ Rhino Street</div>
                          <div>Windhoek North, Windhoek</div>
                          <a 
                            href="https://maps.app.goo.gl/1EZhzDxG4BJTdFME9"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackDirectionsClick('contact_info')}
                            className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 font-medium mt-1 transition-all duration-300 hover:scale-105"
                          >
                            🗺️ Get Directions
                          </a>
                        </div>
                      )
                    },
                    {
                      icon: "📱",
                      content: "Mobile/WhatsApp: +264 81 371 9494"
                    },
                    {
                      icon: "📞",
                      content: "Phone (Reception): +264 61 255 337"
                    },
                    {
                      icon: "✉️",
                      content: "Email: reception91@iway.na"
                    }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className={`flex items-start gap-3 transform transition-all duration-500 hover:scale-105 hover:text-emerald-600 ${
                        isVisible['contact-info'] 
                          ? 'translate-x-0 opacity-100' 
                          : 'translate-x-4 opacity-0'
                      }`}
                      style={{ transitionDelay: `${400 + index * 150}ms` }}
                    >
                      <span className="text-emerald-600 mt-1 animate-bounce-subtle">{item.icon}</span>
                      <div>
                        {item.title && <div className="font-medium">{item.title}</div>}
                        {item.content}
                      </div>
                    </div>
                  ))}
                  
                  {/* Social Media Links */}
                  <div className="space-y-3 pt-4 border-t border-slate-200">
                    {[
                      {
                        href: "https://www.facebook.com/profile.php?id=100057088824283&mibextid=sCpJLy",
                        text: "Follow us on Facebook",
                        icon: "/facebook-icon.png",
                        platform: "facebook"
                      },
                      {
                        href: "https://www.instagram.com/91physio_ronelle_isaacs_physio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
                        text: "Follow us on Instagram", 
                        icon: "/instagram-icon.png",
                        platform: "instagram"
                      }
                    ].map((social, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="text-emerald-600">
                          <img src={social.icon} alt={social.text.split(' ')[3]} className="w-5 h-5 hover:scale-110 transition-transform duration-300" />
                        </span>
                        <div>
                          <a 
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackSocialClick(social.platform, 'contact_info')}
                            className="text-emerald-600 hover:text-emerald-700 font-medium transition-all duration-300 hover:scale-105 inline-block"
                          >
                            {social.text}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div 
                  className={`mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-200 transform transition-all duration-700 hover:shadow-lg ${
                    isVisible['contact-info'] 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-4 opacity-0'
                  }`}
                  style={{ transitionDelay: '1000ms' }}
                >
                  <h4 className="font-semibold text-slate-900 mb-4">Operating Hours</h4>
                  <div className="space-y-2 text-sm text-slate-600">
                    {[
                      { days: "Monday – Friday:", hours: "07:30 – 18:00" },
                      { days: "Saturday:", hours: "08:00 – 13:00" },
                      { days: "Sunday & Public Holidays:", hours: "Closed", closed: true }
                    ].map((schedule, index) => (
                      <div 
                        key={index}
                        className={`flex justify-between hover:bg-white hover:px-2 hover:py-1 rounded transition-all duration-300 ${
                          schedule.closed ? 'text-red-600' : ''
                        }`}
                      >
                        <span>{schedule.days}</span>
                        <span className="font-medium">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div 
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl p-8 border border-slate-200 transform transition-all duration-1000 hover:scale-102 ${
                isVisible['contact-form'] ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
              }`}
              data-animate="contact-form"
            >
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Get In Touch</h3>
              <p className="text-slate-600 mb-6">
                Messages go straight to WhatsApp—our team will guide you from there. 
                No web forms, just direct communication.
              </p>
              
              <div className="space-y-4">
                {[
                  {
                    href: "https://wa.me/264813719494?text=Hi%20Ronelle%20Isaacs%20Physiotherapists%2C%20I%27d%20like%20to%20enquire%20about%20physiotherapy.",
                    text: "💬 Open WhatsApp",
                    primary: true,
                    onClick: () => trackWhatsAppClick('contact_form')
                  },
                  {
                    href: "tel:+264813719494",
                    text: "📱 Call Mobile",
                    primary: false,
                    onClick: () => trackPhoneClick('mobile', 'contact_form')
                  }
                ].map((button, index) => (
                  <a
                    key={index}
                    href={button.href}
                    target={button.href.startsWith('http') ? '_blank' : undefined}
                    rel={button.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    onClick={button.onClick}
                    className={`block w-full rounded-xl px-6 py-4 font-semibold text-center transition-all duration-500 hover:scale-105 hover:-translate-y-1 hover:shadow-lg group ${
                      isVisible['contact-form'] 
                        ? 'translate-y-0 opacity-100' 
                        : 'translate-y-4 opacity-0'
                    } ${
                      button.primary
                        ? "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-xl"
                        : "border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                    }`}
                    style={{ transitionDelay: `${400 + index * 200}ms` }}
                  >
                    <span className={button.primary ? "group-hover:animate-pulse" : ""}>{button.text}</span>
                  </a>
                ))}
                
                <div 
                  className={`flex gap-2 transform transition-all duration-700 ${
                    isVisible['contact-form'] 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-4 opacity-0'
                  }`}
                  style={{ transitionDelay: '800ms' }}
                >
                  {[
                    {
                      href: "https://www.facebook.com/profile.php?id=100057088824283&mibextid=sCpJLy",
                      text: "Facebook",
                      icon: "/facebook-icon.png",
                      platform: "facebook"
                    },
                    {
                      href: "https://www.instagram.com/91physio_ronelle_isaacs_physio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
                      text: "Instagram",
                      icon: "/instagram-icon.png",
                      platform: "instagram"
                    }
                  ].map((social, index) => (
                    <a 
                      key={index}
                      href={social.href}
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => trackSocialClick(social.platform, 'contact_form')}
                      className="flex-1 border border-slate-300 text-slate-600 rounded-lg px-4 py-3 font-medium text-center hover:bg-slate-50 hover:scale-105 hover:shadow-md transition-all duration-300 text-sm flex items-center justify-center gap-2 group"
                    >
                      <img src={social.icon} alt={social.text} className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                      {social.text}
                    </a>
                  ))}
                </div>
              </div>
              
              <p 
                className={`mt-4 text-xs text-slate-500 text-center transform transition-all duration-700 ${
                  isVisible['contact-form'] 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-2 opacity-0'
                }`}
                style={{ transitionDelay: '1000ms' }}
              >
                We reply fastest on WhatsApp during business hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-emerald-500/10 rounded-full animate-float-slow" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full animate-float-delayed" />
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div 
            className={`flex flex-col sm:flex-row items-center justify-between gap-6 transform transition-all duration-1000 ${
              isVisible['footer'] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            data-animate="footer"
          >
            <div className="text-center sm:text-left">
              <div className="font-semibold text-lg mb-2 hover:text-emerald-400 transition-colors duration-300 cursor-default">
                Ronelle Isaacs Physiotherapists
              </div>
              <div className="text-slate-400 text-sm">
                © {new Date().getFullYear()} · Windhoek North · Namibia
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              {[
                {
                  href: "tel:+264813719494",
                  text: "📱 +264 81 371 9494",
                  onClick: () => trackPhoneClick('mobile', 'footer')
                },
                {
                  href: "https://wa.me/264813719494",
                  text: "💬 WhatsApp",
                  onClick: () => trackWhatsAppClick('footer')
                },
                {
                  href: "https://www.facebook.com/profile.php?id=100057088824283&mibextid=sCpJLy",
                  text: "Facebook",
                  icon: "/facebook-icon.png",
                  onClick: () => trackSocialClick('facebook', 'footer')
                },
                {
                  href: "https://www.instagram.com/91physio_ronelle_isaacs_physio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
                  text: "Instagram", 
                  icon: "/instagram-icon.png",
                  onClick: () => trackSocialClick('instagram', 'footer')
                }
              ].map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  onClick={link.onClick}
                  className={`hover:text-emerald-400 hover:scale-110 transition-all duration-300 flex items-center gap-1 group ${
                    isVisible['footer'] 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-4 opacity-0'
                  }`}
                  style={{ transitionDelay: `${400 + index * 150}ms` }}
                >
                  {link.icon && (
                    <img 
                      src={link.icon} 
                      alt={link.text} 
                      className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" 
                    />
                  )}
                  <span className="group-hover:animate-pulse">{link.text}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div 
            className={`mt-8 pt-8 border-t border-slate-700 text-center transform transition-all duration-1000 ${
              isVisible['footer'] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '1000ms' }}
          >
            <p className="text-xs text-slate-500 hover:text-slate-400 transition-colors duration-300 cursor-default">
              Professional physiotherapy services · Evidence-based treatment · First-line practitioners
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
