import Image from 'next/image'
import { Eye } from 'lucide-react'

const projects = [
  { src: '/images/gallery-1.jpg', title: 'Consumer Unit Upgrade', category: 'Safety' },
  { src: '/images/gallery-2.jpg', title: 'EV Charger Installation', category: 'EV Charging' },
  { src: '/images/gallery-3.jpg', title: 'Garden Lighting Design', category: 'Outdoor' },
  { src: '/images/gallery-4.jpg', title: 'Air Conditioning Install', category: 'HVAC' },
  { src: '/images/gallery-5.jpg', title: 'PAT Testing Service', category: 'Safety' },
  { src: '/images/gallery-6.jpg', title: 'Kitchen Lighting', category: 'Interior' },
]

export function Gallery() {
  return (
    <section id="gallery" className="relative py-24 md:py-32 bg-slate-50">

      <div className="mx-auto max-w-7xl px-6 sm:px-18 md:px-24 lg:px-32">
        <div className="text-center mb-16">
          <span className="text-xl font-bold text-primary uppercase tracking-wider">
            Our Work
          </span>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Recent Projects
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            A selection of our recent electrical installations and projects across North West London.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`relative group overflow-hidden rounded-xl border border-border ${
                i === 0 || i === 5 ? 'md:col-span-2 aspect-[2/1]' : 'aspect-square'
              }`}
            >
              <Image
                src={project.src}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/70 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-3">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <p className="font-serif text-lg font-bold text-white">{project.title}</p>
                  <span className="text-xs text-accent font-medium mt-1">{project.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
