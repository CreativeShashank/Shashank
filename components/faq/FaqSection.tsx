'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { Plus } from 'lucide-react';
import Reveal from '../ui/Reveal';
import { faqs } from '@/data/site';

export default function FaqSection() {
  return (
    <section className="section faq" id="faq">
      <Reveal>
        <span className="eyebrow">THE LITTLE DETAILS</span>
        <h2>
          Good questions.
          <br />
          <em>Straight answers.</em>
        </h2>
        <p>Still curious? We’re always up for a conversation.</p>
      </Reveal>
      <Accordion.Root type="single" collapsible className="accordion">
        {faqs.map(([q, a], i) => (
          <Accordion.Item value={'q' + i} key={q} className="faq-item">
            <Accordion.Header>
              <Accordion.Trigger>
                {q}
                <Plus size={18} />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <p>{a}</p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}
