const express = require('express');

const dummyFeedbackArr = require('../dummy/feedback.json');

const router = express.Router();

// 전체 피드백 조회
router.get('/', (req, res) => {
  return res.status(200).json({
    feedbacks: dummyFeedbackArr,
    feedbacksLength: dummyFeedbackArr.length
  });
});

// 특정 피드백 조회
router.get('/:id', (req, res) => {
  return res.status(200).json({
    feedback: dummyFeedbackArr[Number(req.params.id) - 1]
  });
});

// 조건에 맞는 피드백 조회
router.post('/search', (req, res) => {
  const { page, row } = req.body;

  return res.status(200).json({
    feedbacks: dummyFeedbackArr.slice((page - 1) * row, page * row),
    feedbacksLength: dummyFeedbackArr.length
  });
});

module.exports = router;