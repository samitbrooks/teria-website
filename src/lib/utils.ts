import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sanitizeImageUrl(url: string | undefined | null): string {
  if (!url) return '/Logo.png';
  return url
    .replace(/\/focus%20areas\//gi, '/focus-areas/')
    .replace(/\/focus areas\//gi, '/focus-areas/')
    .replace(/\/gallery%20of%20moments\//gi, '/gallery-of-moments/')
    .replace(/\/gallery of moments\//gi, '/gallery-of-moments/')
    .replace(/\/TERIA%20logo\//gi, '/TERIA-logo/')
    .replace(/\/TERIA logo\//gi, '/TERIA-logo/')
    .replace(/TERIA%20Profile/gi, 'TERIA-Profile')
    .replace(/TERIA Profile/gi, 'TERIA-Profile')
    .replace(/period%20party/gi, 'period-party')
    .replace(/period party/gi, 'period-party')
    .replace(/kcb%20logo/gi, 'kcb-logo')
    .replace(/kcb logo/gi, 'kcb-logo')
    .replace(/m%20changa%20logo/gi, 'm-changa-logo')
    .replace(/m changa logo/gi, 'm-changa-logo')
    .replace(/%20\(1\)/gi, '-1')
    .replace(/ \(1\)/gi, '-1')
    .replace(/%20\(2\)/gi, '-2')
    .replace(/ \(2\)/gi, '-2');
}
