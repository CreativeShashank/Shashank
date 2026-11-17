export type Film = {
  id: string;
  title: string;
  portrait?: boolean;
};

export const reel = {
  id: '1nreeKRxVCUzmfETEkNgKype4m9p-MVy0',
  title: 'Kirti — wedding highlight',
};

export const topRowFilms: Film[] = [
  { id: '11-lfZZJmDlaYeuXbILdT30tNmCSgyKS0', title: 'Mahadev — creator reel', portrait: true },
  { id: '1nreeKRxVCUzmfETEkNgKype4m9p-MVy0', title: 'Kirti — wedding highlight' },
  { id: '1f4hE5ptoyQ5o-6c-W1Sf_WKcYRpd72Ml', title: 'Mahima Chaudhry — promo reel', portrait: true },
  { id: '1oKyZDqUX-KeHkGU3SJFdRlEQ6HVcgOGr', title: 'Divya & Kuldeep — pre-wedding' },
  { id: '1dwkKdYXXhHRzq0e4W9W4DF-pGde2mMpc', title: 'Preeti Jhangiani — actor reel', portrait: true },
  { id: '1Zen4zGnd1EBmubmXfqqEJ_O46Npy4gKr', title: 'Lemonji — product film' },
];

export const middleRowFilms: Film[] = [
  { id: '1um8zfO6B6WoxYoFSA58qrwCw_uXdIvAw', title: 'Sunil Grover — comedy reel', portrait: true },
  { id: '10e0ENdgcuHdOMJtuprC9bpbCHroRua8p', title: 'Juhi & Ravi — wedding film' },
  { id: '1Q2faPtZ6c0LwrsRHw9hSnypow-qWlOuC', title: 'Period cramps — awareness film', portrait: true },
  { id: '1AXsHqhAJnwa7J4D5ECiyHv4TGrUSJII2', title: 'Anoopreeti — engagement film' },
  { id: '18sVZe_SzTW2JE4ge_rBbfI4nygJmhRgP', title: 'Lavender Dress — fashion reel', portrait: true },
  { id: '1iOExYT3-TMLYJ3GpX27MRogDUDGlSG5e', title: 'Lord Mobile — animation' },
];

export const bottomRowFilms: Film[] = [
  { id: '1mJ6dZyxdUCfpvNQ2922ifk9TEvncTph6', title: 'Tum — music reel', portrait: true },
  { id: '1Rz7xQs--SGcGh8dwsbLsjOyeolKPGgtn', title: 'Renu & Sandeep — 25 years' },
  { id: '1S8qZvpklGMRJGy-jK_3wbain8qxGfUa8', title: 'Riteish × Mastercard', portrait: true },
  { id: '1LBPCgNbL89n0SzYvC2wkY1EbKDoLgxv5', title: '2025 — year in review' },
  { id: '1nW7VZ6i1HKLGRqq1K7hTJyBrn8We9Zy1', title: 'Ajay Devgn × Summercool', portrait: true },
  { id: '1YjC8ftMJ1-IIiFtERand-Imr4KM9DJff', title: 'Harsh Poriwal — podcast' },
];

export type ProcessStep = {
  name: string;
  detail: string;
  label: string;
  visualTitle: string;
  fileName: string;
  status: string;
  caption: string;
};

export const processSteps: ProcessStep[] = [
  {
    name: 'Meet your creative team',
    detail: 'A conversation, a shared vision. We get to know your voice, your audience, and what you want your videos to do.',
    label: '01 / THE CONVERSATION',
    visualTitle: 'Great things start\nwith a hello.',
    fileName: 'Creative kickoff',
    status: "Let's meet",
    caption: 'A shared vision makes all the difference.',
  },
  {
    name: 'Send us the good stuff',
    detail: 'Drop your footage, references, and big ideas into one shared space. We take it from there.',
    label: '02 / THE STARTING POINT',
    visualTitle: 'A home for\nall your ideas.',
    fileName: 'Brand-story_footage.zip',
    status: 'Uploaded',
    caption: 'All your assets. One simple space.',
  },
  {
    name: 'Watch it come together',
    detail: 'Your dedicated editor shapes the story. Review every cut and leave frame-perfect feedback until it feels just right.',
    label: '03 / THE CREATIVE PART',
    visualTitle: 'The magic is\nin the making.',
    fileName: 'Brand-story_v03.mp4',
    status: 'In the edit',
    caption: 'Great stories take a little fine-tuning.',
  },
  {
    name: 'Ready for the spotlight',
    detail: 'Beautifully finished, correctly formatted, and ready for every channel. Your next great video is ready to meet the world.',
    label: '04 / THE BIG MOMENT',
    visualTitle: 'Your story.\nOut in the world.',
    fileName: 'Brand-story_final.mp4',
    status: 'Approved',
    caption: 'Made with care. Ready to share.',
  },
];

export type PricingPlan = {
  name: string;
  desc: string;
  price: number;
  unit: string;
  items: string[];
};

export const pricingPlans: PricingPlan[] = [
  {
    name: 'The short story',
    desc: 'Small screen. Lasting impression.',
    price: 250,
    unit: 'short-form video',
    items: ['Up to 60 seconds', 'Captions & sound design', 'Vertical, square & landscape formats', 'Dedicated creative contact'],
  },
  {
    name: 'The full picture',
    desc: 'Room to tell something remarkable.',
    price: 650,
    unit: 'long-form video',
    items: ['Up to 15 minutes', 'Story-led editing & colour grading', 'Custom motion & sound design', 'Thumbnail creative direction'],
  },
];

export const faqs: Array<[string, string]> = [
  ['What kind of videos can you make?', 'From YouTube stories and podcasts to vertical social content, brand films, and motion graphics. We build the creative team around the story you want to tell.'],
  ['How does the process work?', 'Start with a discovery call, share your footage and brand references, then review the first cut in a shared workspace. We refine the edit together and deliver your finished files.'],
  ['What if I need changes?', 'Feedback is part of making something great. Each package includes revisions within the agreed creative brief, so we can get the pacing, sound, and details right.'],
  ['How quickly will I receive my video?', 'Most first cuts take 3–5 working days once the brief and footage are ready. Longer films and complex animation get a tailored schedule before work starts.'],
  ['Do I need to commit to a subscription?', 'No. Start with one project or choose a monthly creative partnership. We agree on the scope and schedule together before beginning.'],
];
