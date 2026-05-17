// AdminJS bootstrap — auto-generated CRUD admin for our Sequelize models.
// Visit /admin in the browser, log in with ADMIN_EMAIL + ADMIN_PASSWORD.
//
// AdminJS v7 is ESM-only, so we load it via dynamic import from this CJS file.

const User = require('./models/user.model');
const Comment = require('./models/comment.model');
const Like = require('./models/like.model');

async function buildAdmin() {
    const { default: AdminJS } = await import('adminjs');
    const AdminJSExpress = await import('@adminjs/express');
    const AdminJSSequelize = await import('@adminjs/sequelize');

    AdminJS.registerAdapter({
        Database: AdminJSSequelize.Database,
        Resource: AdminJSSequelize.Resource,
    });

    const admin = new AdminJS({
        rootPath: '/admin',
        branding: {
            companyName: 'Hanabi Admin',
            withMadeWithLove: false,
        },
        resources: [
            {
                resource: User,
                options: {
                    properties: {
                        password: { isVisible: false },
                        avatar: {
                            type: 'richtext',
                            isVisible: { list: false, edit: true, show: true, filter: false },
                        },
                        bio: { type: 'textarea' },
                    },
                    listProperties: ['id', 'name', 'email', 'createdAt'],
                    sort: { sortBy: 'createdAt', direction: 'desc' },
                },
            },
            {
                resource: Comment,
                options: {
                    properties: {
                        body: { type: 'textarea' },
                    },
                    listProperties: ['id', 'animeMalId', 'userId', 'body', 'createdAt'],
                    sort: { sortBy: 'createdAt', direction: 'desc' },
                },
            },
            {
                resource: Like,
                options: {
                    listProperties: ['id', 'userId', 'animeMalId', 'createdAt'],
                    sort: { sortBy: 'createdAt', direction: 'desc' },
                },
            },
        ],
    });

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET;

    if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !ADMIN_SESSION_SECRET) {
        console.warn('⚠️  Admin env vars missing — /admin will refuse all logins.');
    }

    const router = AdminJSExpress.buildAuthenticatedRouter(
        admin,
        {
            authenticate: async (email, password) => {
                if (
                    ADMIN_EMAIL &&
                    ADMIN_PASSWORD &&
                    email === ADMIN_EMAIL &&
                    password === ADMIN_PASSWORD
                ) {
                    return { email };
                }
                return null;
            },
            cookieName: 'hanabi_admin',
            cookiePassword: ADMIN_SESSION_SECRET ?? 'change-me-in-prod',
        },
        null,
        {
            resave: false,
            saveUninitialized: false,
            secret: ADMIN_SESSION_SECRET ?? 'change-me-in-prod',
            cookie: {
                httpOnly: true,
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production',
            },
            name: 'hanabi_admin_session',
        },
    );

    return { admin, router };
}

module.exports = { buildAdmin };
