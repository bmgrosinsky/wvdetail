import type { Faq } from '@/types';

/**
 * Entries with `todo: true` depend on unverified operational details
 * (hours, payment methods, mobile service, weather policy). They are
 * excluded from rendering by `publishedFaqs` until the answers are confirmed.
 */
export const faqs: readonly Faq[] = [
  {
    id: 'which-service',
    question: 'Which service should I choose?',
    answer:
      'If your vehicle is kept up and just needs a clean-up, the Interior Refresh or Exterior Detail is usually the right call. If it has not been detailed in a while, or there is built-up dirt, spills, or wear, the Deep Interior Detail or the Deep Complete Detail is the better fit. If you are not sure, send a few photos with your quote request and we will tell you honestly what your vehicle needs.',
    category: 'services',
    todo: false,
    featured: true,
  },
  {
    id: 'vehicle-size',
    question: 'How do you decide what size my vehicle is?',
    answer:
      'Pricing is grouped into three classes. Car covers sedans, coupes, hatchbacks, and small crossovers. Mid-size covers mid-size SUVs, crossovers, and small trucks. Large covers full-size SUVs, trucks, minivans, and three-row vehicles. Oversized or unusual vehicles are quoted individually.',
    category: 'vehicles',
    todo: false,
    featured: true,
  },
  {
    id: 'condition-pricing',
    question: 'Why are the prices listed as starting estimates?',
    answer:
      'Listed prices assume a normally soiled vehicle. Heavy pet hair, severe staining, strong odors, excessive dirt, or unusual contamination take significantly more time and materials, so those vehicles may be priced above the starting estimate. We confirm pricing before any work begins, so there are no surprises.',
    category: 'pricing',
    todo: false,
    featured: true,
  },
  {
    id: 'pet-hair',
    question: 'Can you get pet hair out of my vehicle?',
    answer:
      'Yes. Pet hair that has worked its way into carpet and upholstery needs dedicated time to remove, so it is handled as an add-on starting at $40 depending on how much there is and how deeply it is embedded.',
    category: 'services',
    todo: false,
    featured: true,
  },
  {
    id: 'stains-odors',
    question: 'Do you remove stains and odors?',
    answer:
      'We offer stain treatment and extraction as well as odor treatment as add-ons. Most stains improve substantially and many come out entirely, but results depend on what caused the stain, how long it has been there, and the material it is in. We will give you a realistic expectation up front rather than overpromise.',
    category: 'services',
    todo: false,
    featured: false,
  },
  {
    id: 'every-stain',
    question: 'Can every stain be removed?',
    answer:
      'No, and we will not tell you otherwise. Fresh spills, salt, mud, and most food and drink stains usually come out or improve dramatically. Dye transfer, bleach marks, ink, sun-faded fabric, and stains that have been sitting for years may only lighten, and some do not move at all. We treat the stain properly either way and tell you what we expect before we start.',
    category: 'services',
    todo: false,
    featured: false,
  },
  {
    id: 'smoke-odor',
    question: 'Can you get cigarette or smoke smell out?',
    answer:
      'Usually we can reduce it a lot, sometimes we can eliminate it. Smoke settles into headliners, foam, vents, and filters, so how much comes out depends on how long the vehicle was smoked in. Odor treatment is an add-on and it works best paired with a deep interior clean, since the smell lives in the material and not just the air. For heavy long-term smoke, expect a large improvement rather than a brand-new vehicle.',
    category: 'services',
    todo: false,
    featured: false,
  },
  {
    id: 'paint-correction',
    question: 'Do you do paint correction or polishing?',
    answer:
      'Not at this time. Our exterior services are cleaning, decontamination, and protection: hand washing, clay treatment where appropriate, sealant, and trim care. Those services will not remove swirls or scratches from the paint.',
    category: 'services',
    todo: false,
    featured: false,
  },
  {
    id: 'belongings',
    question: 'Should I take my belongings out first?',
    answer:
      'Yes, please. Removing personal items, car seats, and anything in the trunk lets us clean every surface properly instead of working around things, and it keeps your belongings safe. Anything left behind we will set aside rather than move or discard.',
    category: 'preparation',
    todo: false,
    featured: true,
  },
  {
    id: 'service-area',
    question: 'What areas do you serve?',
    answer:
      'We serve Jackson, Michigan and the surrounding communities, including Michigan Center, Blackman Township, Summit Township, Grass Lake, Napoleon, and Brooklyn. If you are nearby but not listed, just ask.',
    category: 'area',
    todo: false,
    featured: true,
  },
  {
    id: 'how-long',
    question: 'How long does a detail take?',
    answer:
      'It depends on the service and the condition of the vehicle. A refresh or exterior detail is a shorter appointment, while a Deep Complete Detail is a longer one. We give you a time estimate when we confirm your quote so you can plan around it.',
    category: 'services',
    todo: false,
    featured: false,
  },
  {
    id: 'first-responder-discount',
    question: 'Do you offer a military or first responder discount?',
    answer:
      'Yes. The Jackson Serves discount takes $20 off any service $150 or more, or $10 off anything below that, for military, veterans, police, fire, EMS, corrections officers, hospital staff, and teachers. Mention it on your quote request and bring valid ID at the time of service.',
    category: 'pricing',
    todo: false,
    featured: false,
  },
  {
    id: 'get-quote',
    question: 'How do I get a quote?',
    answer:
      'Use the quote form and tell us your vehicle, the service you are interested in, and anything we should know about its condition. Photos help a lot. We will come back with a firm price rather than a range.',
    category: 'booking',
    todo: false,
    featured: true,
  },
  {
    id: 'hours',
    question: 'What are your hours?',
    answer: 'TODO: verified business hours.',
    category: 'operations',
    todo: true,
    featured: false,
  },
  {
    id: 'payment',
    question: 'What payment methods do you accept?',
    answer: 'TODO: verified accepted payment methods.',
    category: 'operations',
    todo: true,
    featured: false,
  },
  {
    id: 'mobile-service',
    question: 'Do you come to me, or do I bring the vehicle to you?',
    answer: 'TODO: verify whether service is mobile, shop-based, or both.',
    category: 'operations',
    todo: true,
    featured: false,
  },
  {
    id: 'weather',
    question: 'What happens if the weather is bad?',
    answer: 'TODO: verified weather and rescheduling policy.',
    category: 'operations',
    todo: true,
    featured: false,
  },
];

/** Only FAQs whose answers are verified. */
export const publishedFaqs: readonly Faq[] = faqs.filter((faq) => !faq.todo);

/** Verified FAQs marked for the homepage preview. */
export const featuredFaqs: readonly Faq[] = publishedFaqs.filter(
  (faq) => faq.featured,
);
