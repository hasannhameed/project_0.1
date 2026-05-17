const express = require('express');
const { getForAnime, toggle, listMine } = require('../controllers/like.controller');
const { requireAuth } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/anime/:malId', getForAnime); // public count + per-user liked flag
router.get('/mine', requireAuth, listMine);
router.post('/:malId', requireAuth, toggle);

module.exports = router;
