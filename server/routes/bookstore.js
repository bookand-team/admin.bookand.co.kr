const express = require('express');

const dummyBookstoreArr = require('../dummy/bookstore.json');

const router = express.Router();

// 전체 서점 조회
router.get('/', (req, res) => {
  return res.status(200).json({
    bookstores: dummyBookstoreArr,
    bookstoresLength: dummyBookstoreArr.length
  });
});

// 특정 서점 조회
router.get('/:id', (req, res) => {
  return res.status(200).json({
    bookstore: dummyBookstoreArr[Number(req.params.id) - 1]
  });
});

// 조건에 맞는 서점 조회
router.post('/search', (req, res) => {
  const { page, row } = req.body;

  return res.status(200).json({
    bookstores: dummyBookstoreArr.slice((page - 1) * row, page * row),
    bookstoresLength: dummyBookstoreArr.length
  });
});

module.exports = router;