'use client';

import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { driveImageUrl } from '@/data/drive';
import { photoShots } from '@/data/photos';
import Reveal from '../ui/Reveal';
import './photoshots.css';

const PREVIEW_COUNT = 9;

export default function PhotoShotsSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [expanded, setExpanded] = useState(false);

  const visibleShots = expanded ? photoShots : photoShots.slice(0, PREVIEW_COUNT);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const gridY = useTransform(scrollYProgress, [0, 1], [70, -70]);

  return (
    <section ref={ref} className="photos" id="photos" aria-label="Photo shoots">
      <div className="photos-glow" aria-hidden="true" />

      <Reveal className="photos-head">
        <span className="eyebrow">Behind the lens</span>
        <h2>
          Photo shoots —
          <br />
          <em>frames worth keeping.</em>
        </h2>
        <p>Portraits, editorial and candid frames captured between takes.</p>
      </Reveal>

      <motion.div className="photos-grid" style={reduced ? {} : { y: gridY }}>
        {visibleShots.map((shot, i) => (
          <Reveal key={shot.id} className="photos-cell" delay={(i % 3) * 0.08}>
            <figure>
              <img
                src={driveImageUrl(shot.id)}
                alt={shot.title}
                loading="lazy"
                decoding="async"
              />
              <figcaption>
                <span>{shot.title}</span>
                <small>{shot.tag}</small>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </motion.div>

      <div className="photos-more-wrap">
        <button
          type="button"
          className="photos-more"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
        >
          {expanded ? 'View less' : `View more (${photoShots.length - PREVIEW_COUNT})`}
          <ChevronDown size={16} className={expanded ? 'rotated' : ''} />
        </button>
      </div>

      <Reveal className="photos-foot">
        <p>
          Want a shoot like this? <em>Let’s make one.</em>
        </p>
        <a href="#booking" className="button light">
          Book a call<span className="button-dot" />
        </a>
      </Reveal>
    </section>
  );
}
