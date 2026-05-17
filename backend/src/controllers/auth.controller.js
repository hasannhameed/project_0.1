const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { signToken, COOKIE_NAME, COOKIE_OPTIONS } = require('../utils/token');

function publicUser(u) {
    return {
        id: u.id,
        name: u.name,
        email: u.email,
        bio: u.bio ?? null,
        avatar: u.avatar ?? null,
        createdAt: u.createdAt,
    };
}

// 2MB raw file → ~2.67MB base64. Allow a little headroom for the data: prefix.
const MAX_AVATAR_LENGTH = 3 * 1024 * 1024; // ~3MB of base64 chars

async function signup(req, res) {
    try {
        const { name, email, password } = req.body ?? {};

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'name, email, and password are required' });
        }
        if (typeof password !== 'string' || password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters' });
        }

        const existing = await User.findOne({ where: { email: email.toLowerCase() } });
        if (existing) {
            return res.status(409).json({ error: 'An account with that email already exists' });
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashed,
        });

        const token = signToken({ id: user.id });
        res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
        return res.status(201).json({ user: publicUser(user) });
    } catch (err) {
        if (err?.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: err.errors?.[0]?.message ?? 'Invalid input' });
        }
        console.error('signup error', err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body ?? {};

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await User.scope('withPassword').findOne({
            where: { email: email.toLowerCase() },
        });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = signToken({ id: user.id });
        res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
        return res.json({ user: publicUser(user) });
    } catch (err) {
        console.error('login error', err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}

async function logout(_req, res) {
    res.clearCookie(COOKIE_NAME, { ...COOKIE_OPTIONS, maxAge: undefined });
    return res.json({ ok: true });
}

async function me(req, res) {
    return res.json({ user: publicUser(req.user) });
}

async function updateMe(req, res) {
    try {
        const { name, bio, avatar } = req.body ?? {};
        const updates = {};

        if (name !== undefined) {
            if (typeof name !== 'string' || !name.trim()) {
                return res.status(400).json({ error: 'Name cannot be empty' });
            }
            updates.name = name.trim();
        }

        if (bio !== undefined) {
            if (bio !== null && typeof bio !== 'string') {
                return res.status(400).json({ error: 'Bio must be a string' });
            }
            if (typeof bio === 'string' && bio.length > 280) {
                return res.status(400).json({ error: 'Bio must be 280 chars or less' });
            }
            updates.bio = bio === '' ? null : bio;
        }

        if (avatar !== undefined) {
            if (avatar !== null) {
                if (typeof avatar !== 'string') {
                    return res.status(400).json({ error: 'Avatar must be a data URL' });
                }
                if (!avatar.startsWith('data:image/')) {
                    return res.status(400).json({ error: 'Avatar must be a data:image/... URL' });
                }
                if (avatar.length > MAX_AVATAR_LENGTH) {
                    return res.status(413).json({ error: 'Avatar exceeds 2MB. Please use a smaller image.' });
                }
            }
            updates.avatar = avatar;
        }

        await req.user.update(updates);
        await req.user.reload();
        return res.json({ user: publicUser(req.user) });
    } catch (err) {
        if (err?.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: err.errors?.[0]?.message ?? 'Invalid input' });
        }
        console.error('updateMe error', err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}

module.exports = { signup, login, logout, me, updateMe };
