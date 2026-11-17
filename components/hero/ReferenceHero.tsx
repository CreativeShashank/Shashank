'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { Play, Pause, Info, Clock3, Download, Monitor, SlidersHorizontal, Globe, ThumbsUp, Flag, Check, Linkedin, Youtube, Instagram, Facebook, VolumeX, Volume2 } from 'lucide-react';
import './reference-hero.css';
import { BRAND } from '@/data/brand';
import { reel } from '@/data/site';
import { driveFrameUrl } from '@/data/drive';

const film = driveFrameUrl(reel.id, 3);
const comments = [
  ['03:12', 'Love this transition!'],
  ['06:54', 'Can we punch up the subtitles here?'],
  ['02:06', 'The first part is perfect — approved!'],
  ['06:17', 'Great call putting these two shots side by side!']
];

export default function ReferenceHero({ cta }: { cta: React.ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(550);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const reduced = useReducedMotion();

  // Pure scroll-driven animations
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ['start start', 'end end']
  });

  // Spring-smoothed scroll progress so floating cards glide with weightless inertia on scroll
  const cardScroll = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 22,
    mass: 0.65
  });

  useEffect(() => {
    const measure = () => {
      if (stage.current) {
        const totalH = stage.current.offsetHeight || 540;
        // Vertically center the entire stage inside the viewport so nothing is cut off
        const targetTop = Math.max(20, Math.floor((window.innerHeight - totalH) / 2));
        const stageTop = stage.current.offsetTop;
        const needed = stageTop - targetTop;
        setTravel(Math.max(180, needed));
      }
    };
    measure();
    window.addEventListener('resize', measure);
    const observer = new ResizeObserver(measure);
    if (stage.current) observer.observe(stage.current);
    document.fonts.ready.then(measure);
    return () => {
      window.removeEventListener('resize', measure);
      observer.disconnect();
    };
  }, []);

  // 1. Subtitle & CTA fade out quickly on scroll (progress 0 -> 0.12)
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.10], [1, 0]);
  const ctaY = useTransform(scrollYProgress, [0, 0.10], [0, -25]);
  const ctaPointerEvents = useTransform(scrollYProgress, v => (v >= 0.08 ? 'none' : 'auto'));

  // 2. Video Stage moves UP from bottom to dead center (progress 0 -> 0.65), then HOLDS centered (0.65 -> 1.0)
  const stageY = useTransform(scrollYProgress, [0, 0.65, 1], [0, -travel, -travel]);

  // 3. Heading stays in place and fades out as the video frame covers it (progress 0.18 -> 0.52)
  const titleY = useTransform(scrollYProgress, [0, 0.50], [0, -30]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.20, 0.50], [1, 1, 0]);

  // 4. Floating Cards 3D perspective tilt & scroll-parallax transforms
  // Left Card: Review Comments (slants top-left, 3D tilted inward toward the video)
  const commentsY = useTransform(cardScroll, [0, 0.65, 1], [95, 0, -48]);
  const commentsX = useTransform(cardScroll, [0, 0.65, 1], [-16, 0, 8]);
  const commentsRotateX = useTransform(cardScroll, [0, 0.65, 1], [18, 12, 8]);
  const commentsRotateY = useTransform(cardScroll, [0, 0.65, 1], [22, 16, 12]);
  const commentsRotateZ = useTransform(cardScroll, [0, 0.65, 1], [-5.5, -3.5, -2]);

  // Top-Right Card: Video Info (3D tilted inward from top-right)
  const infoY = useTransform(cardScroll, [0, 0.65, 1], [115, 0, -55]);
  const infoX = useTransform(cardScroll, [0, 0.65, 1], [18, 0, -10]);
  const infoRotateX = useTransform(cardScroll, [0, 0.65, 1], [16, 10, 6]);
  const infoRotateY = useTransform(cardScroll, [0, 0.65, 1], [-22, -16, -12]);
  const infoRotateZ = useTransform(cardScroll, [0, 0.65, 1], [7.5, 5, 3]);

  // Bottom-Right Card: Export Status (slants top-right, 3D tilted inward toward the video)
  const exportY = useTransform(cardScroll, [0, 0.65, 1], [145, 0, -64]);
  const exportX = useTransform(cardScroll, [0, 0.65, 1], [22, 0, -8]);
  const exportRotateX = useTransform(cardScroll, [0, 0.65, 1], [18, 12, 8]);
  const exportRotateY = useTransform(cardScroll, [0, 0.65, 1], [-24, -18, -14]);
  const exportRotateZ = useTransform(cardScroll, [0, 0.65, 1], [6.5, 4, 2.5]);

  function toggle() {
    if (!video.current) return;
    if (playing) {
      video.current.pause();
      setPlaying(false);
    } else {
      video.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }

  return (
    <section
      className="hero-scroll-track"
      ref={root}
      style={{ height: reduced ? 'auto' : `calc(100svh + ${travel * 1.5}px)` }}
      aria-label={`${BRAND.name} — video editor and videographer`}
    >
      <div className="hero-pinned">
        <div className="reference-rails" aria-hidden="true" />

        {/* Hero Central Headings */}
        <div className="reference-hero-content">
          <motion.h1
            className="reference-title"
            style={reduced ? {} : { y: titleY, opacity: titleOpacity }}
            initial={{ opacity: 0, filter: 'blur(8px)', y: 15 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>I shoot &amp; cut</span>
            <em>stories worth watching.</em>
          </motion.h1>

          <motion.div
            className="reference-hero-offer"
            style={reduced ? {} : { opacity: ctaOpacity, y: ctaY, pointerEvents: ctaPointerEvents as any }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>Videography, editing &amp; color — from first shot to final cut.</p>
            <div className="hero-cta-wrap">
              {cta}
            </div>
          </motion.div>
        </div>

        {/* Video Stage: has z-index: 10 so it slides OVER the heading */}
        <motion.div
          ref={stage}
          className="reference-stage"
          style={reduced ? {} : { y: stageY }}
        >
          <div className="reference-video">
            <video
              ref={video}
              src={film}
              onLoadedMetadata={() => {
                if (video.current) video.current.currentTime = Math.min(3, video.current.duration);
              }}
              preload="auto"
              muted={muted}
              loop
              playsInline
              aria-label="Showreel"
            />
            <button
              className="reference-play"
              onClick={toggle}
              aria-label={playing ? 'Pause showreel' : 'Play showreel'}
            >
              {playing ? <Pause size={28} /> : <Play size={28} fill="currentColor" />}
            </button>
            <button
              className="reference-sound"
              onClick={() => setMuted(!muted)}
              aria-label={muted ? 'Unmute showreel' : 'Mute showreel'}
            >
              {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            </button>
          </div>

          {/* Client Brands Row */}
          <div className="reference-brands" aria-label="Selected reference brands">
            <span className="bloom">Blooming<br /><b>YOU</b></span>
            <span className="papisy">Papisy.</span>
            <span className="chamber">♧<small>Chamber of Notaries<br />showreel client</small></span>
            <span className="stello">✦ STELLO</span>
            <span className="querimont">▥ Querimont</span>
          </div>

          {/* Creator Avatars */}
          <div className="reference-creators">
            {[
              ['Matthias Frank', '+14k subscribers', '43'],
              ['Wakz', '+132k subscribers', '48'],
              ['Better Creating', '+157k subscribers', '49'],
              ['Matthieu Stephani', '+41k subscribers', '50'],
              ['Micode', '+1.4M subscribers', '47']
            ].map(([name, count], i) => (
              <div className="creator" key={name}>
                <span className={'creator-avatar avatar-' + i}>{name[0]}</span>
                <div>
                  {name}
                  <small>{count}</small>
                </div>
              </div>
            ))}
          </div>

          {/* Review Comments Card (Left) */}
          <motion.aside
            className="reference-comments"
            aria-label="Video review comments"
            style={
              reduced
                ? {}
                : {
                    transformPerspective: 950,
                    y: commentsY,
                    x: commentsX,
                    rotateX: commentsRotateX,
                    rotateY: commentsRotateY,
                    rotateZ: commentsRotateZ
                  }
            }
          >
            {comments.map(([time, body]) => (
              <div className="reference-comment" key={time}>
                <div className="comment-author">
                  <span><Globe size={20} /></span>
                  Client
                </div>
                <p>
                  <time>{time}</time>
                  {body}
                </p>
                <span className="comment-reply">
                  Reply <ThumbsUp size={13} />
                </span>
              </div>
            ))}
          </motion.aside>

          {/* Video Info Card (Top Right) */}
          <motion.aside
            className="reference-info"
            aria-label="Video file information"
            style={
              reduced
                ? {}
                : {
                    transformPerspective: 950,
                    y: infoY,
                    x: infoX,
                    rotateX: infoRotateX,
                    rotateY: infoRotateY,
                    rotateZ: infoRotateZ
                  }
            }
          >
            <h3><Info size={15} fill="currentColor" /> Details</h3>
            <div>
              <span><Clock3 size={13} />1:10</span>
              <span><Download size={13} />9MB</span>
              <span><Monitor size={13} />1920×1080</span>
              <span><SlidersHorizontal size={13} />MPEG4, H.264</span>
            </div>
          </motion.aside>

          {/* Video Export Status Card (Bottom Right) */}
          <motion.aside
            className="reference-export"
            aria-label="Publication status"
            style={
              reduced
                ? {}
                : {
                    transformPerspective: 950,
                    y: exportY,
                    x: exportX,
                    rotateX: exportRotateX,
                    rotateY: exportRotateY,
                    rotateZ: exportRotateZ
                  }
            }
          >
            <h3>Kirti_Wedding_Highlight.mp4</h3>
            <p>{BRAND.name} · Oct 2026</p>
            <div className="export-block">
              <label><Flag size={15} /> Video status</label>
              <span className="ready-badge">Ready to publish</span>
            </div>
            <div className="export-block">
              <label><Monitor size={15} /> Delivery formats</label>
              <div className="social-chips">
                <span><Linkedin size={12} />LinkedIn</span>
                <span><Youtube size={12} />Youtube</span>
                <span><Instagram size={12} />Instagram</span>
                <span>♪ TikTok</span>
                <span><Facebook size={12} />Facebook</span>
              </div>
            </div>
            <div className="final-status">
              Final cut <span><Check size={16} /></span>
            </div>
          </motion.aside>
        </motion.div>
      </div>
    </section>
  );
}
