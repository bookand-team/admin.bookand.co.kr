import { axiosBack } from '@config/axios';
import { isLoginSucRes } from '@types';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      // 로그인 요청
      const response = await axiosBack.post('/auth/admin', req.body);
      const tokenData = response.data;

      // 토큰정보 형식이 맞는지 확인
      if (tokenData && isLoginSucRes(tokenData)) {
        // 토큰값 쿠키에 저장
        res.setHeader('Set-Cookie', [`accessToken=${tokenData.accessToken}; Path=/; HttpOnly;`, `refreshToken=${tokenData.refreshToken}; Path=/; HttpOnly;`]);
        return res.status(200).end();
      } else {
        return res.status(401).end();
      }
    } else {
      return res.status(404).end();
    }
  } catch (error) {
    return res.status(500).end();
  }
}