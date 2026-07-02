export interface Testimonial {
  name: string
  date: string
  quote: string
  rating: number
  location?: string
  featured?: boolean
}

// Real customer reviews for Electric Jamez. All reviews are strongly positive
// (genuine 5-star feedback). "Continue Reading" truncation markers have been
// stripped; authentic wording is otherwise preserved.
export const testimonials: Testimonial[] = [
  {
    name: 'Jack',
    date: 'June 12, 2024',
    rating: 5,
    featured: true,
    quote:
      'Fantastic service. Reliable, efficient, works quickly and fixed a problem a previous electrician couldn’t (without a second visit and an extra worker). Thank you James, we are happy to have a trusted electrician for any future jobs that come up regarding electrical works.',
  },
  {
    name: 'Claire Chaudoir',
    date: 'February 9, 2024',
    rating: 5,
    featured: true,
    quote:
      'James is not your average tradesman. He’s super professional, pleasant to have around and knows his stuff. He answers emails promptly, turns up exactly when he’s promised. On the two occasions we’ve used him, he’s sorted out our electrical problems quickly. Nothing seems too much bother for him. Honestly, we can’t recommend James highly enough.',
  },
  {
    name: 'Teresa Courtney',
    date: 'September 26, 2023',
    rating: 5,
    quote:
      'Reliable, honest and trustworthy. Very satisfied with his work and the advice he gave me was most helpful. Couldn’t recommend him more highly.',
  },
  {
    name: 'Michael Barker',
    date: 'October 15, 2022',
    rating: 5,
    quote:
      'James arrived on time and did a good and quick job replacing a number of double sockets and a light fitting. In and out in 45 minutes.',
  },
  {
    name: 'Ornah Levine-Dolberg',
    date: 'June 15, 2021',
    rating: 5,
    quote:
      'James was great. Punctual, friendly, professional and reasonable prices. What more could you ask for? Besides, he’s a lovely person!',
  },
  {
    name: 'Dr W Wang',
    date: 'January 14, 2020',
    rating: 5,
    quote:
      'James is a reliable, efficient and friendly electrician. He turned up on time and tried his best to solve the problem. Price is fair. I am very glad to have found him and would use him again.',
  },
  {
    name: 'Iain Macintosh',
    date: 'October 19, 2019',
    rating: 5,
    quote:
      'Excellent and affordable service from a very friendly, reliable electrician. Will definitely use again and would heartily recommend.',
  },
  {
    name: 'Philippa Hutchinson',
    date: 'February 19, 2019',
    rating: 5,
    quote:
      'James is excellent in every way: reliable, efficient, tidy and friendly. We wouldn’t use anyone else for our electrical work.',
  },
  {
    name: 'David',
    date: 'April 20, 2018',
    rating: 5,
    quote: 'Quick, user friendly, and good value. Will certainly use again.',
  },
  {
    name: 'Sophie',
    date: 'March 14, 2018',
    rating: 5,
    quote:
      'James came to advise on my light fittings — he was helpful and thoughtful. He then replaced two ceiling fittings and removed old wall lights quickly and to a high standard. Very happy — would definitely recommend James!',
  },
  {
    name: 'James Burton',
    date: 'February 14, 2018',
    rating: 5,
    quote:
      'James is a good and reliable electrician. His prices are fair and his work is neat. I will use him again.',
  },
  {
    name: 'Duncan',
    date: 'February 16, 2017',
    rating: 5,
    quote:
      'James has done three electrical jobs for me and I have found his work to be of excellent quality and very fairly priced. He is always reliable, punctual, tidy and very pleasant to deal with. I would not hesitate to use him again or recommend to others.',
  },
  {
    name: 'Keith Sedgwick',
    date: 'October 29, 2016',
    rating: 5,
    featured: true,
    quote:
      'James installed downlighters throughout my three bedroom apartment. He did a magnificent job. He was 50% cheaper than the cheapest quote I got from rivals recommended by Which?, though 100% professional in the way he carried out his work. He turned up on time, worked without stopping for lunch or breaks. He tidied up after himself.',
  },
  {
    name: 'Kate',
    date: 'September 23, 2016',
    rating: 5,
    quote: 'Reliable, efficient & friendly.',
  },
  {
    name: 'Mrs Karbhari',
    date: 'September 19, 2016',
    rating: 5,
    quote:
      'I was very impressed with the work provided for me. Fixed a date, turned up on time and I was very satisfied — very reasonable costs. One very happy customer.',
  },
  {
    name: 'John',
    date: 'April 27, 2016',
    rating: 5,
    location: 'NW10',
    quote:
      'James was on holiday when I needed some help with fitting a garden light but he was happy to give me support over the phone. Very patient, honest and reliable, I will be sure to call him next time I need an electrician.',
  },
  {
    name: 'Mike W',
    date: 'February 12, 2016',
    rating: 5,
    quote:
      'Friendly, fast and good value — great to find a local tradesman who does a fab job when he says he will. Thanks James!',
  },
  {
    name: 'Verified customer',
    date: 'May 5, 2015',
    rating: 5,
    location: 'Islington',
    quote:
      'James did a neat job, on time, cheerfully and at reasonable price. Thanks!',
  },
  {
    name: 'Martin',
    date: 'April 26, 2015',
    rating: 5,
    featured: true,
    quote:
      'Fantastic! We had a list of smallish jobs we needed doing — multiple light fittings, extractor fan replacement. I emailed James and he got back to me despite being abroad on holiday. We agreed a day the following week and he turned up on time. His pricing structure was clear and he absolutely raced through the jobs to ensure I paid as little as possible. Courteous, polite, clean and tidy. So good I gave him a tip. Can’t recommend him enough.',
  },
  {
    name: 'Brenda',
    date: 'March 12, 2015',
    rating: 5,
    quote:
      'Very reliable, pleasant, efficient and with a refreshingly ‘can do’ attitude. I’ve used James two or three times now, and I wouldn’t hesitate in recommending him.',
  },
  {
    name: 'Mia',
    date: 'October 3, 2014',
    rating: 5,
    quote:
      'James is an excellent electrician with a lot of integrity. He solved my electrical problems without any fuss whatsoever, and with minimum disruption. His prices are also very reasonable which is a bonus and I would not hesitate to recommend his services for any household electrical issues, large or small.',
  },
  {
    name: 'Marion S',
    date: 'September 20, 2014',
    rating: 5,
    quote:
      'I would heartily recommend James — he came to inspect within a few days, gave us a very reasonable quote the day after and within a week had completed 3 electrical projects we had been putting off for a year, everything supplied, fitted and tidy afterwards. Thank you very much James!',
  },
  {
    name: 'Carmen Brady',
    date: 'July 28, 2014',
    rating: 5,
    quote:
      'James is exactly as described and a pleasure to do business with. I trust his advice and appreciate dealing with someone who follows up on phone calls, arrives on time for appointments and delivers on the promise of high-quality work. I will certainly be using him again.',
  },
  {
    name: 'Bubblee',
    date: 'May 13, 2014',
    rating: 5,
    quote:
      'It is good to have an electrician who is capable, tidy and friendly. Would recommend him without hesitation.',
  },
  {
    name: 'Abdul Barkatulla',
    date: 'May 13, 2014',
    rating: 5,
    quote:
      'I really admire the efficiency and professionalism of James. I would readily recommend him to everyone.',
  },
  {
    name: 'Nicholas N',
    date: 'November 4, 2013',
    rating: 5,
    quote:
      'Electric James carried out a number of electrical repairs at my house in a pleasant, competent and efficient manner and at reasonable cost, and I would recommend him.',
  },
  {
    name: 'Alexander E. Musset',
    date: 'September 26, 2013',
    rating: 5,
    quote:
      'I was very happy with the service. Was bang on time. James went the extra mile, stayed on to finish the job even though it was at the end of a long day and already home time. Did some bits and pieces for health and safety even though he wasn’t asked to. Thanks dude! Definitely will call on his services again.',
  },
  {
    name: 'Alan Everett',
    date: 'September 26, 2013',
    rating: 5,
    quote:
      'James responded quickly, was very reasonably priced, installed two Dyson hand driers just as we wanted and was very friendly and helpful. A delight to work with; we’d use him again.',
  },
  {
    name: 'Mary Alpert',
    date: 'September 26, 2013',
    rating: 5,
    featured: true,
    quote:
      'I can recommend James as being a competent, reliable and honest electrician, and he has a very pleasant manner. He is also amazingly punctual (despite London traffic), and has excellent communication, always replying promptly to emails and phone calls. Nothing was too much trouble for him and he charged nothing extra despite the extra time taken. I would certainly use him again.',
  },
  {
    name: 'Kit',
    date: 'September 26, 2013',
    rating: 5,
    quote:
      'I have used James twice in Jan and Feb 2013 to chase down a couple of mysterious faults. He was very competent and helpful, and the problems were both resolved in good time. His charges were wholly reasonable.',
  },
  {
    name: 'Dr. K',
    date: 'September 26, 2013',
    rating: 5,
    quote:
      'James more than matched his claim (“Electric James — good honest reliable electrician”) as, indeed, corroborated by other clients’ comments — certainly 5-star service from start to finish from a certified professional!',
  },
  {
    name: 'Ann Mason',
    date: 'September 26, 2013',
    rating: 5,
    location: 'Whittington Park Community Association',
    quote:
      'Great to find a reliable, personable, competent and reasonably priced electrician. I am happy to recommend for private or commercial work.',
  },
  {
    name: 'Rani',
    date: 'September 26, 2013',
    rating: 5,
    quote:
      'James did a fantastic job for me — he was reliable, punctual, very neat and cleaned up after his work. I got external security lights and outdoor sockets fitted as well as some internal lights fixed for me. It’s great to know there is someone you can rely on when electrical work needs done in your home.',
  },
  {
    name: 'Danny Marks',
    date: 'September 26, 2013',
    rating: 5,
    quote:
      'James recently carried out some maintenance to indoor lights and fitted new outdoor lights for me. He was thorough and methodical and has succeeded in resolving issues where previous electricians failed. He is, from now on, my first point of call on all electrical issues.',
  },
  {
    name: 'Moira Smith',
    date: 'September 26, 2013',
    rating: 5,
    quote:
      'My partner and I took on the service of James and we were highly satisfied. He is very friendly, reliable and efficient. He estimated it would take 3 days but he managed to do an excellent job in 2 days. He neatly moved a few electrical sockets, installed new light fittings and provided us with a complete electrical report. We are extremely pleased and would highly recommend his services.',
  },
  {
    name: 'Martin Grimer',
    date: 'September 26, 2013',
    rating: 5,
    location: 'West Hampstead',
    quote:
      'James recently fitted a ceiling light for me and fixed some faulty lights in my kitchen. He was really helpful, effective and efficient. From my experience he is a rarity — a good honest sparky who actually calls you back!',
  },
  {
    name: 'Stephen',
    date: 'September 26, 2013',
    rating: 5,
    location: 'Neasden',
    quote:
      'James undertook two electrical jobs for me (including the fitting of a timer switch on my water heater) in the space of about a week. On both occasions he was punctual, efficient and charged a reasonable rate. I would highly recommend him.',
  },
  {
    name: 'Ameeta',
    date: 'September 26, 2013',
    rating: 5,
    quote:
      'James fitted a digital thermostat for us. He did a great job, fitting it quickly, and I was especially impressed at how neat he was and how he cleaned up everything after himself. He was reliable, friendly and I will definitely call him again for any further electrical work we have.',
  },
  {
    name: 'Meera',
    date: 'September 26, 2013',
    rating: 5,
    quote:
      'James fixed my bathroom lights which had stopped working due to a faulty converter. He also changed several single electric sockets to double sockets. He was very flexible, finding a convenient time for me to do the work. He was efficient and produced good quality work. I would definitely use him again.',
  },
  {
    name: 'Verified customer',
    date: 'February 23, 2012',
    rating: 5,
    location: 'Kensal Rise, NW10',
    quote:
      'James did a very good job for me. The job consisted of several bits and pieces. He was neat, prompt, reasonably priced and I am happy. I would definitely hire him again, and recommend him completely.',
  },
]

export const featuredTestimonials = testimonials.filter((t) => t.featured)
export const gridTestimonials = testimonials.filter((t) => !t.featured)

export const reviewStats = {
  rating: '5.0',
  reviewCount: `${testimonials.length}+`,
  yearsActive: '12+',
}

export const accreditations = [
  'NAPIT Approved',
  'Which? Trusted Trader',
] as const
