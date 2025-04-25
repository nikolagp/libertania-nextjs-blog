import BlogSection from '@/components/BlogSection';
import { getCategorisedArticles } from '@/lib/articles';

const HomePage = () => {
  const articles = getCategorisedArticles();

  return (
    <main>
      <BlogSection articles={articles} />
    </main>
  );
};

export default HomePage;
