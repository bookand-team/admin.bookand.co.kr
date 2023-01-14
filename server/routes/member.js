const express = require('express');

const dummyMemberArr = require('../dummy/member.json');

const router = express.Router();

// 전체 회원 조회
router.get('/', (req, res) => {
  return res.status(200).json({
    members: dummyMemberArr,
    membersLength: dummyMemberArr.length
  });
});

// 특정 회원 조회
router.get('/:id', (req, res) => {
  return res.status(200).json({
    member: dummyMemberArr[Number(req.params.id) - 1]
  });
});

// 조건에 맞는 회원 조회
router.post('/search', (req, res) => {
  const { page, row } = req.body;

  return res.status(200).json({
    members: dummyMemberArr.slice((page - 1) * row, page * row),
    membersLength: dummyMemberArr.length
  });
});

module.exports = router;