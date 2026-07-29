import type { Timestamp } from 'firebase/firestore';

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface FocusAreaItem {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  imageUrl?: string;
  imageHint?: string;
}

export interface GalleryImageItem {
  id?: string;
  src: string;
  alt: string;
  imageHint: string;
  storagePath?: string; // Path to the file in Firebase Storage
  createdAt?: Timestamp;
}

export interface BlogPostTeaserItem {
  id: string;
  slug: string; // Added for unique URL path
  category: string; // Added for filtering
  imageUrl: string;
  imageHint: string;
  storagePath?: string; // Path to the file in Firebase Storage
  title: string;
  summary: string;
  fullContent: string; // Added for the complete blog post content
  date: string;
  galleryImages?: GalleryImageItem[]; // Added for blog post image gallery
  // href is now derived from slug: /blog/[slug]
}

export interface PartnerLogo {
  name: string;
  logoUrl: string;
  logoHint: string;
}

export interface Donation {
    id: string;
    name: string;
    email: string;
    amount: number; // in lowest currency unit (e.g., kobo/cents)
    currency: string;
    reference: string;
    status: 'success' | 'reversed';
    createdAt: Timestamp;
    modifiedAt?: Timestamp;
    modifiedBy?: string; // Admin's email or UID
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: Timestamp;
  read?: boolean;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: Timestamp;
}

export interface Official {
  id?: string;
  name: string;
  role: string;
  imageUrl: string;
  imageHint: string;
  storagePath?: string; // Path to the file in Firebase Storage
  order: number;
}

export interface SiteSettings {
  contactEmail: string;
  contactPhone1: string;
  contactPhone2: string;
  facebookUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
  twitterUrl: string;
  // Paystack keys stored in the database
  paystackPublicKey?: string;
  paystackSecretKeyEncrypted?: string;
}

export interface AuditLogEntry {
  id: string;
  action: string;
  user: string; // User's email
  details: string;
  timestamp: Timestamp;
}
