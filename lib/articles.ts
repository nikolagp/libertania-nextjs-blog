import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import moment from 'moment';
import { remark } from 'remark';
import html from 'remark-html';

import type { ArticleItem } from '@/types';

const articlesDirectory = path.join(process.cwd(), 'articles');

const getSortedArticles = (): ArticleItem[] => {
  const fileNames = fs
    .readdirSync(articlesDirectory)
    .filter((fileName) => fileName.endsWith('.md'));

  const allArticlesData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');

    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    const matterResult = matter(fileContents);

    return {
      id,
      title: matterResult.data.title,
      date: moment(matterResult.data.date, 'DD-MM-YYYY').format('MMMM Do YYYY'),
      category: matterResult.data.category,
      author: matterResult.data.author,
      coverImage: matterResult.data.coverImage,
    };
  });

  return allArticlesData.sort((a, b) => {
    const format = 'DD-MM-YYYY';
    const dateOne = moment(a.date, 'MMMM Do YYYY');
    const dateTwo = moment(b.date, 'MMMM Do YYYY');
    if (dateOne.isBefore(dateTwo)) {
      return -1;
    } else if (dateTwo.isAfter(dateOne)) {
      return 1;
    } else {
      return 0;
    }
  });
};

export const getCategorisedArticles = (): Record<string, ArticleItem[]> => {
  const sortedArticles = getSortedArticles();
  const categorisedArticles: Record<string, ArticleItem[]> = {};

  sortedArticles.forEach((article) => {
    // Only add articles with valid categories
    if (
      typeof article.category === 'string' &&
      article.category.trim() !== ''
    ) {
      if (!categorisedArticles[article.category]) {
        categorisedArticles[article.category] = [];
      }
      categorisedArticles[article.category].push(article);
    }
  });

  return categorisedArticles;
};

export const getAllArticles = (): ArticleItem[] => {
  return getSortedArticles();
};

export const getArticleData = async (id: string): Promise<any> => {
  const fullPath = path.join(articlesDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf-8');

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content); // @ts-ignore
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    title: matterResult.data.title,
    date: moment(matterResult.data.date, 'DD-MM-YYYY').format('MMMM Do YYYY'),
    category: matterResult.data.category,
    author: matterResult.data.author,
    coverImage: matterResult.data.coverImage,
    // ...matterResult.data,
  };
};
