import React, { useState, useEffect, useRef } from "react";

export default function PhysioPracticeSite() {
  const [hoveredService, setHoveredService] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const observerRef = useRef();

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.dataset.animate]: true
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    // Observe all elements with data-animate attribute
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observerRef.current?.observe(el));

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
            <a href="tel:+264813719494" className="hover:text-emerald-300 hover:scale-105 transition-all duration-200">📱 +264 81 371 9494</a>
            <a
              href="https://wa.me/264813719494?text=Hi%20Ronelle%20Isaacs%20Physiotherapists%2C%20I%27d%20like%20to%20chat."
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-300 hover:scale-105 transition-all duration-200"
            >
              💬 WhatsApp
            </a>
            <a href="mailto:reception91@iway.na" className="hover:text-emerald-300 hover:scale-105 transition-all duration-200">✉️ Email</a>
            <a 
              href="https://www.facebook.com/profile.php?id=100057088824283&mibextid=sCpJLy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-emerald-300 hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <img src="/facebook-icon.png" alt="Facebook" className="w-4 h-4" />
              Facebook
            </a>
            <a 
              href="https://www.instagram.com/91physio_ronelle_isaacs_physio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
              target="_blank" 
              rel="noopener noreferrer"
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
            <a href="#booking" className="rounded-full bg-emerald-600 text-white px-6 py-2.5 hover:bg-emerald-700 hover:scale-105 hover:shadow-lg transition-all duration-200 shadow-sm">
              Book Now
            </a>
          </nav>
          <a href="#booking" className="md:hidden rounded-full bg-emerald-600 text-white px-4 py-2 text-sm hover:bg-emerald-700 hover:scale-105 transition-all duration-200">
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
                <a href="#booking" className="group rounded-xl bg-emerald-600 text-white px-8 py-4 font-semibold hover:bg-emerald-700 hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg">
                  <span className="group-hover:animate-pulse">Book an Appointment</span>
                </a>
                <a
                  href="https://wa.me/264813719494?text=Hi%20Ronelle%20Isaacs%20Physiotherapists%2C%20I%27d%20like%20to%20enquire%20about%20physiotherapy."
                  target="_blank"
                  rel="noopener noreferrer"
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
              evidence-based evaluation and expert treatment plans for the best conservative management. 
              Let us hear your story, and let us be part of the solution.
            </p>
          </div>

          {/* Stats Section with Counter Animation */}
          <div 
            className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 transform transition-all duration-1000 ${
              isVisible['stats'] ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            data-animate="stats"
          >
            {[
              { number: 15, label: "Years Experience", suffix: "+" },
              { number: 1000, label: "Happy Patients", suffix: "+" },
              { number: 4, label: "Specializations", suffix: "" },
              { number: 6, label: "Days a Week", suffix: "" }
            ].map((stat, index) => {
              const [count, setIsActive] = useCountUp(stat.number);
              
              useEffect(() => {
                if (isVisible['stats']) {
                  setTimeout(() => setIsActive(true), index * 200);
                }
              }, [isVisible['stats'], setIsActive, index]);

              return (
                <div key={index} className="text-center group cursor-default">
                  <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {count}{stat.suffix}
                  </div>
                  <div className="text-sm md:text-base text-slate-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
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
                icon: "💬"
              },
              {
                href: "tel:+264813719494", 
                text: "Call Mobile",
                icon: "📱"
              },
              {
                href: "mailto:reception91@iway.na",
                text: "Email Us", 
                icon: "✉️"
              },
              {
                href: "https://maps.app.goo.gl/1EZhzDxG4BJTdFME9",
                text: "Get Directions",
                icon: "🗺️"
              },
              {
                href: "#contact",
                text: "Contact & Hours",
                icon: "📍"
              }
            ].map((action, index) => (
              <a
                key={index}
                href={action.href}
                target={action.href.startsWith('http') ? '_blank' : undefined}
                rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
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
                  primary: true
                },
                {
                  href: "tel:+264813719494",
                  text: "📱 Call Mobile",
                  primary: false
                },
                {
                  href: "mailto:reception91@iway.na",
                  text: "✉️ Email Us",
                  primary: false
                }
