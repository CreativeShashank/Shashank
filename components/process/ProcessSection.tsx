'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useMotionValueEvent } from 'framer-motion';
import { MessageCircle, Upload, Scissors, CircleCheck, Plus } from 'lucide-react';
import Reveal from '../ui/Reveal';
import { processSteps } from '@/data/site';

const stepIcons = [MessageCircle, Upload, Scissors, CircleCheck];

export default function ProcessSection() {
  const [active, setActive] = useState(0);
  const processRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const StepIcon = stepIcons[active];

  const { scrollYProgress: processProgress } = useScroll({
    target: processRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(processProgress, 'change', (v) => {
    if (!reduced && window.matchMedia('(min-width: 901px) and (min-height: 760px)').matches) {
      setActive(Math.min(3, Math.floor(v * 4)));
    }
  });

  return (
    <section ref={processRef} className="section process scroll-process" id="process">
      <div className="process-sticky">
        <Reveal className="section-heading">
          <div>
            <span className="eyebrow">02 / SIMPLE BY DESIGN</span>
            <h2>
              From “what if”
              <br />
              <em>to “that’s the one.”</em>
            </h2>
          </div>
          <p>
            Four steps. One shared vision.
            <br />A process that feels like a partnership.
          </p>
        </Reveal>
        <div className="process-layout">
          <div className="steps" role="tablist" aria-label="Production process">
            {processSteps.map((s, i) => (
              <button
                role="tab"
                aria-selected={active === i}
                aria-controls="step-panel"
                id={'step-' + i}
                key={s.name}
                onClick={() => setActive(i)}
                className={'step ' + (active === i ? 'active' : '')}
              >
                <span className="step-number">0{i + 1}</span>
                <span>
                  <strong>{s.name}</strong>
                  <AnimatePresence initial={false}>
                    {active === i && (
                      <motion.span
                        className="step-detail"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        {s.detail}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
                <Plus size={18} />
              </button>
            ))}
          </div>
          <div className="process-preview" id="step-panel" role="tabpanel" aria-labelledby={'step-' + active}>
            <div className="window-dots">
              <i />
              <i />
              <i />
              <span>YOUR CREATIVE WORKSPACE</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                className="step-visual"
                key={active}
                initial={{ opacity: 0, y: 18, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <div className="step-icon">
                  <StepIcon size={35} />
                </div>
                <span className="eyebrow">{processSteps[active].label}</span>
                <h3>{processSteps[active].visualTitle}</h3>
                <div className="workspace-status">
                  <span>{processSteps[active].fileName}</span>
                  <span className="status-chip">{processSteps[active].status}</span>
                </div>
                <div className="progress-track">
                  <motion.span animate={{ width: (active + 1) * 25 + '%' }} />
                </div>
                <small>{processSteps[active].caption}</small>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
