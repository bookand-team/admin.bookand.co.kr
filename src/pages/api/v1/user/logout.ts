import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // 토큰값 쿠키에서 삭제
    res.setHeader('Set-Cookie', [`accessToken= ; Path=/; HttpOnly; Max-Age=0;`, `refreshToken= ; Path=/; HttpOnly; Max-Age=0;`]);
    return res.status(200).end();
  } else {
    return res.status(404).end();
  }
}