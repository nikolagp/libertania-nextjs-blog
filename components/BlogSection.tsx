'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';
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
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="container space-y-8 max-w-7xl mx-auto px-4">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight font-cormorantGaramond text-gray-900 dark:text-white">
            Libertania Blog
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-poppins">
            Stay updated with our latest articles, stories, and insights about
            liberty and freedom.
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-2 md:gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-colors font-poppins',
                  activeCategory === category.id
                    ? 'bg-amber-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100'
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link href={`/${post.id}`} key={post.id} className="group">
              <div className=" overflow-hidden transition-all duration-200 hover:shadow-lg">
                <div className="p-5 space-y-2">
                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 font-poppins">
                    <span className="capitalize">{post.category}</span>
                    <span className="mx-2">•</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="font-bold text-xl group-hover:text-amber-700 transition-colors font-cormorantGaramond text-gray-900 dark:text-white">
                    {post.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
