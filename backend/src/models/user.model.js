const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Name is required' },
            len: { args: [1, 60], msg: 'Name must be 1–60 characters' },
        },
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: { isEmail: { msg: 'Must be a valid email' } },
    },
    password: {
        // Nullable for back-compat with pre-auth rows. The signup
        // controller requires a password for every new account.
        type: DataTypes.STRING,
        allowNull: true,
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: { len: { args: [0, 280], msg: 'Bio must be 280 chars or less' } },
    },
    // Stored as a base64 data URL. Capped at ~3 MB by the request body limit.
    avatar: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    defaultScope: {
        attributes: { exclude: ['password'] },
    },
    scopes: {
        withPassword: { attributes: {} },
    },
});

module.exports = User;
