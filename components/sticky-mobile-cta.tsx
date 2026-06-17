'use client';

import { Phone, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { trackPhoneClick, trackCTAClick } from '@/lib/analytics';

export function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show the CTA when user scrolls down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {/* Call CTA */}
      <a
        href="tel:+447000000000"
        onClick={() => trackPhoneClick('sticky_mobile_cta')}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 transition-all transform hover:scale-105"
        aria-label="Call us now"
      >
        <Phone className="w-6 h-6" />
      </a>

      {/* Message CTA */}
      <a
        href="#contact"
        onClick={() => trackCTAClick('sticky_mobile_contact')}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105"
        aria-label="Send us a message"
      >
        <Mail className="w-6 h-6" />
      </a>
    </div>
  );
}