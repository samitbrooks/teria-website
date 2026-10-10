// src/lib/d1.ts
// Cloudflare D1 Database Client for TERIA Website

import type {
  BlogPostTeaserItem,
  Donation,
  ContactSubmission,
  NewsletterSubscriber,
  Official,
  GalleryImageItem,
  SiteSettings,
  AuditLogEntry,
} from '@/types';
import type { AdminUser } from '@/lib/auth-service';

// Cloudflare configuration (fallback for REST API if binding is not in environment)
const CF_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || '0fb6d6b945f1c4612a5d6e399d321049';
const CF_DATABASE_ID = process.env.CLOUDFLARE_DATABASE_ID || process.env.D1_DATABASE_ID || 'teria-db';
const CF_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || process.env.CF_D1_TOKEN || '';

/**
 * Get native D1 binding from Cloudflare runtime environment
 */
function getD1Binding(): any {
  if (typeof process !== 'undefined' && (process.env as any)?.DB) {
    return (process.env as any).DB;
  }
  if (typeof globalThis !== 'undefined' && (globalThis as any)?.DB) {
    return (globalThis as any).DB;
  }
  if (typeof globalThis !== 'undefined' && (globalThis as any)?.__env__?.DB) {
    return (globalThis as any).__env__.DB;
  }
  return null;
}

/**
 * Execute a SELECT query on D1 and return typed results
 */
export async function queryD1<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  const d1 = getD1Binding();

  // 1. Edge runtime with native D1 binding
  if (d1 && typeof d1.prepare === 'function') {
    try {
      const stmt = params.length > 0 ? d1.prepare(sql).bind(...params) : d1.prepare(sql);
      const res = await stmt.all();
      return (res?.results || []) as T[];
    } catch (err) {
      console.error('Error executing D1 native query:', err, { sql, params });
      throw err;
    }
  }

  // 2. Cloudflare REST API fallback (if token is available)
  if (CF_API_TOKEN && CF_ACCOUNT_ID && CF_DATABASE_ID) {
    try {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/d1/database/${CF_DATABASE_ID}/query`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${CF_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sql, params }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.result?.[0]?.results) {
          return data.result[0].results as T[];
        }
      }
    } catch (err) {
      console.warn('D1 REST API query error:', err);
    }
  }

  // 3. Fallback mock / initial data for local development or pre-rendering
  return getFallbackData<T>(sql, params);
}

/**
 * Execute an INSERT / UPDATE / DELETE query on D1
 */
export async function executeD1(sql: string, params: any[] = []): Promise<boolean> {
  const d1 = getD1Binding();

  // 1. Edge runtime with native D1 binding
  if (d1 && typeof d1.prepare === 'function') {
    try {
      const stmt = params.length > 0 ? d1.prepare(sql).bind(...params) : d1.prepare(sql);
      const res = await stmt.run();
      return res?.success !== false;
    } catch (err) {
      console.error('Error executing D1 native mutation:', err, { sql, params });
      throw err;
    }
  }

  // 2. Cloudflare REST API fallback
  if (CF_API_TOKEN && CF_ACCOUNT_ID && CF_DATABASE_ID) {
    try {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/d1/database/${CF_DATABASE_ID}/query`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${CF_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sql, params }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data.success === true;
      }
    } catch (err) {
      console.warn('D1 REST API execution error:', err);
    }
  }

  console.warn('D1 binding not detected; simulated write for:', sql);
  return true;
}

