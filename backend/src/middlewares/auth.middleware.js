const { verifyToken, COOKIE_NAME } = require('../utils/token');
const User = require('../models/user.model');

// Attaches req.user if a valid token cookie exists. Otherwise returns 401.
async function requireAuth(req, res, next) {
    const token = req.cookies?.[COOKIE_NAME];
    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    const payload = verifyToken(token);
    if (!payload?.id) return res.status(401).json({ error: 'Invalid token' });

    const user = await User.findByPk(payload.id);
    if (!user) return res.status(401).json({ error: 'User no longer exists' });

    req.user = user;
    next();
}

module.exports = { requireAuth };
