const express = require('express');
const next = require('next');

const articleRouter = require('./routes/article');
const bookstoreRouter = require('./routes/bookstore');
const feedbackRouter = require('./routes/feedback');
const memberRouter = require('./routes/member');
const pushRouter = require('./routes/push');
const reportRouter = require('./routes/report');

const port = process.env.PORT;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // content-type이 json / x-www-form-urlencoded 일때 해석하는 미들웨어
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.use('/api/v1/article', articleRouter);
  server.use('/api/v1/bookstore', bookstoreRouter);
  server.use('/api/v1/feedback', feedbackRouter);
  server.use('/api/v1/member', memberRouter);
  server.use('/api/v1/push', pushRouter);
  server.use('/api/v1/report', reportRouter);

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // 서버 실행
  server.listen(port || 3000, (error) => {
    if (error) throw error;
    console.log(`> started server on http://localhost:${port}`);
  });
});