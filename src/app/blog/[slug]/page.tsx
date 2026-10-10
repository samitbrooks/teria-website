import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BlogImageCarousel from '@/components/blog-image-carousel';
import { sanitizeImageUrl } from '@/lib/utils';
import { format } from 'date-fns';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/d1';
import type { BlogPostTeaserItem } from '@/types';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts();
    return posts.map(post => ({ slug: post.slug }));
  } catch (e) {
    console.log('Error generating static params for blog:', e);
    return [];
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const siteUrl = 'https://teriacbo.org';
  const imageUrl = post.imageUrl.startsWith('http') ? post.imageUrl : `${siteUrl}${post.imageUrl}`;

  return {
    title: `${post.title} | TERIA Blog`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `${siteUrl}/blog/${post.slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      authors: ['TERIA'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [imageUrl],
    },
  };
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const renderContent = (content: string) => {
    const blocks = content.split(/\\n\\s*\\n/);

    return blocks.map((block, index) => {
      const trimmedBlock = block.trim();

      if (trimmedBlock.startsWith('### ')) {
        const headingText = trimmedBlock.substring(4);
        return (
          <h3 key={index} className="text-2xl font-semibold font-headline text-primary mt-6 mb-3">
            {headingText}
          </h3>
        );
      }

      if (trimmedBlock.startsWith('* ')) {
        const listItems = trimmedBlock.split('\n').map(item => item.trim().substring(2));
        return (
          <ul key={index} className="list-disc list-inside space-y-2 my-4 pl-4">
            {listItems.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        );
      }

      const parts = trimmedBlock.split(/(\*\*.*?\*\*)/g).filter(part => part);
      return (
        <p key={index}>
          {parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={i}>{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  const blogPostSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    image: post.imageUrl.startsWith('http') ? post.imageUrl : `https://teriacbo.org${post.imageUrl}`,
    author: {
      '@type': 'Organization',
      name: 'TERIA',
      url: 'https://teriacbo.org',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TERIA',
      logo: {
        '@type': 'ImageObject',
        url: 'https://teriacbo.org/Logo.png',
      },
    },
    datePublished: new Date(post.date).toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://teriacbo.org/blog/${post.slug}`,
    },
  };

  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <article className="max-w-3xl mx-auto" data-aos="fade-up">
          <header className="mb-8">
            <Button variant="outline" asChild className="mb-6 hover:scale-105 transition-transform duration-200">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-headline text-primary mb-3">
              {post.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              Published on <time dateTime={new Date(post.date).toISOString()}>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
            </p>
          </header>

          {post.imageUrl && (
            <div className="mb-8 overflow-hidden rounded-lg shadow-lg">
              <Image
                src={sanitizeImageUrl(post.imageUrl)}
                alt={post.title}
                width={800}
                height={450}
                className="w-full h-auto object-contain"
                data-ai-hint={post.imageHint}
                priority
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none text-foreground/80 text-lg space-y-4">
            {renderContent(post.fullContent)}
          </div>

          {post.galleryImages && post.galleryImages.length > 0 && (
            <BlogImageCarousel
              images={post.galleryImages.map((img) => ({
                ...img,
                src: sanitizeImageUrl(img.src),
              }))}
            />
          )}
        </article>

        <section className="mt-16 pt-8 border-t border-border" data-aos="fade-up" data-aos-delay="200">
          <h2 className="text-2xl font-bold font-headline text-primary mb-6 text-center">More From TERIA</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300 ease-in-out">
              <CardHeader>
                <CardTitle className="font-headline text-xl text-primary">Explore Our Focus Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/70 mb-4">Learn more about the key areas TERIA is making an impact in.</p>
                <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105 transition-transform duration-200">
                  <Link href="/focus-areas">Our Focus Areas</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300 ease-in-out">
              <CardHeader>
                <CardTitle className="font-headline text-xl text-primary">Get Involved</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/70 mb-4">Discover how you can support TERIA's mission and initiatives.</p>
                <Button asChild className="bg-tertiary text-tertiary-foreground hover:bg-tertiary/90 hover:scale-105 transition-transform duration-200">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogPostPage;
