'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Play, X } from 'lucide-react';
import type { Film } from '@/data/site';

export default function VideoCard({ film }: { film: Film }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        className={'wall-card ' + (film.portrait ? 'portrait' : 'landscape')}
        aria-label={'Watch: ' + film.title}
      >
        <img
          src={'https://framerusercontent.com/images/' + film.image + '?scale-down-to=1024'}
          alt={film.title}
          loading="lazy"
        />
        <span className="wall-card-hover">
          <span>
            <Play size={24} fill="currentColor" />
          </span>
          <strong>{film.title}</strong>
        </span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className={'dialog-content wall-dialog ' + (film.portrait ? 'portrait-dialog' : '')}>
          <Dialog.Close className="icon-button close" aria-label="Close video">
            <X />
          </Dialog.Close>
          <Dialog.Title>{film.title}</Dialog.Title>
          <Dialog.Description className="wall-description">
            A piece from my portfolio — shot and edited by me.
          </Dialog.Description>
          {film.youtube ? (
            <iframe
              src={'https://www.youtube-nocookie.com/embed/' + film.youtube + '?autoplay=1&rel=0'}
              title={film.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img
              src={'https://framerusercontent.com/images/' + film.image + '?scale-down-to=1024'}
              alt={film.title}
            />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
