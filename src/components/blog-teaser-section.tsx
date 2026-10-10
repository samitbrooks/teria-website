// src/components/blog-teaser-section.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { sanitizeImageUrl } from '@/lib/utils';
import type { BlogPostTeaserItem } from '@/types';
import { format } from 'date-fns';

const BlogTeaserSection = () => {
  const [blogPostsForTeaser, setBlogPostsForTeaser] = useState<BlogPostTeaserItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/posts?limit=3')
      .then(res => res.json())
      .then(data => {
        if (isMounted && data.success && Array.isArray(data.posts)) {
          setBlogPostsForTeaser(data.posts);
        }
      })
      .catch(err => console.error('Error fetching teaser posts:', err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-primary mb-3">Latest News & Stories</h2>
          <p className="text-base sm:text-lg text-foreground/80 max-w-2xl mx-auto">
            Stay updated with our latest activities, achievements, and insights from the field.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogPostsForTeaser.map((post, index) => (
              <Card
                key={post.id}
                className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300 ease-in-out"
                data-aos="fade-up"
                data-aos-delay={(index * 100).toString()}
              >
                <CardHeader className="p-0">
                  <Link href={`/blog/${post.slug}`} aria-label={`Read more about ${post.title}`}>
                    <Image
                      src={sanitizeImageUrl(post.imageUrl)}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover"
                      data-ai-hint={post.imageHint}
                    />
                  </Link>
                </CardHeader>
                <CardContent className="flex-grow p-5 space-y-3">
                  <p className="text-xs text-muted-foreground">{format(new Date(post.date), 'MMMM d, yyyy')}</p>
                  <CardTitle className="font-headline text-lg text-primary">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary/80 transition-colors link-underline">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <p className="text-sm text-foreground/70 line-clamp-3">{post.summary}</p>
                </CardContent>
                <CardFooter className="p-5 pt-0">
                  <Button variant="link" asChild className="text-accent p-0 h-auto link-underline">
                    <Link href={`/blog/${post.slug}`} aria-label={`Read more about ${post.title}`}>
                      Read More <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-10 sm:mt-12" data-aos="fade-up">
          <Button
            size="lg"
            asChild
            className="bg-tertiary hover:bg-tertiary/90 text-tertiary-foreground hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <Link href="/blog">View All Posts</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogTeaserSection;
