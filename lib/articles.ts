import fs from 'fs';
import path from 'path';
import { Article } from '@/types';

const articlesFilePath = path.join(process.cwd(), 'data', 'articles.json');

export function getAllArticles(): Article[] {
  const fileContents = fs.readFileSync(articlesFilePath, 'utf8');
  const data = JSON.parse(fileContents);
  return data.articles;
}

export function getArticleById(id: string): Article | null {
  const articles = getAllArticles();
  return articles.find(article => article.id === id) || null;
}

export function getAllArticleIds(): string[] {
  const articles = getAllArticles();
  return articles.map(article => article.id);
}