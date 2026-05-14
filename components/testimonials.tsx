import Image from "next/image";

const testimonials = [
  {
    quote: "Came within 40 minutes for a sparking outlet. Professional, clean, and reasonably priced. My go-to from now on.",
    name: "Mark Thompson",
    role: "Homeowner",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtQ4ZH65qDjuWdTU6DRo2ZmlpEINSifGsUXV1qHNgzB0zQO8FTq4pv0DKsEYe28zCXRvjr4I6P2ApPT1EEcdEFeC7ZuEIuPtpJaaR8jwMYHy55GScbFz_GiF-TKmAUiE17iwOVDgFLYUdK3lqdsD-OJLFQammwHZYh27jUEv75BezDvogPzsTjXCxRdjiWEGD7ZHsfJyCa0T1r0HC_IStX8VKEj9lGQBtYDEi7gqq-vRGmMv8GXg7itvR26mVYI3Z7G3BIDC4jU54",
  },
  {
    quote: "VoltMaster handles all our commercial properties. Their maintenance plan has saved us thousands in potential downtime.",
    name: "Sarah Jenkins",
    role: "Property Manager",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC68kO3HgHTCGc06iyVY-pdeVjE49RmvJuy25AMaCXXLXbtYeCd3cU_YvMXLKgA2Hcgj9z7I2zighI-p9dhddKRwwUC5pctbbNJi4EdRakYRbgPdDzyU1eKfHSUE21WToT6MIj-_Hjajo0qk1dI1O5_k7rRnaJEXKh6RwJmNY5izQZ3vFUAL2Opg8boquq4ZiQWnAeCt44pcRNoGUCuQxNLmQj6CKQ95s_DO-kIEvnC94iK5MYCyzKWINhqhOc4WWQg6C9f0R-pS7M",
  },
  {
    quote: "Excellent service for our new warehouse setup. The team was efficient and complied with all safety regulations.",
    name: "James Wilson",
    role: "Facility Director",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuABLeHnmUZcjbIBqUpVefFX2NtpdfD5gKYllUdM6b-u3nsiHc0ZzuK2w6WGQUo2_sYJkPonYCNiWGxdr8ijXn1TH3PLWHvIcwyjPLVBzs9-O1VGcHYq06zKwaeDDQ5cRPZLyaG4-dZ1zAqR4zmVsHcRDpXP2SBZKHmBTNT5Kcqqd4NmUE5a-se8rV8nZdaFCj-O2SjBDDpVqSmCD-npUfDdPx9P5rGBmUOMmlJSCS-P9qKYHcBQHLYE_vpHL6zIPh0O_hOGJoREUyk",
  },
];

export default function Testimonials() {
  return (
    <section className="px-6 md:px-20 py-24" id="testimonials">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Reviews</h2>
          <h3 className="text-slate-900 dark:text-white text-4xl font-black">Trusted by the Community</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-background-light dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="flex text-primary mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined font-fill">star</span>
                ))}
              </div>
              <p className="text-slate-600 dark:text-slate-300 italic mb-6">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden relative">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <h6 className="text-slate-900 dark:text-white font-bold">{t.name}</h6>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
