'use client';

import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Reveal from '../ui/Reveal';
import './clients.css';

type Logo = { name: string; sub?: string; initials?: string };

const rows: Logo[][] = [
  [
    { name: 'Goodcity' }, { name: 'PASSIAMAN.' }, { name: 'FOLLOW ME' },
    { name: 'Jordan Saget', sub: '+2.4M subscribers', initials: 'JS' },
    { name: 'La Micro by Flo' }, { name: 'LINAGORA' },
    { name: 'Podcast Monde Numérique', sub: '+4k subscribers', initials: 'PM' },
    { name: 'ESP' }, { name: 'FOUNDERS NIGHT' }, { name: 'Stratégie CLIMAT' },
  ],
  [
    { name: 'Génération Do It Yourself' }, { name: '[investir]' }, { name: 'Notion' },
    { name: 'MicroByFlo', sub: '+49k subscribers', initials: 'MF' },
    { name: 'meilleurtaux' }, { name: 'submagic' },
    { name: 'Matthieu Stephani', sub: '+41k subscribers', initials: 'MS' },
    { name: 'Orso Media' }, { name: 'DFC' }, { name: 'Blooming YOU' },
  ],
  [
    { name: 'L’Académie du Renard' }, { name: 'NFT BUSINESS' }, { name: 'abyssale' },
    { name: 'Micode', sub: '+1.4M subscribers', initials: 'M' },
    { name: 'MONNAIE NUMÉRIQUE' }, { name: 'DEEZER' },
    { name: 'Wakz', sub: '+132k subscribers', initials: 'W' },
    { name: 'Keepeek' }, { name: 'JORDANE SAGET' }, { name: 'Maison Bosserelle' },
  ],
  [
    { name: 'Me BOSSERELLE' }, { name: 'LEXIPAIE' }, { name: 'Eskimoz' },
    { name: 'Lou Attal', sub: '+8k subscribers', initials: 'LA' },
    { name: 'STELLO' }, { name: 'UNDERSCORE_' },
    { name: 'Shubham Sharma', sub: '+180k subscribers', initials: 'SS' },
    { name: 'Smurfit Westrock' }, { name: 'LA VACHE !' }, { name: 'CAPSUL' },
  ],
  [
    { name: 'B-INVEST' }, { name: 'POWERHOUSE HABITAT' }, { name: 'Papisy.' },
    { name: 'Better Creating', sub: '+157k subscribers', initials: 'BC' },
    { name: 'YOUR LOGO', sub: 'slot' },
    { name: 'Alexandre Calvez', sub: '+1.2M subscribers', initials: 'AC' },
    { name: 'Querimont' }, { name: 'ESD' }, { name: 'Chambre des notaires' },
  ],
];

function LogoCell({ logo }: { logo: Logo }) {
  if (logo.sub === 'slot') {
    return (
      <span className="client-slot" aria-label="Your logo here">
        Your logo?
      </span>
    );
  }
  if (logo.sub) {
    return (
      <span className="client-creator">
        <span className="client-avatar" aria-hidden="true">{logo.initials}</span>
        <span className="client-creator-name">{logo.name}<small>{logo.sub}</small></span>
      </span>
    );
  }
  return <span className="client-word">{logo.name}</span>;
}

export default function ClientsSection() {
  const reduced = useReducedMotion();
  const wallRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: -100, y: -100, visible: false });

  return (
    <section className="clients" id="clients" aria-label="My clients">
      <Reveal className="clients-head">
        <h2>
          Trusted by great clients —
          <br />
          <em>and there&apos;s room for you…</em>
        </h2>
      </Reveal>

      <div
        ref={wallRef}
        className="clients-wall"
        onMouseMove={(e) => {
          if (!wallRef.current) return;
          const r = wallRef.current.getBoundingClientRect();
          setCursor({ x: e.clientX - r.left, y: e.clientY - r.top, visible: true });
        }}
        onMouseLeave={() => setCursor((c) => ({ ...c, visible: false }))}
      >
        {rows.map((row, i) => (
          <div key={i} className="clients-row" style={{ ['--dir' as string]: i % 2 ? 'reverse' : 'normal' }}>
            <div className={'clients-track' + (reduced ? ' static' : '')}>
              {[...row, ...row].map((logo, j) => (
                <LogoCell key={logo.name + j} logo={logo} />
              ))}
            </div>
          </div>
        ))}
        <motion.span
          className="clients-cursor"
          aria-hidden="true"
          animate={{
            x: cursor.x,
            y: cursor.y,
            opacity: cursor.visible ? 1 : 0,
            scale: cursor.visible ? 1 : 0.4,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        />
      </div>

      <Reveal className="clients-foot">
        <svg viewBox="0 0 60 50" aria-hidden="true">
          <path d="M30 2 C 30 20, 8 22, 10 34 C 12 44, 28 42, 34 32 L 44 12 M 36 12 L 44 12 L 44 20 M 34 32 L 42 44" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
        <p>
          Right here, <em>just like this.</em>
        </p>
      </Reveal>
    </section>
  );
}
