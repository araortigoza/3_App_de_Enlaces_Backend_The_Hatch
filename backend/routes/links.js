const express = require('express');
const router = express.Router();
const { getLinks, getLinkById, createLink, voteLink } = require('../controllers/linksController');

router.get('/', getLinks);
router.post('/', createLink);
router.get('/:id', getLinkById);
router.post('/:id/vote', voteLink);

module.exports = router;