export type Film = {
  image: string;
  title: string;
  portrait?: boolean;
  youtube?: string;
};

export const reel = 'https://framerusercontent.com/assets/NgOTYKbKDompJnAO4YOGmggDUts.mp4';

export const topRowFilms: Film[] = [
  { image: 'nFwIKRz21HsXrPB5DiH73PuxfF4.png', title: 'A fresh perspective', portrait: true },
  { image: 'WWBqPcu23uoiQvi152FOmtVoPNY.webp', title: 'The winning property story', youtube: 'v0viXme7oUU' },
  { image: 'QZ8wp6rHj2ExQRy9p1VEizqTPg.png', title: 'A story in one minute', portrait: true },
  { image: 'njWIFDhyhQ0baZSK2lO4Vz4Nsm0.jpg', title: 'GPT Vision — a new dimension', youtube: 'roQ23g5pcOE' },
  { image: '8ePAZdrg9ILKZElVoK6TmaiILa0.png', title: 'Follow me — the podcast', portrait: true },
  { image: '6Z3F3uG7AotT9nf0lp87JXPKtMs.webp', title: 'Exploring new ideas', youtube: 'bgNsTi6GbiM' },
];

export const middleRowFilms: Film[] = [
  { image: 'xQVz2zBuuqF6ghGvTHJNk4Vk.png', title: 'The power of short-form', portrait: true },
  { image: '8Ck5k19ckft2IfR2vA2c8mqkMs.png', title: '10 tips to grow your creativity', youtube: '9rVBVww5OwQ' },
  { image: 'S3ksRZZbTPf9UEo7H7ujLG1V9gw.png', title: 'Ideas brought to life', portrait: true },
  { image: 'MmJKK2TvoOWxzE371pw8lBEnI.jpg', title: 'At the heart of the encounter', youtube: 'KLugXLAdFjo' },
  { image: 'vCGpZs8wtj5go24zgzaLK5iD9Y4.png', title: 'The world in motion', portrait: true },
  { image: 'JeC98jY1JirKEmbcu8QTHD9tI.png', title: 'GPT-4 Vision', youtube: 't95aV_bBlLw' },
];

export const bottomRowFilms: Film[] = [
  { image: '33nr3J5vimAyrOzEb3EAMX5Ozo.png', title: 'An honest conversation', portrait: true },
  { image: 'DddjVAjzaOaICmhwEZm9Yrn2g.jpg', title: 'Shubham Sharma — tech & creativity', youtube: 'VTJMOtnq-tA' },
  { image: 'WRrj8EtZ8QqLAMOE2UDB119dlII.png', title: 'A different angle', portrait: true },
  { image: '6SXNB7Y0bwONxKLPPiz71Rsx4M.png', title: 'Production & storytelling', youtube: 'bgNsTi6GbiM' },
  { image: 'nFwIKRz21HsXrPB5DiH73PuxfF4.png', title: 'Punchy short-formats', portrait: true },
  { image: '8Ck5k19ckft2IfR2vA2c8mqkMs.png', title: 'Cinema-grade quality', youtube: '9rVBVww5OwQ' },
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
