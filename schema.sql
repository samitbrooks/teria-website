-- Schema for TERIA Website Cloudflare D1 Database (teria-db)

-- 1. Admin Users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Blog Posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL,
    image_hint TEXT,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    full_content TEXT NOT NULL,
    date TEXT NOT NULL,
    gallery_images TEXT, -- JSON array of gallery images
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Donations table
CREATE TABLE IF NOT EXISTS donations (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT,
    amount INTEGER NOT NULL,
    currency TEXT DEFAULT 'KES',
    reference TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'success',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. Contact Form Messages table
CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 5. Newsletter Subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 6. Leadership & Officials table
CREATE TABLE IF NOT EXISTS officials (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    bio TEXT,
    image_url TEXT,
    image_hint TEXT,
    order_index INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 7. Photo Gallery table
CREATE TABLE IF NOT EXISTS gallery (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    image_hint TEXT,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 8. Site Settings table (Key-Value)
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);

-- 9. Audit Logs table
CREATE TABLE IF NOT EXISTS audit_logs (
    id TEXT PRIMARY KEY,
    action TEXT NOT NULL,
    user_email TEXT NOT NULL,
    details TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Initial Blog Posts Seed
INSERT OR IGNORE INTO blog_posts (id, slug, category, image_url, image_hint, title, summary, full_content, date, gallery_images) VALUES 
(
  'post-1',
  'wash-initiative-brings-clean-water',
  'WASH',
  '/homeimages/focus-areas/WASH.jpg',
  'clean water community',
  'TERIA’s WASH Initiative: Bringing Clean Water and Hope to Communities',
  'Access to clean water is life-changing. TERIA’s “Water is Life” initiative is tackling water scarcity by constructing boreholes, transforming daily life for hundreds of families and students in Rarieda.',
  '**Clean water is not a luxury; it is a fundamental human right.** For many communities in Rarieda, the daily struggle to find and fetch clean water is a significant barrier to health, education, and economic stability. TERIA''s Water, Sanitation, and Hygiene (WASH) program, under the “Water is Life” initiative, is committed to changing this reality.

### A Community Transformed
Recently, our team successfully drilled and constructed a new borehole, bringing a reliable source of clean and safe water to a community that has long faced scarcity. The joy and relief on the faces of residents—from young children to the elderly—was a powerful reminder of the profound impact of this essential resource.

This borehole means:
* **Reduced Illness:** A significant decrease in waterborne diseases like cholera and typhoid.
* **More Time for Education:** Children, especially girls, who once spent hours fetching water, can now dedicate that time to their studies.
* **Economic Empowerment:** Women can use their time for income-generating activities instead of the arduous task of water collection.
* **Improved Hygiene:** Better sanitation practices are now possible, further safeguarding community health.

### Our Commitment to WASH
TERIA has now constructed **four boreholes** across the region, each one a beacon of hope and a step towards a healthier future. We work closely with local communities to ensure the long-term sustainability of these projects. Our WASH initiatives also include hygiene education and the construction of safe sanitation facilities in schools and public spaces.

We believe that by providing access to clean water, we are not just quenching thirst—we are unlocking potential and empowering entire communities to thrive.',
  '2023-11-10',
  '[{"src":"/homeimages/focus-areas/WASH.jpg","alt":"Community members at the new borehole","imageHint":"community water"},{"src":"/gallery-of-moments/IMG-20250618-WA0013-1.jpg","alt":"Children drinking clean water","imageHint":"children water"},{"src":"/gallery-of-moments/IMG-20250618-WA0064-1.jpg","alt":"Water pump installation","imageHint":"water pump"}]'
),
(
  'post-2',
  'international-widows-day-2025-honoring-resilience',
  'Advocacy',
  '/1750874946133.jpg',
  'advocacy event group',
  'International Widows Day 2025: Honoring Resilience and Advocating for Justice',
  'TERIA joined leaders and advocates in Kaloleni, Kilifi County, and held a parallel event in Rarieda to commemorate International Widows Day, highlighting resilience and calling for stronger support systems.',
  '**On June 23rd, 2025, TERIA Founder Kohanya Linet**, alongside her spouse **Hon. Otiende Amollo** and other distinguished leaders, gathered in Kaloleni, Kilifi County, to mark International Widows Day. Themed “Respect, Dignity, and Justice for Widows,” the event served as both a celebration and a call to action for widows across Kenya and beyond.

Concurrently, another commemoration took place in Rarieda Constituency at Rageng''ni Resource Centre in North Uyoma, where widows marched to the venue as they celebrated the day, amplifying the call for their rights and recognition.

### A Unified Call for Justice
The events, one organized by the **Cometogether Widows and Orphans Organization** in Kilifi and the other by local partners in Rarieda, brought together influential voices and advocates. The powerful testimonies shared underscored that widows deserve more than sympathy—they deserve recognition, protection, and equal opportunities. Their stories of resilience are a testament to their strength, yet they continue to face systemic barriers.

TERIA and its partners used this platform to reaffirm the urgent need for comprehensive legal frameworks to address widow-based violence, discrimination, and economic marginalization. We advocate for the strengthening of support systems that empower widow-led families, ensuring they can thrive with dignity and justice.',
  '2025-06-23',
  '[{"src":"/IMG-20250625-WA0035.jpg","alt":"International Widows Day Gallery Image 1","imageHint":"community event"},{"src":"/IMG-20250625-WA0033.jpg","alt":"International Widows Day Gallery Image 2","imageHint":"community gathering"},{"src":"/IMG-20250625-WA0032.jpg","alt":"International Widows Day Gallery Image 3","imageHint":"advocacy event"},{"src":"/IMG-20250625-WA0015.jpg","alt":"International Widows Day Gallery Image 4","imageHint":"group photo"}]'
),
(
  'post-3',
  'chianda-medical-camp-brings-hope',
  'Health',
  '/homeimages/1.jpeg',
  'medical camp event',
  'Free Medical Camp Brings Hope and Health to Chianda Community',
  'TERIA, in collaboration with multiple partners, hosted a successful free medical camp at Chianda Community Hospital, providing vital healthcare services to hundreds of residents in Rarieda.',
  '**Healthcare is not just a service — it is dignity, relief, and hope.** On August 3rd, 2023, the grounds of Chianda Community Hospital in Rarieda were transformed into a sanctuary of healing as TERIA, alongside compassionate partners, hosted a transformative Free Medical Camp for the community.',
  '2023-08-03',
  '[{"src":"/homeimages/IMG-20250618-WA0072-1.jpg","alt":"Gallery Image 1 for Medical Camp","imageHint":"medical event"},{"src":"/homeimages/IMG-20250618-WA0077-1.jpg","alt":"Gallery Image 2 for Medical Camp","imageHint":"community health"}]'
);
