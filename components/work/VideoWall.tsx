'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import './video-wall.css';
import VideoCard from './VideoCard';
import BenefitsOverlay from './BenefitsOverlay';
import { topRowFilms, middleRowFilms, bottomRowFilms } from '@/data/site';

export default function VideoWall() {
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Scroll distance for horizontal translation
  const travel = 600;

  const { scrollYProgress } = useScroll({
    target: track,
    offset: ['start start', 'end end'],
  });

  // Smooth, subtle horizontal shifts on scroll
  const topX = useTransform(scrollYProgress, [0, 1], [40, -280]);
  const middleX = useTransform(scrollYProgress, [0, 1], [-260, 40]);
  const bottomX = useTransform(scrollYProgress, [0, 1], [30, -300]);

  return (
    <section className="video-wall" id="work" aria-label="Selected work">
      <div ref={track} className="wall-track" style={{ height: reduced ? 'auto' : `calc(100svh + ${travel}px)` }}>
        <div className="wall-pin">
          {/* Top Row: Heading on left + First Strip */}
          <div className="wall-row-container wall-top-container">
            <div className="wall-intro">
              <h2>
                I&apos;ve shot &amp; edited
                <em>
                  200+ videos
                  <br />
                  for 60+ happy clients.
                </em>
              </h2>
            </div>

            <motion.div className="wall-row wall-top-row" style={reduced ? {} : { x: topX }}>
              {topRowFilms.map((film, i) => (
                <VideoCard key={film.id + i} film={film} />
              ))}
            </motion.div>
          </div>

          {/* Middle Strip */}
          <div className="wall-row-container">
            <motion.div className="wall-row wall-middle-row" style={reduced ? {} : { x: middleX }}>
              {middleRowFilms.map((film, i) => (
                <VideoCard key={film.id + i} film={film} />
              ))}
            </motion.div>
          </div>

          {/* Bottom Strip */}
          <div className="wall-row-container">
            <motion.div className="wall-row wall-bottom-row" style={reduced ? {} : { x: bottomX }}>
              {bottomRowFilms.map((film, i) => (
                <VideoCard key={film.id + i} film={film} />
              ))}
            </motion.div>
          </div>

          {/* Smooth black gradient fade overlay covering the bottom of the wall */}
          <div className="wall-bottom-fade" aria-hidden="true" />

          {/* The 4 benefits rendered right over the dark fade at the bottom */}
          <BenefitsOverlay />
        </div>
      </div>
    </section>
  );
}
