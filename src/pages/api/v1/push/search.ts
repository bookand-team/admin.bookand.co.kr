import { dummyPushes } from '@assets/dummy';

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { page, row } = req.body;

    return res.status(200).json({
      pushes: dummyPushes.slice((page - 1) * row, page * row),
      pushesLength: dummyPushes.length
    });
  } else {
    return res.status(404).end();
  }
}