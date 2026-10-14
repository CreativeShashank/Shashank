import type { Metadata } from 'next';
import './globals.css';
import { BRAND } from '@/data/brand';
export const metadata: Metadata = { title:`${BRAND.name} — Video Editor & Videographer`, description:`Portfolio of ${BRAND.name}, freelance video editor & videographer. Shooting, editing, color and sound — from first shot to final cut.`, icons:{icon:'/favicon.svg'} };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html> }
