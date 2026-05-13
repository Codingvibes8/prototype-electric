import Image from "next/image";

const projects = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3GbhYKlJI9kGqy7YG3T4l9Pyzu5rSMX_INfTXoaEvmitVNnD8bFI0q-lPtF87l02C_XOIud3cCI-AW7e2H7zmW4iikPZlrLaUknpY_NurpZKRXB61vI1w98FqwnfHeYj1SMO_2LatmupvTjXxp7WyRBlXgS-DFfLZGZ7YcNLOZe0X0qqwlS3kN_j2VKrkCAeU1pV6hhW1UnH8glYc3IIM_rqxLXoPsZky0uBSdAx_OqyQ09xGldPGdyhAC8Dg3wy6eWD6tfKXSYY",
    alt: "Modern kitchen lighting installation",
    category: "Residential",
    title: "Designer Kitchen Lighting",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNMlC6tTmfWNLwiHPgDDK3a7nLMW8bRc7v_q3RasI20ZO5jHguF_I3Zd1HDOsblzbNsSPW5o9GrOa0yTqmsQNEGzVMy9Kv9WhDKgv2QEnWzuQ5JwlTVtk6xNRgWzhxr26-rQJuEpo5QjGwrZvErJk-z3LgwMX0-DZMBdnUVoSXU9dBaWlDEio0MPT8LjkJGXXdy-6WCKkqh3ThL-cp2vbx1rwx2z80G3FpBM3122Lo4G7A4v3ziLDL6uHXe-vpR1m2cjfhPxLNplc",
    alt: "Industrial power system upgrade",
    category: "Industrial",
    title: "Main Distribution Upgrade",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZNdOqO2Q_lX-ne0HdKRH3dGPXjbheM-Xk229YPMkMjCeNDWEaYbPyZZbcQpk_smheLVyFmztatPfFnHKfGW98DFxTZOBwZ-Q83SC8TdunK7uG1u25h0J8d1z5HHzj3RRTMTqzuXK4SYDsdYc-ewq5rzqJS5FSSslkaf2kXJeiGEDW90o1vJAicfCz5QguzL5Kd-dGof703c-FeShQa2--yUWCY0GjNDRex21uzjiTel4qRfEUp7UphzTy9HP7bkoP1ecaGdfb-Gk",
    alt: "Smart office electrical layout",
    category: "Commercial",
    title: "Tech Office Smart Wiring",
  },
];

export default function Gallery() {
  return (
    <section className="px-6 md:px-20 py-24 bg-slate-100 dark:bg-slate-950" id="gallery">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Our Portfolio</h2>
            <h3 className="text-slate-900 dark:text-white text-4xl font-black">Recent Projects</h3>
          </div>
          <button className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all">
            View All Projects <span className="material-symbols-outlined">trending_flat</span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.title} className="group relative overflow-hidden rounded-3xl aspect-square">
              <Image
                src={project.src}
                alt={project.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-primary font-bold text-sm uppercase">{project.category}</p>
                <h5 className="text-white text-xl font-bold">{project.title}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
