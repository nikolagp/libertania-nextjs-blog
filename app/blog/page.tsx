import { getCategorisedArticles } from '@/lib/articles';
import BlogSection from '@/components/BlogSection';

export default function BlogPage() {
  const articles = getCategorisedArticles();

  return (
    <main>
      <BlogSection articles={articles} />
    </main>
  );
}