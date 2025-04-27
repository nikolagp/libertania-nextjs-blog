import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { getArticleData, getAllArticles } from '@/lib/articles';
import Image from 'next/image';
import type { ArticleItem } from '@/types';
import TableOfContents from '@/components/TableOfContents';
import RelatedPosts from '@/components/RelatedPosts';

const Article = async ({ params }: { params: { slug: string } }) => {
  const [articleData, allArticles] = await Promise.all([
    getArticleData(params.slug),
    getAllArticles()
  ]);
  
  // Get related posts from the same category, excluding the current article
  const relatedPosts = allArticles
    .filter((post): post is ArticleItem => 
      post.category === articleData.category && 
      post.id !== params.slug
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Table of Contents - Left Sidebar */}
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents />
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9">
            <div className="max-w-3xl">
              {/* Back Link */}
              <div className="mb-8">
                <Link 
                  href={'/'} 
                  className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-amber-700 dark:hover:text-amber-500 transition-colors font-poppins"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Back to home
                </Link>
              </div>

              {/* Article Header */}
              <header className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-cormorantGaramond">
                  {articleData.title}
                </h1>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 font-poppins">
                  <span>{articleData.date.toString()}</span>
                  <span className="mx-2">•</span>
                  <span>{articleData.author}</span>
                  {articleData.category && (
                    <>
                      <span className="mx-2">•</span>
                      <span className="capitalize">{articleData.category}</span>
                    </>
                  )}
                </div>
              </header>

              {/* Cover Image */}
              {articleData.coverImage && (
                <figure className="mb-8">
                  <Image
                    src={`/images/${articleData.coverImage}`}
                    alt="Cover Image"
                    width={800}
                    height={400}
                    className="rounded-lg shadow-lg w-full"
                  />
                </figure>
              )}

              {/* Article Content */}
              <article className="prose prose-lg dark:prose-invert max-w-none font-poppins mb-12">
                <div dangerouslySetInnerHTML={{ __html: articleData.contentHtml }} />
              </article>

              {/* Related Posts */}
              <RelatedPosts posts={relatedPosts} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Article;
