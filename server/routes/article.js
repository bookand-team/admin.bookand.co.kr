const express = require('express');

const dummyArticleArr = require('../dummy/article.json');

const router = express.Router();

// 전체 아티클 조회
router.get('/', (req, res) => {
  return res.status(200).json({
    articles: dummyArticleArr,
    articlesLength: dummyArticleArr.length
  });
});

// 특정 아티클 조회
router.get('/:id', (req, res) => {
  return res.status(200).json({
    article: dummyArticleArr[Number(req.params.id) - 1]
  });
});

// 조건에 맞는 아티클 조회
router.post('/search', (req, res) => {
  const { page, row } = req.body;

  return res.status(200).json({
    articles: dummyArticleArr.slice((page - 1) * row, page * row),
    articlesLength: dummyArticleArr.length
  });
});

module.exports = router;