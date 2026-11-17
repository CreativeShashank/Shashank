import mediaCacheJson from './media-cache.json';

type MediaCache = {
  files: Record<string, string>;
};

const cache = mediaCacheJson as MediaCache;
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY ?? '';

/** Stream a public Drive file directly through the Drive API. */
export function driveVideoUrl(fileId: string): string {
  return cache.files[fileId] ?? `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`;
}

/** Direct Drive API URL for a still image. */
export const driveImageUrl = (fileId: string): string => driveVideoUrl(fileId);

/** Direct video URL with a media fragment so the browser shows a real frame. */
export function driveFrameUrl(fileId: string, seconds = 6): string {
  return `${driveVideoUrl(fileId)}#t=${seconds}`;
}
