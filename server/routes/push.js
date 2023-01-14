const express = require('express');

const dummyPushArr = require('../dummy/push.json');

const router = express.Router();

// 전체 푸시 조회
router.get('/', (req, res) => {
  return res.status(200).json({
    pushes: dummyPushArr,
    pushesLength: dummyPushArr.length
  });
});

// 특정 푸시 조회
router.get('/:id', (req, res) => {
  return res.status(200).json({
    push: dummyPushArr[Number(req.params.id) - 1]
  });
});

// 조건에 맞는 푸시 조회
router.post('/search', (req, res) => {
  const { page, row } = req.body;

  return res.status(200).json({
    pushes: dummyPushArr.slice((page - 1) * row, page * row),
    pushesLength: dummyPushArr.length
  });
});

module.exports = router;