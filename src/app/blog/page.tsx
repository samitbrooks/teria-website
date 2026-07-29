// src/app/blog/page.tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Search, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import type { BlogPostTeaserItem } from '@/types';

const BlogPage = () => {
  const [allBlogPosts, setAllBlogPosts] = useState<BlogPostTeaserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'blogPosts'), (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPostTeaserItem));
      postsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setAllBlogPosts(postsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const allCategories = useMemo(() => {
    if (loading) return ['All'];
    const categories = new Set(allBlogPosts.map(post => post.category));
    return ['All', ...Array.from(categories)];
  }, [allBlogPosts, loading]);

  const filteredPosts = useMemo(() => {
    return allBlogPosts
      .filter(post => {
        if (selectedCategory === 'All') return true;
        return post.category === selectedCategory;
      })
      .filter(post => {
        if (!searchQuery) return true;
        const postContent = `${post.title.toLowerCase()} ${post.summary.toLowerCase()}`;
        return postContent.includes(searchQuery.toLowerCase());
      });
  }, [searchQuery, selectedCategory, allBlogPosts]);

  return (
    <div>
      {/* Page Header */}
      <section className="bg-primary/10 py-16 sm:py-20" data-aos="fade-in">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold font-headline text-primary">TERIA Blog</h1>
          <p className="mt-4 text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
            Insights, stories, and updates from our work on the ground.
          </p>
        </div>
      </section>

      {/* Main Blog Content Area */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Blog Posts Grid */}
            <div className="lg:col-span-8">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
              ) : filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {filteredPosts.map((post, index) => (
                    <Card
                      key={post.id}
                      className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300 ease-in-out"
                      data-aos="fade-up"
                      data-aos-delay={(index % 2 * 100).toString()}
                    >
                      <CardHeader className="p-0">
                         <Link href={`/blog/${post.slug}`} aria-label={`Read more about ${post.title}`}>
                          <Image
                            src={post.imageUrl}
                            alt={post.title}
                            width={600}
                            height={350}
                            className="w-full h-48 sm:h-56 object-cover"
                            data-ai-hint={post.imageHint}
                          />
                        </Link>
                      </CardHeader>
                      <CardContent className="flex-grow p-5 space-y-3">
                        <p className="text-xs text-muted-foreground">{format(new Date(post.date), 'MMMM d, yyyy')}</p>
                        <CardTitle className="font-headline text-lg text-primary">
                           <Link href={`/blog/${post.slug}`} className="hover:text-primary/80 transition-colors link-underline">{post.title}</Link>
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
              ) : (
                <div className="text-center py-16" data-aos="fade-up">
                  <h3 className="text-2xl font-semibold text-primary mb-2">No Posts Found</h3>
                  <p className="text-foreground/70">Try adjusting your search or category selection.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 mt-12 lg:mt-0" data-aos="fade-left" data-aos-delay="200">
              <div className="sticky top-24 space-y-8">
                {/* Search Bar */}
                <div>
                  <h3 className="text-xl font-semibold font-headline text-primary mb-3">Search Blog</h3>
                  <div className="relative">
                    <Input 
                      type="search" 
                      placeholder="Search articles..." 
                      className="pr-10" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="text-xl font-semibold font-headline text-primary mb-3">Categories</h3>
                  <ul className="space-y-2">
                    {allCategories.map((category) => (
                      <li key={category}>
                        <Button 
                          variant="link" 
                          onClick={() => setSelectedCategory(category)}
                          className={cn(
                            "text-foreground/70 hover:text-primary p-0 h-auto font-normal link-underline",
                            selectedCategory === category && "text-primary font-bold"
                          )}
                        >
                          {category}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recent Posts */}
                <div>
                  <h3 className="text-xl font-semibold font-headline text-primary mb-3">Recent Posts</h3>
                  <ul className="space-y-3">
                    {allBlogPosts.slice(0, 3).map((post) => (
                      <li key={`recent-${post.id}`}>
                        <Button variant="link" asChild className="text-foreground/70 hover:text-primary p-0 h-auto font-normal text-left leading-tight link-underline">
                           <Link href={`/blog/${post.slug}`} className="text-sm block">{post.title}</Link>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
