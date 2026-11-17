'use client';

import { useEffect, useState } from 'react';
import { BRAND } from '@/data/brand';
import './site-nav.css';

export default function SiteNav() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let prev = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const y = window.scrollY;
        const d = y - prev;
        prev = y;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          setHidden(false);
          return;
        }
        if (y < 120) setHidden(false);
        else if (d > 6) setHidden(true);
        else if (d < -6) setHidden(false);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={'site-nav' + (hidden ? ' is-hidden' : '')}>
      <div className="site-nav-pill">
        <nav className="site-nav-side left" aria-label="Primary">
          <a href="#work">Work</a>
          <a href="#photos">Photos</a>
          <a href="#process">Process</a>
        </nav>

        <a href="#" className="site-nav-logo">
          {BRAND.name}
        </a>

        <div className="site-nav-side right">
          <a href="#booking" className="site-nav-cta">
            Book a call
          </a>
        </div>
      </div>
    </header>
  );
}
