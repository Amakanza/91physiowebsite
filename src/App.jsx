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

  // Helper function to create tracked links
  const createTrackedLink = (href, trackingFunction, context, children, className = "", ...props) => {
    const handleClick = () => {
      trackingFunction(context);
    };

    return (
      <a
        href={href}
        onClick={handleClick}
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  };

  // Rest of your component logic remains the same...
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
    // ... other services remain the same
  ];

  return (
    <div className="relative min-h-screen bg-white text-neutral-800 overflow-hidden">
      {/* ... existing animated background code ... */}
      
      {/* Top Bar with tracked links */}
      <div className="w-full bg-slate-900 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">📍 Windhoek North · Namibia</span>
            <span className="text-slate-300">🕒 Mon–Fri 07:30–18:00 · Sat 08:00–13:00</span>
          </div>
          <div className="flex items-center gap-4">
            {createTrackedLink(
              "tel:+264813719494",
              () => trackPhoneClick('mobile', 'top_bar'),
              null,
              "📱 +264 81 371 9494",
              "hover:text-emerald-300 hover:scale-105 transition-all duration-200"
            )}
            {createTrackedLink(
              "https://wa.me/264813719494?text=Hi%20Ronelle%20Isaacs%20Physiotherapists%2C%20I%27d%20like%20to%20chat.",
              () => trackWhatsAppClick('top_bar'),
              null,
              "💬 WhatsApp",
              "hover:text-emerald-300 hover:scale-105 transition-all duration-200",
              { target: "_blank", rel: "noopener noreferrer" }
            )}
            {createTrackedLink(
              "mailto:reception91@iway.na",
              () => trackEmailClick('top_bar'),
              null,
              "✉️ Email",
              "hover:text-emerald-300 hover:scale-105 transition-all duration-200"
            )}
            {createTrackedLink(
              "https://www.facebook.com/profile.php?id=100057088824283&mibextid=sCpJLy",
              () => trackSocialClick('facebook', 'top_bar'),
              null,
              <>
                <img src="/facebook-icon.png" alt="Facebook" className="w-4 h-4" />
                Facebook
              </>,
              "hover:text-emerald-300 hover:scale-105 transition-all duration-200 flex items-center gap-2",
              { target: "_blank", rel: "noopener noreferrer" }
            )}
            {createTrackedLink(
              "https://www.instagram.com/91physio_ronelle_isaacs_physio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
              () => trackSocialClick('instagram', 'top_bar'),
              null,
              <>
                <img src="/instagram-icon.png" alt="Instagram" className="w-4 h-4" />
                Instagram
              </>,
              "hover:text-emerald-300 hover:scale-105 transition-all duration-200 flex items-center gap-2",
              { target: "_blank", rel: "noopener noreferrer" }
            )}
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
        {/* ... existing hero background code ... */}
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div 
              className={`transform transition-all duration-1000 ${
                isVisible['hero-text'] ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              data-animate="hero-text"
            >
              {/* ... existing hero text content ... */}
              
              <div className="mt-8 flex flex-wrap gap-4 animate-fade-in-up animation-delay-900">
                <a 
                  href="#booking" 
                  onClick={() => trackBookingIntent('hero_primary')}
                  className="group rounded-xl bg-emerald-600 text-white px-8 py-4 font-semibold hover:bg-emerald-700 hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg"
                >
                  <span className="group-hover:animate-pulse">Book an Appointment</span>
                </a>
                {createTrackedLink(
                  "https://wa.me/264813719494?text=Hi%20Ronelle%20Isaacs%20Physiotherapists%2C%20I%27d%20like%20to%20enquire%20about%20physiotherapy.",
                  () => trackWhatsAppClick('hero_secondary'),
                  null,
                  "WhatsApp Us",
                  "rounded-xl border-2 border-emerald-600 text-emerald-600 px-8 py-4 font-semibold hover:bg-emerald-50 hover:scale-105 hover:shadow-lg transition-all duration-300",
                  { target: "_blank", rel: "noopener noreferrer" }
                )}
              </div>

              {/* ... rest of hero content ... */}
            </div>

            {/* ... hero image content ... */}
          </div>
        </div>
      </section>

      {/* Continue with other sections, replacing relevant links with tracked versions... */}
      {/* For brevity, I'm showing the pattern - you'd apply this to all links throughout */}

      {/* Booking Section with tracked links */}
      <section id="booking" className="py-20 bg-gradient-to-br from-emerald-600 to-blue-600 text-white relative overflow-hidden">
        {/* ... existing booking background ... */}
        
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
              {createTrackedLink(
                "https://wa.me/264813719494?text=Hi%20Ronelle%20Isaacs%20Physiotherapists%2C%20I%27d%20like%20to%20book%20an%20appointment.",
                () => {
                  trackWhatsAppClick('booking_section');
                  trackBookingIntent('whatsapp');
                },
                null,
                "💬 WhatsApp Booking",
                "bg-white text-emerald-600 rounded-xl px-8 py-4 font-semibold hover:bg-slate-50 hover:shadow-2xl shadow-lg group transform transition-all duration-500 hover:scale-105 hover:-translate-y-1",
                { 
                  target: "_blank", 
                  rel: "noopener noreferrer",
                  style: { transitionDelay: '600ms' }
                }
              )}

              {createTrackedLink(
                "tel:+264813719494",
                () => {
                  trackPhoneClick('mobile', 'booking_section');
                  trackBookingIntent('phone');
                },
                null,
                "📱 Call Mobile",
                "bg-transparent border-2 border-white text-white rounded-xl px-8 py-4 font-semibold hover:bg-white hover:text-emerald-600 hover:shadow-xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-1",
                { style: { transitionDelay: '800ms' } }
              )}

              {createTrackedLink(
                "mailto:reception91@iway.na",
                () => trackEmailClick('booking_section'),
                null,
                "✉️ Email Us",
                "bg-transparent border-2 border-white text-white rounded-xl px-8 py-4 font-semibold hover:bg-white hover:text-emerald-600 hover:shadow-xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-1",
                { style: { transitionDelay: '1000ms' } }
              )}
            </div>
            
            {/* ... rest of booking section ... */}
          </div>
        </div>
      </section>

      {/* Apply the same pattern to all other sections with contact links... */}
      {/* ... rest of your component code ... */}
    </div>
  );
}
