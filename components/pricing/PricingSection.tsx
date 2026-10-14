'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Film } from 'lucide-react';
import Reveal from '../ui/Reveal';
import ContactDialog from '../ui/ContactDialog';
import { pricingPlans } from '@/data/site';

export default function PricingSection() {
  const [monthly, setMonthly] = useState(false);

  return (
    <section className="section pricing" id="pricing">
      <Reveal className="center-heading">
        <span className="eyebrow">03 / GOOD WORK. CLEAR PRICING.</span>
        <h2>
          Big on creativity.
          <br />
          <em>Not on complications.</em>
        </h2>
        <div className="pricing-switch" role="group" aria-label="Pricing period">
          <button aria-pressed={!monthly} onClick={() => setMonthly(false)}>
            Per project
          </button>
          <button aria-pressed={monthly} onClick={() => setMonthly(true)}>
            Monthly partnership <span>Save 15%</span>
          </button>
        </div>
      </Reveal>
      <div className="pricing-grid">
        {pricingPlans.map((plan, i) => (
          <Reveal key={plan.name} className={'price-card ' + (i === 1 ? 'featured' : '')}>
            <div className="plan-top">
              <Film size={23} />
              {i === 1 && <span className="popular">THE CREATOR FAVOURITE</span>}
            </div>
            <h3>{plan.name}</h3>
            <p>{plan.desc}</p>
            <div className="price">
              <AnimatePresence mode="wait">
                <motion.span
                  key={monthly ? 'month' : 'project'}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  €{monthly ? Math.round(plan.price * 4 * 0.85).toLocaleString() : plan.price}
                </motion.span>
              </AnimatePresence>
              <small>/ {monthly ? 'month' : plan.unit}</small>
            </div>
            <div className="price-note">
              {monthly ? '4 videos per month · billed monthly' : 'Starting price · tailored to your brief'}
            </div>
            <ContactDialog
              label={i === 1 ? 'Let’s tell your story' : 'Start something good'}
              className={'button ' + (i === 1 ? 'light' : 'dark')}
            />
            <ul>
              {plan.items.map((item) => (
                <li key={item}>
                  <Check size={15} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
      <p className="pricing-disclaimer">
        Have something bigger in mind? <ContactDialog label="Let’s shape it together" className="inline-contact" />
      </p>
    </section>
  );
}
