'use client';

import { useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Pause, Play, X, VolumeX } from 'lucide-react';
import Reveal from '../ui/Reveal';
import { BRAND } from '@/data/brand';
import './testimonial.css';

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
            What made it possible
            <br />
            <em>for Shubham Sharma.</em>
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
              <Dialog.Title>Shubham Sharma — edited by {BRAND.name}</Dialog.Title>
              <Dialog.Description className="wall-description">
                YouTuber · Content creator · 180,000 subscribers
              </Dialog.Description>
              <iframe
                src="https://www.youtube-nocookie.com/embed/VTJMOtnq-tA?autoplay=1&rel=0"
                title="Shubham Sharma testimonial"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      <motion.div className="testimonial-card" style={reduced ? {} : { rotate: tilt, y: rise }}>
        <img
          src="https://framerusercontent.com/images/DddjVAjzaOaICmhwEZm9Yrn2g.jpg?scale-down-to=1024"
          alt="Shubham Sharma talking to camera"
        />
        <span className="testimonial-brand">
          <strong>SHUBHAM</strong>
          <small>Edited by {BRAND.name}</small>
        </span>
        <span className="testimonial-controls" aria-hidden="true">
          <i><VolumeX size={15} /></i>
          <i className="big"><Pause size={22} fill="currentColor" /></i>
          <i><Play size={15} fill="currentColor" /></i>
        </span>
        <span className="testimonial-tags">
          <span>YouTuber</span>
          <span>Content creator</span>
          <span>180,000 subscribers</span>
        </span>
      </motion.div>

      <div className="testimonial-stats">
        <div>
          <strong>Publishing one of his best videos</strong>
          <p>without spending his weeks editing it himself.</p>
        </div>
        <div>
          <strong>Among his most-viewed uploads</strong>
          <p>a comparison format that passed 244K views in 6 months.</p>
        </div>
      </div>
    </section>
  );
}
