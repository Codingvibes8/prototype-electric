import { Phone, Mail, MapPin } from 'lucide-react'
import { ContactFormClient } from './contact-form-client'

export function Contact() {

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden bg-slate-50">

      {/* Dynamic Background Glows */}
      <div className="absolute top-1/2 left-0 w-full h-1/2 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-0 -left-1/4 w-3/4 h-full bg-red-600 rounded-full blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-100 border border-red-200 text-[10px] uppercase tracking-[0.2em] font-bold text-red-600 mb-6">
            Get in Touch
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl font-extrabold text-slate-900 text-balance leading-[1.1]">
            Contact <span className="text-red-500">Us</span>
          </h2>
          <p className="mt-8 text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed opacity-80">
            Ready to discuss your electrical project? Fill out the form below or give us a call for a free quote.
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-5">
          {/* Contact info (server-rendered) */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            <div className="group flex items-start gap-6 p-6 rounded-2xl bg-white border border-slate-200 hover:border-red-500/40 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-1">Phone</h3>
                <p className="text-sm text-slate-500 mb-3 font-medium tracking-wide">Available Mon-Sat, 8am-6pm</p>
                <a href="tel:+447000000000" className="text-2xl font-bold text-red-600 hover:text-red-500 transition-colors">
                  07000 000 000
                </a>
              </div>
            </div>

            <div className="group flex items-start gap-6 p-6 rounded-2xl bg-white border border-slate-200 hover:border-red-500/40 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-1">Email</h3>
                <p className="text-sm text-slate-500 mb-3 font-medium tracking-wide">{"We'll respond within 24 hours"}</p>
                <a href="mailto:info@electricjamez.co.uk" className="text-xl font-bold text-red-600 hover:text-red-500 break-all transition-colors line-clamp-1">
                  info@electricjamez.co.uk
                </a>
              </div>
            </div>

            <div className="group flex items-start gap-6 p-6 rounded-2xl bg-white border border-slate-200 hover:border-red-500/40 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-1">Service Area</h3>
                <p className="text-sm text-slate-500 mb-3 font-medium tracking-wide">North West London</p>
                <p className="text-xl font-bold text-red-600">NW2 and surrounding areas</p>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="p-8 bg-red-50 border border-red-100 rounded-3xl">
              <p className="text-[10px] text-red-600 uppercase tracking-[0.3em] mb-6 font-black">Official Accreditations</p>
              <div className="flex flex-wrap gap-3">
                {['NAPIT Approved', 'Which? Trusted', 'Part P Certified', 'Fully Insured'].map((badge) => (
                  <span
                    key={badge}
                    className="text-[11px] bg-white text-red-700 border border-red-200 rounded-lg px-4 py-2 font-bold tracking-tight shadow-sm"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form (client component) */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-[2.5rem] shadow-xl">
              <ContactFormClient />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
