import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import type { ArticleItem } from '@/types';

interface RelatedPostsProps {
  posts: ArticleItem[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-gray-200 dark:border-gray-800 pt-12">
      <h2 className="text-2xl font-bold mb-6 font-cormorantGaramond text-gray-900 dark:text-white">
        Related Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/${post.id}`}
            className="group block bg-gray-50 dark:bg-gray-800/50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            <article className="p-4">
              <h3 className="font-bold text-lg mb-2 group-hover:text-amber-700 dark:group-hover:text-amber-500 transition-colors font-cormorantGaramond text-gray-900 dark:text-white">
                {post.title}
              </h3>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 font-poppins">
                <span className="capitalize">{post.category}</span>
                <span className="mx-2">•</span>
                <span>{post.date}</span>
              </div>
              <div className="mt-4 flex items-center text-amber-700 dark:text-amber-500 text-sm font-medium">
                Read article
                <ArrowRightIcon className="w-4 h-4 ml-1" />
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
