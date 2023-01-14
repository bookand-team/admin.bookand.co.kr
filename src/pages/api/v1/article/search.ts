import { dummyArticles } from '@assets/dummy';

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { page, row } = req.body;

    return res.status(200).json({
      articles: dummyArticles.slice((page - 1) * row, page * row),
      articlesLength: dummyArticles.length
    });
  } else {
    return res.status(404).end();
  }
}