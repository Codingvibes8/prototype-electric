"use client";

import { Phone, Shield, Award, ChevronDown } from 'lucide-react'
import { Particles } from '@/components/particles';
import { HeroScrollButton } from '@/components/hero-scroll-button'
import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative  min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Image background */}
      <div className="absolute inset-0">
        <Image
          src="/new-hero-elect.jpg"
          alt="Electric James – Professional Electrical Services"
          fill
          priority
          className="object-cover"
        />
        {/* Dark overlay for text legibility */}
         <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(1,13,26,0.4)] via-transparent to-[rgba(0,30,60,0.6)]" />
      </div>

      <Particles />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl pt-32 pb-16 md:pt-48 md:pb-24 px-6 text-center h-full flex flex-col justify-center items-center">
        {/* Trust badges - placed ABOVE heading for hierarchy */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 shadow-2xl transition-transform hover:scale-105">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-white tracking-wide">NAPIT Approved</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 shadow-2xl transition-transform hover:scale-105">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-white tracking-wide">{'Which? Trusted Trader'}</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-white text-balance leading-[1.05] drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
          Professional Electrical Service
          <span className="block mt-2 text-white/95">in North West London</span>
        </h1>

        {/* Subheading */}
        <p className="mt-8 text-lg md:text-xl lg:text-2xl text-white/90 font-medium max-w-3xl mx-auto text-pretty leading-relaxed drop-shadow-md">
          NAPIT approved and Which? Trusted Trader electrician serving NW2 and surrounding areas.
          Powering your home safely with over 15 years of expert excellence.
        </p>

        {/* CTAs */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="tel:+447000000000"
            className="group relative bg-red-600 text-white rounded-xl flex items-center gap-3 px-10 py-5 font-bold text-xl transition-all shadow-[0_20px_50px_rgba(220,38,38,0.3)] hover:bg-red-700 hover:shadow-[0_20px_50px_rgba(220,38,38,0.5)] active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-yellow-300-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Phone className="w-6 h-6 animate-pulse" />
            Get a Free Quote
          </Link>
          <HeroScrollButton />
        </div>

        {/* Stats */}
        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 max-w-5xl mx-auto w-full">
          {[
            { value: '15+', label: 'Years Experience' },
            { value: '2,000+', label: 'Jobs Completed' },
            { value: '5 Star', label: 'Rated Service' },
            { value: 'NW2', label: 'Local Experts' },
          ].map((stat, idx) => (
            <div 
              key={stat.label} 
              className="group text-center p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all hover:bg-white/10 hover:border-white/20"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="font-serif text-3xl md:text-4xl font-bold text-yellow-300 drop-shadow-sm group-hover:scale-110 transition-transform">{stat.value}</div>
              <div className="mt-2 text-[10px] md:text-xs text-white/70 font-bold uppercase tracking-[0.2em]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors">
        <ChevronDown className="w-8 h-8 animate-bounce opacity-80" />
      </div>
    </section>
  )
}
