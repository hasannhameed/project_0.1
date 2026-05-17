const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '7d';

if (!JWT_SECRET) {
    console.warn('⚠️  JWT_SECRET is not set. Auth tokens will fail.');
}

function signToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch {
        return null;
    }
}

const COOKIE_NAME = 'hanabi_token';

// Cross-site cookies (frontend on logiclayers.in / localhost, backend on
// api.logiclayers.in) REQUIRE sameSite: 'none' + secure: true.
// Browsers refuse cookies that don't meet both conditions on cross-origin
// fetch responses, regardless of CORS headers.
const COOKIE_OPTIONS = {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
};

module.exports = { signToken, verifyToken, COOKIE_NAME, COOKIE_OPTIONS };
