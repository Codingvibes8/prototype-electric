import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white px-6 md:px-20 pt-24 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-3xl font-bold">bolt</span>
              <h2 className="text-xl font-bold uppercase tracking-tight text-white">
                VoltMaster <span className="text-primary">Electric</span>
              </h2>
            </Link>
            <p className="text-slate-400">
              Professional electrical contracting services for commercial and residential clients. Available for emergency services 24/7.
            </p>
            <div className="flex gap-4">
              <Link className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors" href="#">
                <span className="material-symbols-outlined">public</span>
              </Link>
              <Link className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors" href="#">
                <span className="material-symbols-outlined">alternate_email</span>
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Services</h4>
            <ul className="flex flex-col gap-4 text-slate-400">
              <li><Link className="hover:text-primary transition-colors" href="#">Residential Wiring</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Commercial Fit-outs</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Emergency Repairs</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Panel Upgrades</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Details</h4>
            <ul className="flex flex-col gap-4 text-slate-400">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">phone</span>
                (555) 123-4567
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">mail</span>
                info@voltmaster.com
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary">location_on</span>
                123 Power Grid Lane,<br />ElectriCity, ST 12345
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Service Areas</h4>
            <ul className="flex flex-col gap-4 text-slate-400">
              <li>Greater Metropolitan Area</li>
              <li>Suburban North Districts</li>
              <li>Industrial East Sector</li>
              <li>Coastal Western Region</li>
            </ul>
            <div className="mt-6">
              <div className="w-full h-32 rounded-xl bg-slate-800 overflow-hidden opacity-50 relative">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqVkpAQaj5si_HJdFMd7wMdk2_N91vJkSc1682MBvtw8jCpzQ4xAMOmzpxBn3LaJ_rk_-CvoMeDFVG5qLDGVlAKZB4-mtudve5O0zTlzV6IgKlToJdLoJBQLFlnIK0byfPXLIJeefxAuxBJ25ybZ-K56Hwn2U46WAzfeZN2SulawJmWUX7JPd16eldQJT-_zAskpiNuzqC_9LhCsYjpl4P02dTMxNYorYS7Ao0o5CeO74hNjI2PJvyDpZmrbLTSMdmHRetsNeQbu4"
                  alt="Service area map"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>&copy; 2024 VoltMaster Electric. All rights reserved. Licensed &amp; Insured.</p>
          <div className="flex gap-8">
            <Link className="hover:text-white transition-colors" href="#">Privacy Policy</Link>
            <Link className="hover:text-white transition-colors" href="#">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
