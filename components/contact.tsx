import { Phone, Mail, MapPin, Facebook, Linkedin } from 'lucide-react'
import { ContactFormClient } from './contact-form-client'

export function Contact() {

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden bg-white">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 mb-24">
          {/* Contact info (server-rendered) */}
          <div className="flex flex-col">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1e293b] mb-4">
              Contact
            </h2>
            <div className="w-16 h-1.5 bg-red-600 mb-8"></div>
            
            <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-md">
              Please let us know if you have a question, want to leave a comment, or would like further information about Contract Electrical.
            </p>

            <hr className="w-full max-w-md border-t border-slate-300 mb-8" />

            <div className="flex flex-col gap-6 mb-10">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-600 font-medium">2/169 Beechboro Rd S.</p>
                  <p className="text-slate-600 font-medium">Bayswater WA 6053</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-red-600 flex-shrink-0" />
                <a href="tel:0893704044" className="text-slate-600 font-medium hover:text-red-600 transition-colors">
                  (08) 9370 4044
                </a>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-red-600 flex-shrink-0" />
                <a href="mailto:admin@contractelectrical.com.au" className="text-slate-600 font-medium hover:text-red-600 transition-colors">
                  admin@contractelectrical.com.au
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center text-white hover:bg-red-600 transition-colors">
                <Facebook className="w-5 h-5" fill="currentColor" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center text-white hover:bg-red-600 transition-colors">
                <Linkedin className="w-5 h-5" fill="currentColor" />
              </a>
            </div>
          </div>

          {/* Contact form (client component) */}
          <div>
            <ContactFormClient />
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg border border-slate-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3386.680076233156!2d115.91031301211756!3d-31.91526367406981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a32ba0b3f5509dd%3A0xc69ccff16d80d2fc!2sContract%20Electrical%20Pty%20Ltd!5e0!3m2!1sen!2sau!4v1715732123456!5m2!1sen!2sau"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </section>
  )
}
