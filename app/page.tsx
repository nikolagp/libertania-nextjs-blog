import BlogSection from '@/components/BlogSection';
import HeroSection from '@/components/HeroSection';

import { getCategorisedArticles } from '@/lib/articles';

const HomePage = () => {
  const articles = getCategorisedArticles();

  return (
    <main>
      <HeroSection />
      <BlogSection articles={articles} />
    </main>
  );
};

export default HomePage;
