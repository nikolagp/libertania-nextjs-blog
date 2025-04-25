'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { ArticleItem } from '@/types';

interface Props {
  articles: Record<string, ArticleItem[]>;
}

export default function BlogSection({ articles }: Props) {
  const categories = [
    { id: 'all', name: 'All' },
    ...Object.keys(articles).map((category) => ({
      id: category,
      name: category,
    })),
  ];

  const [activeCategory, setActiveCategory] = useState('all');

  const allPosts = Object.values(articles).flat();
  const filteredPosts =
    activeCategory === 'all'
      ? allPosts
      : allPosts.filter((post) => post.category === activeCategory);

  return (
    <section className="py-12 bg-muted/50">
      <div className="container space-y-8">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight font-cormorantGaramond">
            Libertania Blog
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-poppins">
            Stay updated with our latest articles, stories, and insights about
            liberty and freedom.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-colors font-poppins',
                activeCategory === category.id
                  ? 'bg-amber-700 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link href={`/${post.id}`} key={post.id} className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-200 hover:shadow-lg">
                {/* {post.coverImage && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={`/images/${post.coverImage}`}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )} */}
                <div className="p-5 space-y-2">
                  <div className="flex items-center text-xs text-gray-600 font-poppins">
                    <span className="capitalize">{post.category}</span>
                    <span className="mx-2">•</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="font-bold text-xl group-hover:text-amber-700 transition-colors font-cormorantGaramond">
                    {post.title}
                  </h3>
                  <div className="pt-2">
                    <span className="text-sm font-medium text-amber-700 inline-flex items-center font-poppins">
                      Read more
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-1 h-4 w-4"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
