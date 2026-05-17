const express = require('express');
const { signup, login, logout, me, updateMe } = require('../controllers/auth.controller');
const { requireAuth } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', requireAuth, me);
router.put('/me', requireAuth, updateMe);

module.exports = router;
