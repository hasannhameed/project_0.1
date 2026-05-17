require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const sequelize = require('./src/config/db');
const User = require('./src/models/user.model');
const Comment = require('./src/models/comment.model'); // sets up User↔Comment associations on import
const Like = require('./src/models/like.model');        // sets up User↔Like associations on import
const authRoutes = require('./src/routes/auth.routes');
const commentRoutes = require('./src/routes/comment.routes');
const likeRoutes = require('./src/routes/like.routes');
const { requireAuth } = require('./src/middlewares/auth.middleware');
const { buildAdmin } = require('./src/admin');
// Touch so the linter/tree-shaker can't drop them
void Comment;
void Like;

const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

const app = express();

app.use(cors({
    origin: CORS_ORIGIN.split(',').map((o) => o.trim()),
    credentials: true,
}));
// 4mb body limit so users can upload a 2mb avatar as base64 (~2.7mb after encoding)
app.use(express.json({ limit: '4mb' }));
app.use(cookieParser());

// Auth + comments + likes
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);

// Health checks (existing)
app.get('/api/hello', (_req, res) => res.json({ message: 'Hello from the backend' }));

// Example protected route — uncomment to test
// app.get('/api/protected', requireAuth, (req, res) => {
//     res.json({ message: `Hi ${req.user.name}, you are authenticated.` });
// });

// User CRUD (admin / dev only — protect these or remove for production)
app.get('/api/users', requireAuth, async (_req, res) => {
    const users = await User.findAll();
    res.json(users);
});

app.put('/api/users/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    await User.update(req.body, { where: { id } });
    const updated = await User.findByPk(id);
    res.json(updated);
});

app.delete('/api/users/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    res.json({ message: 'Deleted' });
});

async function start() {
    try {
        await sequelize.sync({ alter: true });
        console.log('✅ DB connected');

        // Mount AdminJS panel at /admin (uses dynamic import for ESM)
        const { admin, router } = await buildAdmin();
        app.use(admin.options.rootPath, router);
        console.log(`🛠️  Admin panel at http://localhost:${PORT}${admin.options.rootPath}`);

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('❌ Startup failed:', err);
        process.exit(1);
    }
}

start();
