import { Phone, Mail, MapPin } from 'lucide-react'
import { ContactFormClient } from './contact-form-client'
import { ContactMap } from './contact-map'
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

            <hr className="w-full max-w-md border-t border-slate-300 mb-8" 
            />

            <div className="flex flex-col gap-6 mb-10">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-600 font-medium">Electric Lane</p>
                  <p className="text-slate-600 font-medium">Cricklewood, London NW2</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-red-600 flex-shrink-0" />
                <a href="tel:(0208) 9370 4044"
            className="text-slate-600 font-medium hover:text-red-600 transition-colors">
                  (0208) 9370 4044
                </a>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-red-600 flex-shrink-0" />
                <a href="mailto:admin@contractelectrical.com.au" className="text-slate-600 font-medium hover:text-red-600 transition-colors">
                  admin@electricjamez.com.au
                </a>
              </div>
            </div>

            <div className="flex items-c
            enter gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center text-white hover:bg-red-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-3 7h-1.924c-.615 0-1.076.252-1.076.889v1.111h3l-.238 3h-2.762v8h-3v-8h-2v-3h2v-1.923c0-2.022 1.064-3.077 3.461-3.077h2.539v3z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center text-white hover:bg-red-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact form (client component) */}
          <div>
            <ContactFormClient />
          </div>
        </div>

        {/* Google Maps Embed */}
        <ContactMap />
      </div>
    </section>
  )
}
