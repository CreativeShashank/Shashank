'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Play, X } from 'lucide-react';
import { driveFrameUrl, driveVideoUrl } from '@/data/drive';
import type { Film } from '@/data/site';

export default function VideoCard({ film }: { film: Film }) {

  return (
    <Dialog.Root>
      <Dialog.Trigger
        className={'wall-card ' + (film.portrait ? 'portrait' : 'landscape')}
        aria-label={'Watch: ' + film.title}
      >
        <video
          className="wall-thumb"
          src={driveFrameUrl(film.id, 6)}
          preload="metadata"
          muted
          playsInline
          aria-label={film.title}
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
          <video
            src={driveVideoUrl(film.id)}
            title={film.title}
            controls
            autoPlay
            playsInline
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
