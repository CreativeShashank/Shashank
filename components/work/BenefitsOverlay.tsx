import { Award, MessageSquare, SlidersHorizontal, Zap } from 'lucide-react';

const benefits = [
  {
    icon: Zap,
    title: 'Shoot & edit, one contact',
    text: 'One person from first shot to final cut — no handoffs, no telephone game.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Color & sound design',
    text: 'Graded, mixed and mastered, so every video looks and sounds premium.',
  },
  {
    icon: MessageSquare,
    title: 'Fast, clear revisions',
    text: 'Frame-accurate comments and quick turnarounds until every cut feels right.',
  },
  {
    icon: Award,
    title: 'Ready for every screen',
    text: 'Delivered in the right format for YouTube, socials and web — on schedule.',
  },
];

export default function BenefitsOverlay() {
  return (
    <div className="wall-benefits-overlay">
      <div className="wall-benefits-grid">
        {benefits.map((item) => (
          <div key={item.title} className="benefit-item">
            <h4>
              <item.icon size={16} className="benefit-icon" />
              <span>{item.title}</span>
            </h4>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
