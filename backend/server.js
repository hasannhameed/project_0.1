require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const sequelize = require('./src/config/db');
const User = require('./src/models/user.model');
const authRoutes = require('./src/routes/auth.routes');
const { requireAuth } = require('./src/middlewares/auth.middleware');

const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

const app = express();

app.use(cors({
    origin: CORS_ORIGIN.split(',').map((o) => o.trim()),
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Auth
app.use('/api/auth', authRoutes);

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

sequelize.sync({ alter: true })
    .then(() => {
        console.log('✅ DB connected');
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => console.error('❌ DB sync failed:', err));
