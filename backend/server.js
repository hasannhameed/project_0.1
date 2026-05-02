const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/db');
const User = require('./src/models/user.model');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/hello', async (req, res) => {
    res.json({ "message": "Hello from the backend" });
});

app.post('/api/users', async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});

app.get('/api/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

app.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;

    await User.update(req.body, {
        where: { id },
    });

    const updated = await User.findByPk(id);
    res.json(updated);
});

app.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;

    await User.destroy({
        where: { id },
    });

    res.json({ message: 'Deleted' });
});


sequelize.sync()
    .then(() => {
        console.log('✅ DB connected, running server on 5000'),
            app.listen(PORT, () => {
                console.log(`🚀 Server running on http://localhost:${PORT}`);
            });

    })
    .catch(err => console.error(err));