// -------------------------------------------------------------
// Fallback Data when running locally or during build time
// -------------------------------------------------------------
function getFallbackData<T>(sql: string, params: any[]): T[] {
  const lower = sql.toLowerCase();

  if (lower.includes('from blog_posts')) {
    const fallbackPosts: any[] = [
      {
        id: 'post-1',
        slug: 'wash-initiative-brings-clean-water',
        category: 'WASH',
        imageUrl: '/homeimages/focus-areas/WASH.jpg',
        imageHint: 'clean water community',
        title: 'TERIA’s WASH Initiative: Bringing Clean Water and Hope to Communities',
        summary:
          'Access to clean water is life-changing. TERIA’s “Water is Life” initiative is tackling water scarcity by constructing boreholes, transforming daily life for hundreds of families and students in Rarieda.',
        fullContent:
          'Clean water is not a luxury; it is a fundamental human right. For many communities in Rarieda, the daily struggle to find and fetch clean water is a significant barrier to health, education, and economic stability. TERIA is committed to changing this reality.',
        date: '2023-11-10',
        galleryImages: [
          { src: '/homeimages/focus-areas/WASH.jpg', alt: 'Community borehole', imageHint: 'water' },
        ],
      },
      {
        id: 'post-2',
        slug: 'international-widows-day-2025-honoring-resilience',
        category: 'Advocacy',
        imageUrl: '/1750874946133.jpg',
        imageHint: 'advocacy event group',
        title: 'International Widows Day 2025: Honoring Resilience and Advocating for Justice',
        summary:
          'TERIA joined leaders and advocates in Kaloleni, Kilifi County, and held a parallel event in Rarieda to commemorate International Widows Day, highlighting resilience and calling for stronger support systems.',
        fullContent:
          'On June 23rd, 2025, TERIA Founder Kohanya Linet, alongside her spouse Hon. Otiende Amollo and other distinguished leaders, gathered to mark International Widows Day.',
        date: '2025-06-23',
        galleryImages: [],
      },
      {
        id: 'post-3',
        slug: 'chianda-medical-camp-brings-hope',
        category: 'Health',
        imageUrl: '/homeimages/1.jpeg',
        imageHint: 'medical camp event',
        title: 'Free Medical Camp Brings Hope and Health to Chianda Community',
        summary:
          'TERIA, in collaboration with multiple partners, hosted a successful free medical camp at Chianda Community Hospital, providing vital healthcare services to hundreds of residents in Rarieda.',
        fullContent:
          'Healthcare is not just a service — it is dignity, relief, and hope. On August 3rd, 2023, the grounds of Chianda Community Hospital in Rarieda were transformed into a sanctuary of healing as TERIA hosted a Free Medical Camp.',
        date: '2023-08-03',
        galleryImages: [],
      },
    ];

    if (params.length > 0 && typeof params[0] === 'string') {
      const match = fallbackPosts.find(p => p.slug === params[0] || p.id === params[0]);
      return (match ? [match] : []) as T[];
    }
    return fallbackPosts as T[];
  }

  if (lower.includes('from users')) {
    return [
      {
        id: 'admin-1',
        email: 'samikidemi@gmail.com',
        password_hash: 'e04853b7d862984b0509b11e23ba94af3135a5712089bfffed9c3e78b7baa445',
        name: 'Samuel Kidemi',
        role: 'admin',
      },
    ] as T[];
  }

  if (lower.includes('from settings')) {
    return [
      {
        key: 'site',
        value: JSON.stringify({
          contactEmail: 'teria.cbo@gmail.com',
          contactPhone1: '+254 795 185 979',
          contactPhone2: '+254 754 929 777',
          facebookUrl: 'https://facebook.com',
          instagramUrl: 'https://instagram.com',
          tiktokUrl: 'https://tiktok.com',
          twitterUrl: 'https://twitter.com',
          paystackPublicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
        }),
      },
    ] as T[];
  }

  return [];
}

// =============================================================
// 1. BLOG POSTS
// =============================================================

function mapDbRowToBlogPost(row: any): BlogPostTeaserItem {
  let galleryImages: any[] = [];
  if (row.gallery_images) {
    try {
      galleryImages = typeof row.gallery_images === 'string'
        ? JSON.parse(row.gallery_images)
        : row.gallery_images;
    } catch {
      galleryImages = [];
    }
  }

  return {
    id: row.id,
    slug: row.slug,
    category: row.category,
    imageUrl: row.image_url || row.imageUrl,
    imageHint: row.image_hint || row.imageHint || '',
    title: row.title,
    summary: row.summary,
    fullContent: row.full_content || row.fullContent || '',
    date: row.date,
    galleryImages,
  };
}

