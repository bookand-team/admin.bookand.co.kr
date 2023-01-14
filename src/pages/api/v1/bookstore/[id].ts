import { dummyBookstores } from '@assets/dummy';

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;

    return res.status(200).json({
      bookstore: dummyBookstores[Number(id) - 1]
    });
  } else {
    return res.status(404).end();
  }
}