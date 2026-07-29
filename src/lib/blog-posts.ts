// src/lib/blog-posts.ts
// This file contains the initial blog posts to be seeded into Firestore.
// After seeding, the application will fetch blog posts from the database, not this file.

import type { BlogPostTeaserItem } from '@/types';

// We omit the `id` property as Firestore will generate it automatically.
export const blogPostsToSeed: Omit<BlogPostTeaserItem, 'id'>[] = [
   {
    slug: 'wash-initiative-brings-clean-water',
    category: 'WASH',
    imageUrl: '/homeimages/focus areas/WASH.jpg',
    imageHint: 'clean water community',
    title: 'TERIA’s WASH Initiative: Bringing Clean Water and Hope to Communities',
    summary: 'Access to clean water is life-changing. TERIA’s “Water is Life” initiative is tackling water scarcity by constructing boreholes, transforming daily life for hundreds of families and students in Rarieda.',
    fullContent: `**Clean water is not a luxury; it is a fundamental human right.** For many communities in Rarieda, the daily struggle to find and fetch clean water is a significant barrier to health, education, and economic stability. TERIA's Water, Sanitation, and Hygiene (WASH) program, under the “Water is Life” initiative, is committed to changing this reality.

### A Community Transformed
Recently, our team successfully drilled and constructed a new borehole, bringing a reliable source of clean and safe water to a community that has long faced scarcity. The joy and relief on the faces of residents—from young children to the elderly—was a powerful reminder of the profound impact of this essential resource.

This borehole means:
*   **Reduced Illness:** A significant decrease in waterborne diseases like cholera and typhoid.
*   **More Time for Education:** Children, especially girls, who once spent hours fetching water, can now dedicate that time to their studies.
*   **Economic Empowerment:** Women can use their time for income-generating activities instead of the arduous task of water collection.
*   **Improved Hygiene:** Better sanitation practices are now possible, further safeguarding community health.

### Our Commitment to WASH
TERIA has now constructed **four boreholes** across the region, each one a beacon of hope and a step towards a healthier future. We work closely with local communities to ensure the long-term sustainability of these projects. Our WASH initiatives also include hygiene education and the construction of safe sanitation facilities in schools and public spaces.

We believe that by providing access to clean water, we are not just quenching thirst—we are unlocking potential and empowering entire communities to thrive.`,
    date: '2023-11-10',
    galleryImages: [
      { src: '/homeimages/focus areas/WASH.jpg', alt: 'Community members at the new borehole', imageHint: 'community water' },
      { src: '/homeimages/IMG-20250618-WA0013 (1).jpg', alt: 'Children drinking clean water', imageHint: 'children water' },
      { src: '/homeimages/IMG-20250618-WA0064 (1).jpg', alt: 'Water pump installation', imageHint: 'water pump' },
    ]
  },
  {
    slug: 'international-widows-day-2025-honoring-resilience',
    category: 'Advocacy',
    imageUrl: '/1750874946133.jpg',
    imageHint: 'advocacy event group',
    title: 'International Widows Day 2025: Honoring Resilience and Advocating for Justice',
    summary: 'TERIA joined leaders and advocates in Kaloleni, Kilifi County, and held a parallel event in Rarieda to commemorate International Widows Day, highlighting resilience and calling for stronger support systems.',
    fullContent: `**On June 23rd, 2025, TERIA Founder Kohanya Linet**, alongside her spouse **Hon. Otiende Amollo** and other distinguished leaders, gathered in Kaloleni, Kilifi County, to mark International Widows Day. Themed “Respect, Dignity, and Justice for Widows,” the event served as both a celebration and a call to action for widows across Kenya and beyond.

Concurrently, another commemoration took place in Rarieda Constituency at Rageng'ni Resource Centre in North Uyoma, where widows marched to the venue as they celebrated the day, amplifying the call for their rights and recognition.

### A Unified Call for Justice
The events, one organized by the **Cometogether Widows and Orphans Organization** in Kilifi and the other by local partners in Rarieda, brought together influential voices and advocates. The powerful testimonies shared underscored that widows deserve more than sympathy—they deserve recognition, protection, and equal opportunities. Their stories of resilience are a testament to their strength, yet they continue to face systemic barriers.

TERIA and its partners used this platform to reaffirm the urgent need for comprehensive legal frameworks to address widow-based violence, discrimination, and economic marginalization. We advocate for the strengthening of support systems that empower widow-led families, ensuring they can thrive with dignity and justice.`,
    date: '2025-06-23',
    galleryImages: [
      { src: '/IMG-20250625-WA0035.jpg', alt: 'International Widows Day Gallery Image 1', imageHint: 'community event' },
      { src: '/IMG-20250625-WA0033.jpg', alt: 'International Widows Day Gallery Image 2', imageHint: 'community gathering' },
      { src: '/IMG-20250625-WA0032.jpg', alt: 'International Widows Day Gallery Image 3', imageHint: 'advocacy event' },
      { src: '/IMG-20250625-WA0015.jpg', alt: 'International Widows Day Gallery Image 4', imageHint: 'group photo' },
      { src: '/1750874962797.jpg', alt: 'International Widows Day Gallery Image 5', imageHint: 'event speakers' },
      { src: '/1750874952454.jpg', alt: 'International Widows Day Gallery Image 6', imageHint: 'community support' },
      { src: '/1750874946133.jpg', alt: 'International Widows Day Gallery Image 7', imageHint: 'honoring resilience' },
    ]
  },
  {
    slug: 'free-medical-camp-chianda',
    category: 'Community Stories',
    imageUrl: '/homeimages/2.jpeg',
    imageHint: 'medical event',
    title: 'Free Medical Camp Brings Hope and Health to Chianda Community',
    summary: 'TERIA, in collaboration with multiple partners, hosted a successful free medical camp at Chianda Community Hospital, providing vital healthcare services, distributing sanitary pads, and offering nutritious meals to attendees.',
    fullContent: `Chianda, Siaya County —
Last weekend, Chianda Community Hospital was buzzing with activity as a free medical camp brought essential healthcare services directly to the heart of the community. The event was a collaborative effort, highlighting the power of partnerships in advancing community health.

### A United Front for Community Well-being

The success of the medical camp was made possible by a strong network of partners. TERIA (The Empowerment, Relief and Inclusion Agenda) joined hands with:

* Chianda Community Development Group
* Anaweza Afya
* LUPAN Health
* Impact Kenya Initiative
* Matibabu Foundation
* MoH Siaya County
* Optimum Life Choices

Together, these organizations pooled resources, medical expertise, and community mobilization to deliver a well-rounded and impactful event.

### Impactful Services and Community Support

Hundreds of community members benefited from a wide range of free medical services, including consultations and basic treatments. But the impact extended beyond just healthcare:

* Free sanitary pads were distributed to women and girls, promoting menstrual health and dignity.
* Nutritious lunch packs were offered to all attendees, ensuring everyone remained nourished throughout the day.

A heartfelt appreciation goes to the volunteer medical team whose expertise, passion, and commitment made a lasting impact on every individual served.

### The Power of Community Collaboration

This event stood as a beautiful reminder of a powerful truth:

"One of the marvelous things about community is that it enables us to welcome and help people in a way we couldn’t as individuals."

The Chianda medical camp is a shining example of what can happen when communities unite — delivering not only healthcare, but also hope, dignity, and resilience.`,
    date: '2023-08-03',
    galleryImages: [
      { src: '/homeimages/IMG-20250618-WA0072 (1).jpg', alt: 'Gallery Image 1 for Medical Camp', imageHint: 'medical event' },
      { src: '/homeimages/IMG-20250618-WA0077 (1).jpg', alt: 'Gallery Image 2 for Medical Camp', imageHint: 'community health' },
      { src: '/homeimages/IMG-20250618-WA0078 (1).jpg', alt: 'Gallery Image 3 for Medical Camp', imageHint: 'healthcare support' },
      { src: '/homeimages/IMG-20250618-WA0083 (1).jpg', alt: 'Gallery Image 4 for Medical Camp', imageHint: 'community gathering' },
      { src: '/homeimages/IMG-20250618-WA0084 (1).jpg', alt: 'Gallery Image 5 for Medical Camp', imageHint: 'medical supplies' },
      { src: '/homeimages/IMG-20250618-WA0085 (1).jpg', alt: 'Gallery Image 6 for Medical Camp', imageHint: 'happy faces' },
      { src: '/homeimages/IMG-20250618-WA0086 (1).jpg', alt: 'Gallery Image 7 for Medical Camp', imageHint: 'TERIA team' },
      { src: '/homeimages/IMG-20250618-WA0087 (1).jpg', alt: 'Gallery Image 8 for Medical Camp', imageHint: 'medical checkup' },
      { src: '/homeimages/IMG-20250618-WA0089 (1).jpg', alt: 'Gallery Image 9 for Medical Camp', imageHint: 'volunteers' },
      { src: '/homeimages/IMG-20250618-WA0090 (1).jpg', alt: 'Gallery Image 10 for Medical Camp', imageHint: 'patient care' },
      { src: '/homeimages/IMG-20250618-WA0095 (1).jpg', alt: 'Gallery Image 11 for Medical Camp', imageHint: 'community support' },
    ]
  },
  {
    slug: 'empowering-girls-boys-mhday-2023-rarieda',
    category: 'MHHM',
    imageUrl: '/homeimages/15.jpeg', 
    imageHint: 'community event TERIA',
    title: 'Empowering Girls and Boys: TERIA Commemorates Menstrual Hygiene Day 2023 in Rarieda',
    summary: 'TERIA proudly commemorated Menstrual Hygiene Day 2023 at Rageng’ni Girls High School, engaging students in education, empowerment, and distributing essential hygiene products, while also securing commitments for period-friendly facilities.',
    fullContent: `On May 28th, 2023, TERIA proudly commemorated Menstrual Hygiene Day with an impactful and vibrant event held at Rageng’ni Girls High School. Organized under the Rarieda Girl Power Initiative, the event aimed to raise awareness about menstrual health and hygiene while working to eliminate the stigma often associated with menstruation.

### A Day of Education, Empowerment, and Care

The event brought together students, teachers, and community leaders for a day full of meaningful engagement. Both girls and boys actively participated in sessions designed to inform and empower. Throughout the day, students were entertained through interactive activities, educated on important menstrual health topics, and motivated to challenge stigma in their communities.

In addition to learning, attendees received essential supplies including sanitary pads, panties, soaps, and boys’ boxer shorts. Everyone also enjoyed nourishing meals, ensuring that participants were comfortable, energized, and able to fully engage with the day’s activities.

At TERIA, we remain deeply committed to ending period stigma, period shame, and period poverty. We continue to work toward a future where every girl can stay in school, thrive with dignity, and reach her full potential.

### School Leadership Commits to Action

A major outcome of the event was the commitment by school leadership to construct period-friendly toilets across participating institutions. These facilities will provide students, particularly girls, with the safe, private, and hygienic spaces they need to manage menstruation confidently while remaining in school.

### Gratitude for a United Community

This important event would not have been possible without the support and participation of many individuals and institutions. TERIA extends heartfelt thanks to:

* Kandaria Mixed Secondary School, Nyakongo Girls High School, Achieng Oneko Mixed Secondary School, and Rageng’ni Girls High School for their collaboration and student involvement
* Hon. Lady Salome Ayany-Atandi, NALSA-K representative and spouse of the MP for Alego Usonga Constituency, for gracing the occasion
* Hon. Lady Electina Wasike-Wanyonyi, NALSA-K Chair and spouse of the MP for Westlands Constituency, and her delegation
* Hon. Dr. Otiende Amollo for his generous and ongoing support
* Siaya County leadership, including Senator Dr. Oburu Oginga, Women Representative Dr. Christine Ombaka, CECM Education, Youth and Gender Prof. Edgar Otumba, and CECM Ms. Grace Agola
* ACK Bondo Diocese Mothers Union, led by President Mrs. Jenipher Kodia
* Representatives from the Ministries of Education and Health
* Youth speaker Myra Oloo, Lady Amondi Nyar Adero, and Sir Obenge Philemon
* All our well-wishers, partners, community members, and friends who supported the event in one way or another

Above all, TERIA is grateful to God for the success of this event and the strength to continue driving change. Together, we are building a future where every child can grow, learn, and lead—free from stigma and full of hope.`,
    date: '2023-05-28',
    galleryImages: [ 
      { src: '/homeimages/18.jpeg', alt: 'MHDay Event Gallery Image 1', imageHint: 'students event' },
      { src: '/homeimages/17.jpeg', alt: 'MHDay Event Gallery Image 2', imageHint: 'community gathering' },
      { src: '/homeimages/16.jpeg', alt: 'MHDay Event Gallery Image 3', imageHint: 'empowerment session' },
      { src: '/homeimages/14.jpeg', alt: 'MHDay Event Gallery Image 4', imageHint: 'hygiene products' },
      { src: '/homeimages/13.jpeg', alt: 'MHDay Event Gallery Image 5', imageHint: 'TERIA team action' },
      { src: '/homeimages/12.jpeg', alt: 'MHDay Event Gallery Image 6', imageHint: 'happy students' },
      { src: '/homeimages/11.jpeg', alt: 'MHDay Event Gallery Image 7', imageHint: 'school event' },
      { src: '/homeimages/10.jpeg', alt: 'MHDay Event Gallery Image 8', imageHint: 'event speakers' },
      { src: '/homeimages/9.jpeg', alt: 'MHDay Event Gallery Image 9', imageHint: 'group photo' },
      { src: '/homeimages/1750269449138 (1).jpg', alt: 'MHDay Event Gallery Image 10', imageHint: 'community engagement' },
    ]
  },
  {
    slug: 'empowering-preteens-period-education-period-party-kenya',
    category: 'MHHM',
    imageUrl: '/homeimages/period party.jpg',
    imageHint: 'event education',
    title: 'Period Party Kenya: Celebrating Young Girls with Knowledge and Confidence',
    summary: 'TERIA participated in the Period Party Kenya event, empowering preteen girls aged 9–12 with menstrual health education in a fun and supportive environment.',
    fullContent: `On May 6th, 2023, the vibrant grounds of Waterfront Gardens – Ngong Racecourse played host to a powerful and joyful event — the Period Party Kenya. Tailored specifically for preteen girls aged 9–12, this unique gathering provided a safe, fun, and empowering space for young girls to learn, grow, and celebrate their transition into womanhood.

### Creating Safe Spaces for Menstrual Health Education

TERIA, committed to advancing the health and dignity of girls and women, proudly took part in this impactful initiative. The event was designed to demystify menstruation through open dialogue, education, and celebration. With the goal of combating stigma and misinformation around periods, the Period Party created a warm environment where girls could learn the facts and feel supported.

### A Day of Learning, Fun, and Empowerment

Running from 10am to 4pm, the event featured:

* Interactive menstrual health education sessions tailored to the needs and understanding of preteen girls
* Engaging activities that helped normalize conversations around menstruation in a supportive community
* Free sanitary products and giveaways to equip participants with the essentials and confidence to manage their periods with dignity
* Fun entertainment, games, and bonding opportunities that made the day memorable and meaningful

### Collaboration for Impact

The Period Party Kenya was a collaborative effort, made possible through support from numerous organizations including:
RFH Healthcare, Taifa Unga, Sunrice, My Flow Foundation, Redleaf Healthcare, John Charles Foundation, SBS Schools, MKB Marketing, V-Spa, Tagma, and NIA Kenya.

As one of the event partners, TERIA continues to champion menstrual equity through advocacy, distribution of menstrual health products, and targeted community outreach initiatives.

### Why It Matters

Events like the Period Party are essential in advancing menstrual justice, reducing shame, and promoting self-esteem among young girls. TERIA remains steadfast in its mission to support marginalized communities, particularly in fostering informed, confident, and empowered girls across Kenya.`,
    date: '2023-05-06'
  }
];
