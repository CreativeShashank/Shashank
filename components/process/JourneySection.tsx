'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Mic, MicOff, Video, PhoneOff, Search, Bell, ThumbsUp, ThumbsDown, Share2 } from 'lucide-react';
import { BRAND } from '@/data/brand';
import { driveFrameUrl } from '@/data/drive';
import './journey.css';

type JourneyStep = {
  day: string;
  title: string;
  text: string;
  tab: 'meet' | 'notion' | 'frame' | 'youtube';
};

const steps: JourneyStep[] = [
  {
    day: '1',
    title: "Let's meet",
    text: 'A video call to understand your story, your audience and what the video needs to do.',
    tab: 'meet',
  },
  {
    day: '2',
    title: 'We plan it',
    text: 'Shot list, script notes and references — everything gathered in one shared hub.',
    tab: 'notion',
  },
  {
    day: '3',
    title: 'Lights, camera',
    text: 'Shoot day. I direct, film and capture clean audio on set.',
    tab: 'frame',
  },
  {
    day: '4',
    title: 'You review',
    text: 'Comment frame by frame on the first cut — I revise until it clicks.',
    tab: 'notion',
  },
  {
    day: '5',
    title: 'You publish',
    text: 'Your final video in high quality, formatted for every platform.',
    tab: 'youtube',
  },
];

const VIEW_LABEL: Record<JourneyStep['tab'], string> = {
  meet: 'Google Meet — Intro call',
  notion: 'Notion — Project hub',
  frame: 'Frame.io — FirstCut_v1.mp4',
  youtube: 'YouTube — Delivered',
};

function MeetMock() {
  return (
    <div className="j-mock j-meet">
      <div className="j-meet-top">
        <span>13:52&nbsp;&nbsp;|&nbsp;&nbsp;Intro call</span>
        <div className="j-meet-controls-top">
          <span className="j-ctl"><MicOff size={14} /></span>
          <span className="j-ctl"><Mic size={14} /></span>
          <span className="j-ctl"><Video size={14} /></span>
          <span className="j-ctl hang"><PhoneOff size={14} /></span>
        </div>
      </div>
      <div className="j-meet-grid">
        <div className="j-meet-tile main">
          <span className="j-avatar">{BRAND.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}</span>
          <span className="j-name">{BRAND.name}</span>
        </div>
        <div className="j-meet-tile side">
          <span className="j-avatar">C</span>
          <span className="j-name">Client</span>
        </div>
      </div>
      <div className="j-meet-bottom">{BRAND.name}&nbsp;&nbsp;/&nbsp;&nbsp;Project hub</div>
    </div>
  );
}

function NotionMock() {
  const rows = [
    ['In Progress', '202308YTB_GptVision', 'Leave feedback on Frame'],
    ['Potential', '20241ADS_StoriesInsta', 'Write ad concepts'],
    ['Success', '20230930VSL_OldHomepage', 'Edit the VSL'],
  ];
  return (
    <div className="j-mock j-notion">
      <div className="j-notion-head">Project hub</div>
      <div className="j-notion-sub">{BRAND.name}&nbsp;&nbsp;/&nbsp;&nbsp;Content tracker</div>
      <div className="j-notion-table">
        <div className="j-notion-row head"><span>STATUS</span><span>PROJECT</span><span>TASKS</span></div>
        {rows.map(([s, p, t]) => (
          <div className="j-notion-row" key={p}>
            <span className={'j-pill ' + (s === 'Success' ? 'green' : s === 'Potential' ? 'orange' : 'blue')}>{s}</span>
            <span>{p}</span>
            <span className="j-pill ghost">{t}</span>
          </div>
        ))}
      </div>
      <div className="j-notion-links">
        <span>Useful links — brand guidelines & references</span>
        <span>Assets, logo, branding — Google Drive</span>
      </div>
    </div>
  );
}

function FrameMock() {
  return (
    <div className="j-mock j-frame">
      <div className="j-frame-head"><span>‹</span> FirstCut_v1.mp4</div>
      <div className="j-frame-video">
        <video
          src={driveFrameUrl('1LBPCgNbL89n0SzYvC2wkY1EbKDoLgxv5', 6)}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-label="First cut in review"
        />
        <svg className="j-arrow" viewBox="0 0 120 60" aria-hidden="true">
          <line x1="8" y1="8" x2="92" y2="44" stroke="#ff1f3d" strokeWidth="7" />
          <polygon points="92,22 116,54 78,56" fill="#ff1f3d" />
        </svg>
        <span className="j-time">5:09 / 16:45</span>
      </div>
      <div className="j-frame-table">
        <span className="j-pill blue">In Progress</span>
        <span>202308YTB_GptVision</span>
        <span className="j-link">https://fi.io/4m…</span>
        <span className="j-pill ghost">Leave feedback on Frame</span>
      </div>
    </div>
  );
}

function YoutubeMock() {
  return (
    <div className="j-mock j-yt">
      <div className="j-yt-top">
        <span className="j-yt-logo"><i />YouTube</span>
        <span className="j-yt-search"><Search size={14} /> Search</span>
      </div>
      <div className="j-yt-player">
        <video
          src={driveFrameUrl('1nreeKRxVCUzmfETEkNgKype4m9p-MVy0', 6)}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-label="Published client video"
        />
        <span className="j-yt-progress"><i /></span>
      </div>
      <div className="j-yt-title">Kirti — wedding highlight</div>
      <div className="j-yt-row">
        <span className="j-yt-chan"><span className="j-avatar sm">C</span><b>Client Channel<small>1.23M subscribers</small></b></span>
        <span className="j-yt-sub"><Bell size={13} /> Subscribed</span>
        <span className="j-yt-actions">
          <span><ThumbsUp size={13} /> 6.7K</span>
          <span><ThumbsDown size={13} /></span>
          <span><Share2 size={13} /> Share</span>
        </span>
      </div>
      <div className="j-yt-meta">244K views · 6 months ago</div>
    </div>
  );
}

export default function JourneySection() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (reduced) return;
    setActive(Math.min(steps.length - 1, Math.floor(v * steps.length)));
  });

  const step = steps[active];

  return (
    <section className="journey" id="process" aria-label="How it works">
      <div ref={trackRef} className="journey-track" style={{ height: reduced ? 'auto' : '480vh' }}>
        <div className="journey-pin">
          <div className="journey-rail" aria-hidden="true">
            <span
              className="journey-dot on"
              style={{ top: `${10 + (active * 80) / (steps.length - 1)}%` }}
            >
              {active + 1}
            </span>
          </div>

          <div className="journey-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="journey-day">
                  <span>Day</span>
                  <strong>{step.day}</strong>
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <a href="#booking" className="button light journey-cta">Book a call<span className="button-dot" /></a>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="journey-right">
            <div className="journey-browser">
              <div className="journey-bar">
                <span className="journey-traffic"><i /><i /><i /></span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={active}
                    className="journey-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {VIEW_LABEL[step.tab]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="journey-screen">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: 60, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {step.tab === 'meet' && <MeetMock />}
                    {step.tab === 'notion' && <NotionMock />}
                    {step.tab === 'frame' && <FrameMock />}
                    {step.tab === 'youtube' && <YoutubeMock />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
