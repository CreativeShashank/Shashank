import { BRAND } from '@/data/brand';

export default function SiteFooter() {
  return (
    <footer>
      <a className="wordmark" href="#">
        {BRAND.name.toLowerCase().split(' ')[0]}
        <span>{BRAND.name.toLowerCase().split(' ').slice(1).join(' ') || 'portfolio'}</span>
      </a>
      <span>Freelance video editor &amp; videographer.</span>
      <div>
        <a href="#work">Work</a>
        <a href="#process">Process</a>
        <a href="#booking">Contact</a>
        <span>© {new Date().getFullYear()} {BRAND.name}</span>
      </div>
    </footer>
  );
}
