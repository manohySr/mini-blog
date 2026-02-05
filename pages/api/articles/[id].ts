import type { NextApiRequest, NextApiResponse } from 'next';
import { getArticleById } from '@/lib/articles';
import { ArticleResponse } from '@/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ArticleResponse | { error: string }>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid article ID' });
  }

  try {
    const article = getArticleById(id);

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.status(200).json({ article });
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
}