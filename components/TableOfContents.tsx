'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TableItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TableItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Add IDs to headings that don't have them
    const article = document.querySelector('.prose');
    if (!article) return;

    const elements = Array.from(article.querySelectorAll('h2, h3'));
    elements.forEach((element) => {
      if (!element.id) {
        element.id =
          element.textContent
            ?.toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '') || '';
      }
    });

    // Get all headings
    const items: TableItem[] = elements.map((element) => ({
      id: element.id,
      text: element.textContent || '',
      level: Number(element.tagName.charAt(1)),
    }));

    setHeadings(items);

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0% -66%',
        threshold: 1.0,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Table of contents"
      className="w-full bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4"
    >
      <h2 className="text-lg font-bold mb-4 font-cormorantGaramond text-gray-900 dark:text-white">
        Table of Contents
      </h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={cn(
              'transition-colors',
              heading.level === 2 ? 'ml-0' : 'ml-4'
            )}
          >
            <a
              href={`#${heading.id}`}
              className={cn(
                'text-sm hover:text-amber-700 dark:hover:text-amber-500 font-poppins block py-1',
                activeId === heading.id
                  ? 'text-amber-700 dark:text-amber-500'
                  : 'text-gray-600 dark:text-gray-400'
              )}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(`#${heading.id}`)?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
