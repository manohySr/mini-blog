import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllArticles } from '@/lib/articles';
import { ArticlesResponse } from '@/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ArticlesResponse | { error: string }>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const articles = getAllArticles();
    res.status(200).json({ articles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
}