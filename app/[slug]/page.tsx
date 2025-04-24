import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { getArticleData } from '@/lib/articles';
import Image from 'next/image';

const Article = async ({ params }: { params: { slug: string } }) => {
  const articleData = await getArticleData(params.slug);

  return (
    <section className="mx-auto w-10/12 md:w-1/2 mt-20 flex flex-col gap-5">
      <div className="flex justify-between font-poppins">
        <Link href={'/'} className="flex flex-row gap-1 place-items-center">
          <ArrowLeftIcon width={20} />
          <p>back to home</p>
        </Link>
        <p>{articleData.date.toString()}</p>
      </div>
      <article className="article">
        <p className="text-gray-600 mb-4">By {articleData.author}</p>
        {articleData.coverImage && (
          <Image
            src={`/images/${articleData.coverImage}`}
            alt="Cover Image"
            width={800}
            height={400}
            className="mb-4"
          />
        )}
        <div dangerouslySetInnerHTML={{ __html: articleData.contentHtml }} />
      </article>
    </section>
  );
};

export default Article;
