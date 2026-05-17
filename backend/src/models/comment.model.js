const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    // MAL anime ID — same identifier we use everywhere on the frontend
    animeMalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notNull: { msg: 'animeMalId is required' } },
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Comment cannot be empty' },
            len: { args: [1, 2000], msg: 'Comment must be 1–2000 characters' },
        },
    },
}, {
    indexes: [
        { fields: ['animeMalId'] },
        { fields: ['createdAt'] },
    ],
});

// Associations
User.hasMany(Comment, { foreignKey: 'userId', onDelete: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: 'userId' });

module.exports = Comment;
