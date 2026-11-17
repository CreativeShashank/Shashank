'use client';

import { useMemo, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Clock3, Globe, Video } from 'lucide-react';
import Reveal from '../ui/Reveal';
import { BOOKING } from '@/data/booking';
import './booking.css';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** Candidate start times (minutes since midnight), like the reference. */
const CANDIDATE_SLOTS = [975, 1050, 1065, 1140, 1155, 1170, 1185, 1200, 1215];

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isAvailable(d: Date, today: Date) {
  return d >= new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

/** Deterministic per-date rotation so each day shows a slightly different set. */
function slotsFor(date: Date) {
  const rot = date.getDate() % CANDIDATE_SLOTS.length;
  const rotated = [...CANDIDATE_SLOTS.slice(rot), ...CANDIDATE_SLOTS.slice(0, rot)];
  return rotated.slice(0, 8).sort((a, b) => a - b);
}

function formatSlot(minutes: number, hour12: boolean) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const mm = String(m).padStart(2, '0');
  if (!hour12) return `${h}:${mm}`;
  const suffix = h >= 12 ? 'pm' : 'am';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${mm}${suffix}`;
}

/** Build a Calendly URL that opens the selected day and time. */
function calendlySlotUrl(base: string, date: Date, minutes: number) {
  const yyyy = date.getFullYear();
  const mo = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(Math.floor(minutes / 60)).padStart(2, '0');
  const mi = String(minutes % 60).padStart(2, '0');

  const local = new Date(yyyy, date.getMonth(), date.getDate(), Number(hh), Number(mi), 0, 0);
  const offset = -local.getTimezoneOffset();
  const sign = offset >= 0 ? '+' : '-';
  const abs = Math.abs(offset);
  const oh = String(Math.floor(abs / 60)).padStart(2, '0');
  const om = String(abs % 60).padStart(2, '0');

  const url = new URL(base);
  url.pathname = `${url.pathname.replace(/\/$/, '')}/${yyyy}-${mo}-${dd}T${hh}:${mi}:00${sign}${oh}:${om}`;
  url.searchParams.set('month', `${yyyy}-${mo}`);
  url.searchParams.set('date', `${yyyy}-${mo}-${dd}`);
  return url.toString();
}

export default function BookingSection() {
  const today = useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<Date>(() => {
    const d = new Date(today);
    while (!isAvailable(d, today)) d.setDate(d.getDate() + 1);
    return d;
  });
  const [slot, setSlot] = useState<number | null>(null);
  const [hour12, setHour12] = useState(true);
  const [timezone] = useState(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';
    } catch {
      return 'Asia/Kolkata';
    }
  });

  const cells = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1);
    const offset = (first.getDay() + 6) % 7; // Monday-first
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const arr: (Date | null)[] = [];
    for (let i = 0; i < offset; i++) arr.push(null);
    for (let d = 1; d <= daysInMonth; d++) arr.push(new Date(viewYear, viewMonth, d));
    return arr;
  }, [viewYear, viewMonth]);

  const slots = useMemo(() => slotsFor(selected), [selected]);

  function moveMonth(dir: 1 | -1) {
    const d = new Date(viewYear, viewMonth + dir, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  }

  function pickDay(d: Date) {
    setSelected(d);
    setSlot(null);
  }

  const dateLabel = `${DAY_NAMES[selected.getDay()]} ${selected.getDate()}${ordinal(selected.getDate())}`;
  const confirmHref = BOOKING.calendlyUrl
    ? calendlySlotUrl(BOOKING.calendlyUrl, selected, slot ?? CANDIDATE_SLOTS[0])
    : `mailto:${BOOKING.contactEmail}?subject=${encodeURIComponent(
        `${BOOKING.eventTitle} — ${dateLabel}${slot !== null ? ' · ' + formatSlot(slot, hour12) : ''}`
      )}&body=${encodeURIComponent(
        `Hi,\n\nI'd like to book a slot on ${dateLabel}${
          slot !== null ? ' at ' + formatSlot(slot, hour12) : ''
        } (${BOOKING.duration}, ${BOOKING.location}).\n\nThanks!`
      )}`;

  return (
    <section className="booking" id="booking" aria-label="Book a call">
      <Reveal className="booking-head">
        <h2>
          Let&apos;s take a moment together,
          <br />
          <em>to talk about your next video.</em>
        </h2>
        <a className="booking-mail" href={`mailto:${BOOKING.contactEmail}`}>
          Contact by email
        </a>
      </Reveal>

      <Reveal className="booking-card" delay={0.1}>
        {/* Left: event summary */}
        <div className="booking-profile">
          <span className="booking-avatar" aria-hidden="true">{BOOKING.hostInitials}</span>
          <span className="booking-host">{BOOKING.hostName}</span>
          <h3>{BOOKING.eventTitle}</h3>
          <p>{BOOKING.eventDescription}</p>
          <p className="booking-muted">{BOOKING.eventGoal}</p>
          <ul>
            <li><Clock3 size={16} /> {BOOKING.duration}</li>
            <li><Video size={16} /> {BOOKING.location}</li>
            <li><Globe size={16} /> {timezone}</li>
          </ul>
        </div>

        {/* Middle: calendar */}
        <div className="booking-cal">
          <div className="booking-cal-head">
            <strong>{MONTHS[viewMonth]} <span>{viewYear}</span></strong>
            <div>
              <button onClick={() => moveMonth(-1)} aria-label="Previous month"><ChevronLeft size={18} /></button>
              <button onClick={() => moveMonth(1)} aria-label="Next month"><ChevronRight size={18} /></button>
            </div>
          </div>
          <div className="booking-grid" role="grid" aria-label="Choose a day">
            {WEEKDAYS.map((w) => (
              <span key={w} className="booking-dow">{w}</span>
            ))}
            {cells.map((d, i) =>
              d === null ? (
                <span key={'e' + i} />
              ) : (
                <button
                  key={d.toISOString()}
                  disabled={!isAvailable(d, today)}
                  onClick={() => pickDay(d)}
                  aria-pressed={sameDay(d, selected)}
                  className={
                    'booking-day' +
                    (sameDay(d, selected) ? ' sel' : '') +
                    (isAvailable(d, today) ? ' open' : '')
                  }
                >
                  {d.getDate()}
                  {sameDay(d, selected) && <i />}
                </button>
              )
            )}
          </div>
        </div>

        {/* Right: time slots */}
        <div className="booking-slots">
          <div className="booking-slots-head">
            <strong>{dateLabel}</strong>
            <div className="booking-toggle" role="group" aria-label="Time format">
              <button aria-pressed={hour12} onClick={() => setHour12(true)} className={hour12 ? 'on' : ''}>12h</button>
              <button aria-pressed={!hour12} onClick={() => setHour12(false)} className={!hour12 ? 'on' : ''}>24h</button>
            </div>
          </div>
          <div className="booking-slot-list">
            {slots.map((s) => (
              <button
                key={s}
                onClick={() => setSlot(s)}
                aria-pressed={slot === s}
                className={'booking-slot' + (slot === s ? ' sel' : '')}
              >
                {formatSlot(s, hour12)}
              </button>
            ))}
          </div>
          <a
            className={'booking-confirm' + (slot === null ? ' disabled' : '')}
            href={slot === null ? undefined : confirmHref}
            target={BOOKING.calendlyUrl ? '_blank' : undefined}
            rel={BOOKING.calendlyUrl ? 'noreferrer' : undefined}
            aria-disabled={slot === null}
            onClick={(e) => slot === null && e.preventDefault()}
          >
            <CalendarDays size={16} />
            {slot === null
              ? 'Pick a time'
              : `Confirm — ${formatSlot(slot, hour12)}`}
          </a>
          <small className="booking-note">
            {BOOKING.calendlyUrl ? 'Booking via Calendly.' : 'Calendly link not set — confirming opens your email app.'}
          </small>
        </div>
      </Reveal>
    </section>
  );
}

function ordinal(n: number) {
  if (n >= 11 && n <= 13) return 'th';
  switch (n % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}
