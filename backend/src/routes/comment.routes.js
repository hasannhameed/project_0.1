const express = require('express');
const { listForAnime, create, listMine, remove } = require('../controllers/comment.controller');
const { requireAuth } = require('../middlewares/auth.middleware');

const router = express.Router();

// Public: read comments for an anime
router.get('/anime/:malId', listForAnime);

// Auth required: list my comments, post, delete my own
router.get('/mine', requireAuth, listMine);
router.post('/', requireAuth, create);
router.delete('/:id', requireAuth, remove);

module.exports = router;
