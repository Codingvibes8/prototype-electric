import React from 'react'
import Link from 'next/link'
import { ChevronLeft, Cookie } from 'lucide-react'

export const metadata = {
  title: 'Cookie Policy | Electric Jamez',
  description: 'Learn about how we use cookies at Electric Jamez to improve your browsing experience.',
}

export default function CookiePolicy() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-background">
      <div className="mx-auto max-w-4xl px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-12">
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <header className="mb-12 border-b border-border pb-12">
          <div className="flex items-center gap-3 text-red-700 mb-4">
            <Cookie className="w-8 h-8" />
            <span className="text-sm font-bold uppercase tracking-widest text-foreground/60">Legal</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-extrabold text-foreground">Cookie Policy</h1>
          <p className="mt-4 text-muted-foreground italic">Last Updated: March 19, 2026</p>
        </header>

        <article className="prose prose-lg dark:prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-foreground font-serif">1. What are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground font-serif">2. How We Use Cookies</h2>
            <p>
              We use cookies to improve your user experience and for website analytics. These may include session cookies (which expire once you close your browser) and persistent cookies (which stay on your computer until you delete them).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground font-serif">3. Types of Cookies We Use</h2>
            <ul className="list-disc pl-6 space-y-4">
              <li>
                <strong>Necessary Cookies:</strong> These are essential for the website to function correctly and cannot be disabled in our systems. They are usually only set in response to actions made by you, such as setting your privacy preferences or filling in forms.
              </li>
              <li>
                <strong>Analytical/Performance Cookies:</strong> These allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it. This helps us to improve the way our website works, for example, by ensuring that users are finding what they are looking for easily.
              </li>
              <li>
                <strong>Functionality Cookies:</strong> These are used to recognize you when you return to our website. This enables us to personalize our content for you and remember your preferences.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground font-serif">4. Controlling Cookies</h2>
            <p>
              Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit <Link href="https://www.aboutcookies.org" className="text-primary hover:underline">www.aboutcookies.org</Link> or <Link href="https://www.allaboutcookies.org" className="text-primary hover:underline">www.allaboutcookies.org</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground font-serif">5. Changes to This Policy</h2>
            <p>
              We may update our Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground font-serif">6. Contact Us</h2>
            <p>
              If you have any questions about our use of cookies, please contact us at <Link href="mailto:info@electricjamez.co.uk" className="text-primary hover:underline">info@electricjamez.co.uk</Link>.
            </p>
          </section>
        </article>
      </div>
    </main>
  )
}