export async function getBlogPosts(limit?: number): Promise<BlogPostTeaserItem[]> {
  const sql = limit
    ? 'SELECT * FROM blog_posts ORDER BY date DESC LIMIT ?'
    : 'SELECT * FROM blog_posts ORDER BY date DESC';
  const params = limit ? [limit] : [];
  const rows = await queryD1(sql, params);
  return rows.map(mapDbRowToBlogPost);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostTeaserItem | null> {
  const rows = await queryD1('SELECT * FROM blog_posts WHERE slug = ? LIMIT 1', [slug]);
  if (!rows || rows.length === 0) return null;
  return mapDbRowToBlogPost(rows[0]);
}

export async function getBlogPostById(id: string): Promise<BlogPostTeaserItem | null> {
  const rows = await queryD1('SELECT * FROM blog_posts WHERE id = ? LIMIT 1', [id]);
  if (!rows || rows.length === 0) return null;
  return mapDbRowToBlogPost(rows[0]);
}

export async function createBlogPost(post: Partial<BlogPostTeaserItem>): Promise<BlogPostTeaserItem> {
  const id = post.id || `post-${Date.now()}`;
  const galleryJson = JSON.stringify(post.galleryImages || []);

  await executeD1(
    `INSERT INTO blog_posts (id, slug, category, image_url, image_hint, title, summary, full_content, date, gallery_images)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      post.slug,
      post.category || 'General',
      post.imageUrl,
      post.imageHint || '',
      post.title,
      post.summary || '',
      post.fullContent || '',
      post.date || new Date().toISOString().split('T')[0],
      galleryJson,
    ]
  );

  return {
    id,
    slug: post.slug!,
    category: post.category || 'General',
    imageUrl: post.imageUrl!,
    imageHint: post.imageHint || '',
    title: post.title!,
    summary: post.summary || '',
    fullContent: post.fullContent || '',
    date: post.date || new Date().toISOString().split('T')[0],
    galleryImages: post.galleryImages || [],
  };
}

export async function updateBlogPost(id: string, post: Partial<BlogPostTeaserItem>): Promise<boolean> {
  const updates: string[] = [];
  const params: any[] = [];

  if (post.slug !== undefined) { updates.push('slug = ?'); params.push(post.slug); }
  if (post.category !== undefined) { updates.push('category = ?'); params.push(post.category); }
  if (post.imageUrl !== undefined) { updates.push('image_url = ?'); params.push(post.imageUrl); }
  if (post.imageHint !== undefined) { updates.push('image_hint = ?'); params.push(post.imageHint); }
  if (post.title !== undefined) { updates.push('title = ?'); params.push(post.title); }
  if (post.summary !== undefined) { updates.push('summary = ?'); params.push(post.summary); }
  if (post.fullContent !== undefined) { updates.push('full_content = ?'); params.push(post.fullContent); }
  if (post.date !== undefined) { updates.push('date = ?'); params.push(post.date); }
  if (post.galleryImages !== undefined) {
    updates.push('gallery_images = ?');
    params.push(JSON.stringify(post.galleryImages));
  }

  if (updates.length === 0) return true;

  params.push(id);
  return executeD1(`UPDATE blog_posts SET ${updates.join(', ')} WHERE id = ?`, params);
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  return executeD1('DELETE FROM blog_posts WHERE id = ?', [id]);
}

// =============================================================
// 2. DONATIONS
// =============================================================

export async function getDonations(): Promise<Donation[]> {
  const rows = await queryD1('SELECT * FROM donations ORDER BY created_at DESC');
  return rows.map((r: any) => ({
    id: r.id,
    name: r.name || 'Anonymous',
    email: r.email || '',
    amount: r.amount,
    currency: r.currency || 'KES',
    reference: r.reference,
    status: (r.status as 'success' | 'reversed') || 'success',
    createdAt: r.created_at,
  }));
}

export async function createDonation(donation: {
  id?: string;
  name?: string;
  email?: string;
  amount: number;
  currency?: string;
  reference: string;
  status?: 'success' | 'reversed';
}): Promise<boolean> {
  const id = donation.id || `don-${Date.now()}`;
  return executeD1(
    `INSERT INTO donations (id, name, email, amount, currency, reference, status)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      donation.name || 'Anonymous',
      donation.email || '',
      donation.amount,
      donation.currency || 'KES',
      donation.reference,
      donation.status || 'success',
    ]
  );
}

