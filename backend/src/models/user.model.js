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
        validate: {
            isEmail: { msg: 'Must be a valid email' },
        },
    },
    password: {
        // Nullable at the DB level so adding this column to an existing
        // Users table doesn't fail on pre-auth rows. The signup controller
        // still requires a password for every new account, so legitimate
        // users always have one.
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    // Never return password in default queries
    defaultScope: {
        attributes: { exclude: ['password'] },
    },
    scopes: {
        // Use User.scope('withPassword').findOne(...) when you need to verify
        withPassword: { attributes: {} },
    },
});

module.exports = User;
