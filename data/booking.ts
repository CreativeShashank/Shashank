import { BRAND } from './brand';

export const BOOKING = {
  /** Set NEXT_PUBLIC_CALENDLY_URL to your Calendly event link (e.g. https://calendly.com/you/discovery) to enable real booking. */
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL || '',
  contactEmail: BRAND.email,
  hostName: BRAND.name,
  hostInitials: BRAND.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2),
  eventTitle: 'Discovery call',
  eventDescription:
    'We’ll take 15 minutes together to meet, talk about your project and goals, what you’ve tried before and what you’re looking for now.',
  eventGoal:
    'The goal is simple: meet, see if we’re a good fit, and define the best next step for your video.',
  duration: '15m',
  location: 'Google Meet',
};
