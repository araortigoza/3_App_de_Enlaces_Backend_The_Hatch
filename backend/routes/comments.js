const express = require('express');
const router = express.Router({ mergeParams: true });
const { getCommentsByLink, createComment } = require('../controllers/commentsController');

router.get('/', getCommentsByLink);
router.post('/', createComment);

module.exports = router;