export async function updateDonationStatus(id: string, status: string): Promise<boolean> {
  return executeD1('UPDATE donations SET status = ? WHERE id = ?', [status, id]);
}

// =============================================================
// 3. MESSAGES (Contact Form Submissions)
// =============================================================

export async function getMessages(): Promise<ContactSubmission[]> {
  const rows = await queryD1('SELECT * FROM messages ORDER BY created_at DESC');
  return rows.map((r: any) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    subject: r.subject || '',
    message: r.message,
    submittedAt: r.created_at,
    read: r.status === 'read',
  }));
}

export async function createMessage(msg: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): Promise<boolean> {
  const id = `msg-${Date.now()}`;
  return executeD1(
    `INSERT INTO messages (id, name, email, phone, subject, message, status)
     VALUES (?, ?, ?, ?, ?, ?, 'unread')`,
    [id, msg.name, msg.email, msg.phone || '', msg.subject || '', msg.message]
  );
}

export async function markMessageRead(id: string, read: boolean): Promise<boolean> {
  return executeD1('UPDATE messages SET status = ? WHERE id = ?', [read ? 'read' : 'unread', id]);
}

export async function deleteMessage(id: string): Promise<boolean> {
  return executeD1('DELETE FROM messages WHERE id = ?', [id]);
}

// =============================================================
// 4. SUBSCRIBERS (Newsletter)
// =============================================================

export async function getSubscribers(): Promise<NewsletterSubscriber[]> {
  const rows = await queryD1('SELECT * FROM subscribers ORDER BY created_at DESC');
  return rows.map((r: any) => ({
    id: r.id,
    email: r.email,
    subscribedAt: r.created_at,
  }));
}

export async function createSubscriber(email: string): Promise<{ success: boolean; alreadyExists?: boolean }> {
  const existing = await queryD1('SELECT id FROM subscribers WHERE email = ? LIMIT 1', [email]);
  if (existing.length > 0) {
    return { success: false, alreadyExists: true };
  }

  const id = `sub-${Date.now()}`;
  const ok = await executeD1('INSERT INTO subscribers (id, email) VALUES (?, ?)', [id, email]);
  return { success: ok };
}

export async function deleteSubscriber(id: string): Promise<boolean> {
  return executeD1('DELETE FROM subscribers WHERE id = ?', [id]);
}

// =============================================================
// 5. OFFICIALS & LEADERSHIP
// =============================================================

export async function getOfficials(): Promise<Official[]> {
  const rows = await queryD1('SELECT * FROM officials ORDER BY order_index ASC');
  return rows.map((r: any) => ({
    id: r.id,
    name: r.name,
    role: r.role,
    imageUrl: r.image_url,
    imageHint: r.image_hint || '',
    order: r.order_index ?? 0,
  }));
}

export async function saveOfficial(official: {
  id?: string;
  name: string;
  role: string;
  imageUrl: string;
  imageHint?: string;
  order?: number;
}): Promise<boolean> {
  const id = official.id || `off-${Date.now()}`;
  return executeD1(
    `INSERT INTO officials (id, name, role, image_url, image_hint, order_index)
     VALUES (?, ?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET
       name = excluded.name,
       role = excluded.role,
       image_url = excluded.image_url,
       image_hint = excluded.image_hint,
       order_index = excluded.order_index`,
    [
      id,
      official.name,
      official.role,
      official.imageUrl,
      official.imageHint || '',
      official.order ?? 0,
    ]
  );
}

export async function deleteOfficial(id: string): Promise<boolean> {
  return executeD1('DELETE FROM officials WHERE id = ?', [id]);
}

// =============================================================
// 6. GALLERY IMAGES
// =============================================================

export async function getGalleryImages(): Promise<GalleryImageItem[]> {
  const rows = await queryD1('SELECT * FROM gallery ORDER BY created_at DESC');
  return rows.map((r: any) => ({
    id: r.id,
    src: r.image_url,
    alt: r.title,
    imageHint: r.image_hint || '',
    createdAt: r.created_at,
  }));
}

