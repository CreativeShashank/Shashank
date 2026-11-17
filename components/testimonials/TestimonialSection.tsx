'use client';

import { useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Pause, Play, X, VolumeX } from 'lucide-react';
import Reveal from '../ui/Reveal';
import { BRAND } from '@/data/brand';
import { driveFrameUrl, driveVideoUrl } from '@/data/drive';
import './testimonial.css';

const TESTIMONIAL_ID = '1dwkKdYXXhHRzq0e4W9W4DF-pGde2mMpc';

export default function TestimonialSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const tilt = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-2, -7]);
  const rise = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [60, -40]);

  return (
    <section ref={ref} className="testimonial" aria-label="Client testimonial">
      <div className="testimonial-glow" aria-hidden="true" />
      <div className="testimonial-head">
        <Reveal>
          <h2>
            A reel built to be remembered
            <br />
            <em>for Preeti Jhangiani.</em>
          </h2>
        </Reveal>
        <Dialog.Root>
          <Dialog.Trigger className="testimonial-view">Watch the video</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="dialog-overlay" />
            <Dialog.Content className="dialog-content wall-dialog">
              <Dialog.Close className="icon-button close" aria-label="Close video">
                <X />
              </Dialog.Close>
              <Dialog.Title>Preeti Jhangiani — edited by {BRAND.name}</Dialog.Title>
              <Dialog.Description className="wall-description">
                Actor · Content creator · Promo reel
              </Dialog.Description>
              <video
                src={driveVideoUrl(TESTIMONIAL_ID)}
                title="Preeti Jhangiani promo reel"
                controls
                autoPlay
                playsInline
              />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      <motion.div className="testimonial-card" style={reduced ? {} : { rotate: tilt, y: rise }}>
        <video
          src={driveFrameUrl(TESTIMONIAL_ID, 6)}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-label="Preeti Jhangiani promo reel"
        />
        <span className="testimonial-brand">
          <strong>PREETI</strong>
          <small>Edited by {BRAND.name}</small>
        </span>
        <span className="testimonial-controls" aria-hidden="true">
          <i><VolumeX size={15} /></i>
          <i className="big"><Pause size={22} fill="currentColor" /></i>
          <i><Play size={15} fill="currentColor" /></i>
        </span>
        <span className="testimonial-tags">
          <span>Actor</span>
          <span>Content creator</span>
          <span>Promo reel</span>
        </span>
      </motion.div>

      <div className="testimonial-stats">
        <div>
          <strong>A promo reel with a strong first impression</strong>
          <p>cut for attention from the very first frame.</p>
        </div>
        <div>
          <strong>Delivered platform-ready</strong>
          <p>for social, press and brand use.</p>
        </div>
      </div>
    </section>
  );
}
