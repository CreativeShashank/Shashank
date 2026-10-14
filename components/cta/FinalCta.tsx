'use client';

import Reveal from '../ui/Reveal';
import ContactDialog from '../ui/ContactDialog';

export default function FinalCta() {
  return (
    <section className="final-cta">
      <div className="cta-glow" />
      <Reveal>
        <span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
        <h2>
          Let’s make
          <br />
          <em>something matter.</em>
        </h2>
        <ContactDialog label="Tell us your story" />
        <p>No pitch decks. Just a good conversation.</p>
      </Reveal>
    </section>
  );
}
