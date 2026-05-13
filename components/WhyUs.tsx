import Image from "next/image";

const reasons = [
  {
    icon: "verified_user",
    title: "Licensed & Fully Insured",
    description: "Complete peace of mind with fully bonded and insured master electricians on every job.",
  },
  {
    icon: "schedule",
    title: "24/7 Rapid Response",
    description: "We understand electrical emergencies don't wait. Our teams are always on standby.",
  },
  {
    icon: "engineering",
    title: "Expert Technicians",
    description: "Continuous training on the latest tech ensures the most efficient and safe solutions.",
  },
];

export default function WhyUs() {
  return (
    <section className="px-6 md:px-20 py-24" id="why-us">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        <div className="w-full lg:w-1/2 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbqfqXUn8IyzGQOLZxk2tMkRtBYL8Ex9nMoii0DCcr197K6wKDo7jAMMxotWIbw2hUX71eiKXAnHOM6m7n_k8e4N9geRLapihBCcU3t4cxBpxX0ZAk-l3kyHX5_kQcoHhq59bpT8eUtNC_EIDNLWBwGGCQMpuq9CxXeUa6hsykpDVRScCFSNTjlOkyzeyjGwiVLnWCsNM_BXOZtZSSqiOlI3_yM1O7nJ7XBm7QoY0KdlBqslgey_QJtvjemIsodH0C4kMPIIdVSIc"
            alt="Team of expert electricians standing confidently"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-primary font-bold uppercase tracking-widest text-sm">The VoltMaster Difference</h2>
            <h3 className="text-slate-900 dark:text-white text-4xl font-black">Why Our Clients Trust Us</h3>
          </div>
          <div className="flex flex-col gap-6">
            {reasons.map((reason) => (
              <div key={reason.title} className="flex gap-4">
                <div className="flex-shrink-0 bg-primary/20 p-2 rounded-lg text-primary self-start">
                  <span className="material-symbols-outlined">{reason.icon}</span>
                </div>
                <div>
                  <h5 className="text-slate-900 dark:text-white font-bold text-lg">{reason.title}</h5>
                  <p className="text-slate-600 dark:text-slate-400">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
