import React, { useState } from "react";

export default function PhysioPracticeSite() {
  const [hoveredService, setHoveredService] = useState(null);

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
    <div className="relative min-h-screen bg-white text-neutral-800">
      {/* Gradient Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-blue-50/50 via-white to-emerald-50/30" />
      
      {/* Top Bar */}
      <div className="w-full bg-slate-900 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">📍 Windhoek North · Namibia</span>
            <span className="text-slate-300">🕒 Mon–Fri 07:30–18:00 · Sat 08:00–13:00</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+264813719494" className="hover:text-emerald-300 transition-colors">📱 +264 81 371 9494</a>
            <a
              href="https://wa.me/264813719494?text=Hi%20Ronelle%20Isaacs%20Physiotherapists%2C%20I%27d%20like%20to%20chat."
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-300 transition-colors"
            >
              💬 WhatsApp
            </a>
            <a href="mailto:reception91@iway.na" className="hover:text-emerald-300 transition-colors">✉️ Email</a>
          </div>
        </div>
      </div>

      {/* Header / Nav */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="#home" className="font-bold text-xl tracking-tight text-slate-900">
            Ronelle Isaacs Physiotherapists
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#home" className="text-slate-700 hover:text-emerald-600 transition-colors">Home</a>
            <a href="#services" className="text-slate-700 hover:text-emerald-600 transition-colors">Services</a>
            <a href="#faq" className="text-slate-700 hover:text-emerald-600 transition-colors">FAQ</a>
            <a href="#contact" className="text-slate-700 hover:text-emerald-600 transition-colors">Contact</a>
            <a href="#booking" className="rounded-full bg-emerald-600 text-white px-6 py-2.5 hover:bg-emerald-700 transition-colors shadow-sm">
              Book Now
            </a>
          </nav>
          <a href="#booking" className="md:hidden rounded-full bg-emerald-600 text-white px-4 py-2 text-sm hover:bg-emerald-700 transition-colors">
            Book
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-emerald-50/30" />
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-slate-900">
                Reach Your
                <span className="block text-emerald-600">Goals with Us</span>
              </h1>
              <p className="mt-6 text-xl text-slate-600 leading-relaxed">
                Whether it's pain management, respiratory care, or improvement in functional abilities, we can help. 
                Our practice uses evidence-based guidelines to improve your quality of life.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#booking" className="rounded-xl bg-emerald-600 text-white px-8 py-4 font-semibold hover:bg-emerald-700 transition-colors shadow-lg">
                  Book an Appointment
                </a>
                <a
                  href="https://wa.me/264813719494?text=Hi%20Ronelle%20Isaacs%20Physiotherapists%2C%20I%27d%20like%20to%20enquire%20about%20physiotherapy."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border-2 border-emerald-600 text-emerald-600 px-8 py-4 font-semibold hover:bg-emerald-50 transition-colors"
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
                  <div key={index} className="flex items-center gap-3 text-slate-700 font-medium">
                    <span className="text-emerald-600 text-lg">{benefit.split(' ')[0]}</span>
                    <span>{benefit.substring(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-emerald-100 to-blue-100 rounded-3xl shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-semibold">Professional Care</h3>
                  <p className="text-sm opacity-90">Personalized treatment plans</p>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-emerald-500 rounded-full opacity-20" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500 rounded-full opacity-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Philosophy</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            The body is wonderfully complex. As first-line practitioners, we are trained to give you 
            evidence-based evaluation and expert treatment plans for the best conservative management. 
            Let us hear your story, and let us be part of the solution.
          </p>
        </div>
      </section>

      {/* Interactive Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Specialized Treatment Areas</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Explore our comprehensive range of physiotherapy services tailored to your specific needs
            </p>
          </div>

          {/* Interactive Service Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {bodyPartServices.map((service) => (
              <div
                key={service.id}
                className={`relative group cursor-pointer transition-all duration-300 ${hoveredService === service.id ? 'transform scale-105' : ''}`}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 border-2 border-transparent hover:border-emerald-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full mb-6 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {service.title.charAt(0)}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600 mb-4">{service.description}</p>
                  
                  <div className={`transition-all duration-300 ${hoveredService === service.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <ul className="space-y-2 pt-4 border-t border-emerald-100">
                      {service.details.map((detail, index) => (
                        <li key={index} className="text-sm text-slate-600 flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Services */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Hospital Care</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 mt-1">•</span>
                  Early mobilisation & discharge planning
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 mt-1">•</span>
                  Post-operative (abdominal/thoracic) care
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 mt-1">•</span>
                  ICU physiotherapy (as arranged)
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 mt-1">•</span>
                  Respiratory care & PEP techniques
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Home Visits</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 mt-1">•</span>
                  Home-based rehab after hospital discharge
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 mt-1">•</span>
                  Falls prevention & mobility training
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 mt-1">•</span>
                  Equipment advice (walkers, wheelchairs)
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 mt-1">•</span>
                  Elderly care & caregiver training
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 text-center border border-slate-200 hover:border-emerald-200"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{action.icon}</div>
                <div className="font-semibold text-slate-900">{action.text}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20 bg-gradient-to-br from-emerald-600 to-blue-600 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Recovery?</h2>
          <p className="text-xl mb-8 text-emerald-100">
            Scheduling is handled in real time by our team. Reach out using your preferred method below.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <a
              href="https://wa.me/264813719494?text=Hi%20Ronelle%20Isaacs%20Physiotherapists%2C%20I%27d%20like%20to%20book%20an%20appointment."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-emerald-600 rounded-xl px-8 py-4 font-semibold hover:bg-slate-50 transition-colors shadow-lg"
            >
              💬 WhatsApp Booking
            </a>
            <a href="tel:+264813719494" className="bg-transparent border-2 border-white text-white rounded-xl px-8 py-4 font-semibold hover:bg-white hover:text-emerald-600 transition-colors">
              📱 Call Mobile
            </a>
            <a href="mailto:reception91@iway.na" className="bg-transparent border-2 border-white text-white rounded-xl px-8 py-4 font-semibold hover:bg-white hover:text-emerald-600 transition-colors">
              ✉️ Email Us
            </a>
          </div>
          
          <p className="text-sm text-emerald-200">
            📅 Hours: Mon–Fri 07:30–18:00 · Sat 08:00–13:00 · Sun & Public Holidays Closed
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
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
                answer: "Please bring a form of ID, your medical aid card (if applicable), any recent medical reports or scans related to your condition, a list of current medications, and wear comfortable clothing that allows easy access to the area being treated."
              },
              {
                question: "Do you accept medical aid?",
                answer: "Yes, we offer direct medical aid claiming for your convenience. We work with most major medical aid schemes in Namibia. Please bring your medical aid card to your appointment, and we'll handle the claiming process for you."
              },
              {
                question: "How long is a typical physiotherapy session?",
                answer: "Initial consultations typically last 45-60 minutes, which includes assessment, diagnosis, and initial treatment. Follow-up sessions are usually 30-45 minutes. The exact duration may vary depending on your specific condition and treatment needs."
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
                answer: "Appointment availability varies depending on urgency and our current schedule. We prioritize urgent cases and typically have availability within a few days. Contact us via WhatsApp or phone for the most up-to-date availability and to discuss any urgent needs."
              },
              {
                question: "What are your payment options?",
                answer: "We accept cash, card payments, and direct medical aid claiming. If you're paying privately, payment is expected at the time of service. For medical aid patients, we handle the claiming process directly with your scheme where possible."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <div className="bg-emerald-50 rounded-xl p-8 border border-emerald-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Still Have Questions?</h3>
              <p className="text-slate-600 mb-6">
                Don't see your question answered above? Our team is happy to help with any specific concerns or queries you may have.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://wa.me/264813719494?text=Hi%20Ronelle%20Isaacs%20Physiotherapists%2C%20I%20have%20a%20question%20about%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 text-white rounded-xl px-6 py-3 font-semibold hover:bg-emerald-700 transition-colors"
                >
                  💬 Ask on WhatsApp
                </a>
                <a href="tel:+264813719494" className="border-2 border-emerald-600 text-emerald-600 rounded-xl px-6 py-3 font-semibold hover:bg-emerald-50 transition-colors">
                  📱 Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-8">Find Your Physiotherapist</h2>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">Ronelle Isaacs Physiotherapists</h3>
                <div className="space-y-4 text-slate-600">
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-600 mt-1">📍</span>
                    <div>
                      <div className="font-medium">Main Office</div>
                      <div>91 PHYSIO @ Rhino Street</div>
                      <div>Windhoek North, Windhoek</div>
                      <a 
                        href="https://maps.app.goo.gl/1EZhzDxG4BJTdFME9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 font-medium mt-1 transition-colors"
                      >
                        🗺️ Get Directions
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-600">📱</span>
                    <div>Mobile/WhatsApp: +264 81 371 9494</div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-600">📞</span>
                    <div>Phone (Reception): +264 61 255 337</div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-600">✉️</span>
                    <div>Email: reception91@iway.na</div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-200">
                  <h4 className="font-semibold text-slate-900 mb-4">Operating Hours</h4>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex justify-between">
                      <span>Monday – Friday:</span>
                      <span className="font-medium">07:30 – 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span className="font-medium">08:00 – 13:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday & Public Holidays:</span>
                      <span className="font-medium text-red-600">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Get In Touch</h3>
              <p className="text-slate-600 mb-6">
                Messages go straight to WhatsApp—our team will guide you from there. 
                No web forms, just direct communication.
              </p>
              
              <div className="space-y-4">
                <a
                  href="https://wa.me/264813719494?text=Hi%20Ronelle%20Isaacs%20Physiotherapists%2C%20I%27d%20like%20to%20enquire%20about%20physiotherapy."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-emerald-600 text-white rounded-xl px-6 py-4 font-semibold text-center hover:bg-emerald-700 transition-colors"
                >
                  💬 Open WhatsApp
                </a>
                
                <a 
                  href="tel:+264813719494" 
                  className="block w-full border-2 border-emerald-600 text-emerald-600 rounded-xl px-6 py-4 font-semibold text-center hover:bg-emerald-50 transition-colors"
                >
                  📱 Call Mobile
                </a>
              </div>
              
              <p className="mt-4 text-xs text-slate-500 text-center">
                We reply fastest on WhatsApp during business hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <div className="font-semibold text-lg mb-2">Ronelle Isaacs Physiotherapists</div>
              <div className="text-slate-400 text-sm">
                © {new Date().getFullYear()} · Windhoek North · Namibia
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <a href="tel:+264813719494" className="hover:text-emerald-400 transition-colors">
                📱 +264 81 371 9494
              </a>
              <a 
                href="https://wa.me/264813719494" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors">
                💬 WhatsApp
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-700 text-center">
            <p className="text-xs text-slate-500">
              Professional physiotherapy services · Evidence-based treatment · First-line practitioners
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
