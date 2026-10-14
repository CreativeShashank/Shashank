'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { MessageCircle, X } from 'lucide-react';

type ContactDialogProps = {
  label?: string;
  className?: string;
};

export default function ContactDialog({ label = 'Let’s talk', className = 'button light' }: ContactDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={className}>
        {label}
        <span className="button-dot" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <Dialog.Close className="icon-button close" aria-label="Close contact dialog">
            <X />
          </Dialog.Close>
          <span className="eyebrow">A GOOD STORY STARTS HERE</span>
          <Dialog.Title>
            What are you
            <br />
            <em>dreaming up?</em>
          </Dialog.Title>
          <Dialog.Description>
            Tell me a little about your project — I usually reply within a day.
          </Dialog.Description>
          <div className="contact-note">
            <MessageCircle size={20} />
            <p>Prefer email? Write to me directly and I&apos;ll get back to you with next steps.</p>
          </div>
          <Dialog.Close className="button light">Keep exploring</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
