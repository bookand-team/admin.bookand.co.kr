import { isLoginSucRes } from '@types';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // 토큰정보 형식이 맞는지 재확인
    if (req.body && isLoginSucRes(req.body)) {
      // 토큰값 쿠키에 저장
      res.setHeader('Set-Cookie', [`accessToken=${req.body.accessToken}; Path=/; HttpOnly;`, `refreshToken=${req.body.refreshToken}; Path=/; HttpOnly;`]);
      return res.status(200).end();
    } else {
      return res.status(400).send('Not Vaild Format');
    }
  } else {
    return res.status(404).end();
  }
}