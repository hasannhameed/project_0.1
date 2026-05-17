const Comment = require('../models/comment.model');
const User = require('../models/user.model');

function publicAuthor(u) {
    return u ? { id: u.id, name: u.name, avatar: u.avatar ?? null } : null;
}

function publicComment(c) {
    return {
        id: c.id,
        animeMalId: c.animeMalId,
        body: c.body,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
        author: publicAuthor(c.User),
    };
}

// GET /api/comments/anime/:malId — public, anyone can read
async function listForAnime(req, res) {
    try {
        const malId = Number(req.params.malId);
        if (!Number.isFinite(malId)) {
            return res.status(400).json({ error: 'Invalid anime id' });
        }
        const comments = await Comment.findAll({
            where: { animeMalId: malId },
            include: [{ model: User, attributes: ['id', 'name', 'avatar'] }],
            order: [['createdAt', 'DESC']],
            limit: 200,
        });
        return res.json({ comments: comments.map(publicComment) });
    } catch (err) {
        console.error('listForAnime error', err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}

// POST /api/comments — auth required
async function create(req, res) {
    try {
        const { animeMalId, body } = req.body ?? {};
        if (!Number.isFinite(Number(animeMalId))) {
            return res.status(400).json({ error: 'animeMalId is required' });
        }
        if (typeof body !== 'string' || !body.trim()) {
            return res.status(400).json({ error: 'Comment cannot be empty' });
        }
        if (body.length > 2000) {
            return res.status(400).json({ error: 'Comment must be 2000 chars or less' });
        }

        const comment = await Comment.create({
            animeMalId: Number(animeMalId),
            body: body.trim(),
            userId: req.user.id,
        });

        // Reload with author for the response
        const withUser = await Comment.findByPk(comment.id, {
            include: [{ model: User, attributes: ['id', 'name', 'avatar'] }],
        });
        return res.status(201).json({ comment: publicComment(withUser) });
    } catch (err) {
        if (err?.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: err.errors?.[0]?.message ?? 'Invalid input' });
        }
        console.error('createComment error', err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}

// GET /api/comments/mine — auth required, returns current user's comments
async function listMine(req, res) {
    try {
        const comments = await Comment.findAll({
            where: { userId: req.user.id },
            include: [{ model: User, attributes: ['id', 'name', 'avatar'] }],
            order: [['createdAt', 'DESC']],
            limit: 100,
        });
        return res.json({ comments: comments.map(publicComment) });
    } catch (err) {
        console.error('listMine error', err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}

// DELETE /api/comments/:id — auth required, only the author may delete
async function remove(req, res) {
    try {
        const id = Number(req.params.id);
        if (!Number.isFinite(id)) {
            return res.status(400).json({ error: 'Invalid comment id' });
        }
        const comment = await Comment.findByPk(id);
        if (!comment) return res.status(404).json({ error: 'Comment not found' });
        if (comment.userId !== req.user.id) {
            return res.status(403).json({ error: 'You can only delete your own comments' });
        }
        await comment.destroy();
        return res.json({ ok: true });
    } catch (err) {
        console.error('removeComment error', err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}

module.exports = { listForAnime, create, listMine, remove };
