const express = require('express');

const dummyReportArr = require('../dummy/report.json');

const router = express.Router();

// 전체 서점 조회
router.get('/', (req, res) => {
  return res.status(200).json({
    reports: dummyReportArr,
    reportsLength: dummyReportArr.length
  });
});

// 특정 서점 조회
router.get('/:id', (req, res) => {
  return res.status(200).json({
    report: dummyReportArr[Number(req.params.id) - 1]
  });
});

// 조건에 맞는 서점 조회
router.post('/search', (req, res) => {
  const { page, row } = req.body;

  return res.status(200).json({
    reports: dummyReportArr.slice((page - 1) * row, page * row),
    reportsLength: dummyReportArr.length
  });
});

module.exports = router;