export async function saveGalleryImage(item: {
  id?: string;
  title: string;
  imageUrl: string;
  imageHint?: string;
  description?: string;
}): Promise<boolean> {
  const id = item.id || `gal-${Date.now()}`;
  return executeD1(
    `INSERT INTO gallery (id, title, image_url, image_hint, description)
     VALUES (?, ?, ?, ?, ?)`,
    [id, item.title, item.imageUrl, item.imageHint || '', item.description || '']
  );
}

export async function deleteGalleryImage(id: string): Promise<boolean> {
  return executeD1('DELETE FROM gallery WHERE id = ?', [id]);
}

// =============================================================
// 7. SITE SETTINGS
// =============================================================

export async function getSiteSettings(): Promise<SiteSettings> {
  const rows = await queryD1('SELECT value FROM settings WHERE key = ? LIMIT 1', ['site']);
  const defaults: SiteSettings = {
    contactEmail: 'teria.cbo@gmail.com',
    contactPhone1: '+254 795 185 979',
    contactPhone2: '+254 754 929 777',
    facebookUrl: 'https://facebook.com',
    instagramUrl: 'https://instagram.com',
    tiktokUrl: 'https://tiktok.com',
    twitterUrl: 'https://twitter.com',
    paystackPublicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
  };

  if (!rows || rows.length === 0) return defaults;

  try {
    const parsed = JSON.parse(rows[0].value);
    return { ...defaults, ...parsed };
  } catch {
    return defaults;
  }
}

export async function saveSiteSettings(settings: Partial<SiteSettings>): Promise<boolean> {
  const current = await getSiteSettings();
  const updated = { ...current, ...settings };
  const json = JSON.stringify(updated);

  return executeD1(
    `INSERT INTO settings (key, value) VALUES ('site', ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
    [json]
  );
}

// =============================================================
// 8. AUDIT LOGS
// =============================================================

export async function getAuditLogs(): Promise<AuditLogEntry[]> {
  const rows = await queryD1('SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 100');
  return rows.map((r: any) => ({
    id: r.id,
    action: r.action,
    user: r.user_email,
    details: r.details || '',
    timestamp: r.created_at,
  }));
}

export async function createAuditLog(action: string, userEmail: string, details = ''): Promise<boolean> {
  const id = `audit-${Date.now()}`;
  return executeD1(
    'INSERT INTO audit_logs (id, action, user_email, details) VALUES (?, ?, ?, ?)',
    [id, action, userEmail, details]
  );
}

// =============================================================
// 9. ADMIN USERS
// =============================================================

export async function getUsers(): Promise<AdminUser[]> {
  const rows = await queryD1('SELECT id, email, name, role FROM users ORDER BY created_at ASC');
  return rows.map((r: any) => ({
    id: r.id,
    email: r.email,
    name: r.name,
    role: r.role || 'admin',
  }));
}

export async function getUserByEmail(email: string): Promise<(AdminUser & { password_hash: string }) | null> {
  const rows = await queryD1('SELECT * FROM users WHERE LOWER(email) = LOWER(?) LIMIT 1', [email]);
  if (!rows || rows.length === 0) return null;
  const r = rows[0];
  return {
    id: r.id,
    email: r.email,
    name: r.name,
    role: r.role || 'admin',
    password_hash: r.password_hash,
  };
}

export async function createUser(user: {
  id?: string;
  email: string;
  name: string;
  role?: string;
  password_hash: string;
}): Promise<AdminUser> {
  const id = user.id || `user-${Date.now()}`;
  await executeD1(
    'INSERT INTO users (id, email, password_hash, name, role) VALUES (?, ?, ?, ?, ?)',
    [id, user.email.toLowerCase(), user.password_hash, user.name, user.role || 'admin']
  );
  return {
    id,
    email: user.email.toLowerCase(),
    name: user.name,
    role: user.role || 'admin',
  };
}

export async function updateUserPassword(email: string, password_hash: string): Promise<boolean> {
  return executeD1('UPDATE users SET password_hash = ? WHERE LOWER(email) = LOWER(?)', [
    password_hash,
    email,
  ]);
}

export async function deleteUser(id: string): Promise<boolean> {
  return executeD1('DELETE FROM users WHERE id = ?', [id]);
}
