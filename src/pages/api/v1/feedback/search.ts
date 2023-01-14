import { dummyFeedbacks } from '@assets/dummy';

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { page, row } = req.body;

    return res.status(200).json({
      feedbacks: dummyFeedbacks.slice((page - 1) * row, page * row),
      feedbacksLength: dummyFeedbacks.length
    });
  } else {
    return res.status(404).end();
  }
}