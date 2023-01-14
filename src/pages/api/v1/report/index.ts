import { dummyReports } from '@assets/dummy';

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json({
      reports: dummyReports,
      reportsLength: dummyReports.length
    });
  } else {
    return res.status(404).end();
  }
}