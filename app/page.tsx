
import Hero from "@/components/Hero";
import QuickContact from "@/components/QuickContact";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { Navigation } from "@/components/Navigation";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Navigation />
      <Hero />
      <QuickContact />
      <Services />
      <WhyUs />
      <Gallery />
      <Testimonials />
      <Footer />
    </div>
  );
}
