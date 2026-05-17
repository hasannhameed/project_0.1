const Like = require('../models/like.model');
const { verifyToken, COOKIE_NAME } = require('../utils/token');

// Helper — tries to find the current user id from the cookie (optional auth).
function tryGetUserId(req) {
    const token = req.cookies?.[COOKIE_NAME];
    if (!token) return null;
    const payload = verifyToken(token);
    return payload?.id ?? null;
}

// GET /api/likes/anime/:malId — public count + whether the current user liked
async function getForAnime(req, res) {
    try {
        const malId = Number(req.params.malId);
        if (!Number.isFinite(malId)) {
            return res.status(400).json({ error: 'Invalid anime id' });
        }
        const userId = tryGetUserId(req);
        const [count, liked] = await Promise.all([
            Like.count({ where: { animeMalId: malId } }),
            userId
                ? Like.findOne({ where: { animeMalId: malId, userId } }).then(Boolean)
                : Promise.resolve(false),
        ]);
        return res.json({ count, liked });
    } catch (err) {
        console.error('getForAnime error', err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}

// POST /api/likes/:malId — toggle like (auth required)
async function toggle(req, res) {
    try {
        const malId = Number(req.params.malId);
        if (!Number.isFinite(malId)) {
            return res.status(400).json({ error: 'Invalid anime id' });
        }
        const existing = await Like.findOne({
            where: { animeMalId: malId, userId: req.user.id },
        });
        let liked;
        if (existing) {
            await existing.destroy();
            liked = false;
        } else {
            await Like.create({ animeMalId: malId, userId: req.user.id });
            liked = true;
        }
        const count = await Like.count({ where: { animeMalId: malId } });
        return res.json({ count, liked });
    } catch (err) {
        console.error('toggleLike error', err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}

// GET /api/likes/mine — every malId the current user has liked (auth required)
async function listMine(req, res) {
    try {
        const likes = await Like.findAll({
            where: { userId: req.user.id },
            order: [['createdAt', 'DESC']],
            attributes: ['animeMalId', 'createdAt'],
        });
        return res.json({
            likes: likes.map((l) => ({
                animeMalId: l.animeMalId,
                likedAt: l.createdAt,
            })),
        });
    } catch (err) {
        console.error('listMineLikes error', err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}

module.exports = { getForAnime, toggle, listMine };
