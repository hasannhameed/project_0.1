const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');

const Like = sequelize.define('Like', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    animeMalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    indexes: [
        // A user can only like a given anime once
        { unique: true, fields: ['userId', 'animeMalId'] },
        { fields: ['animeMalId'] },
    ],
});

User.hasMany(Like, { foreignKey: 'userId', onDelete: 'CASCADE' });
Like.belongsTo(User, { foreignKey: 'userId' });

module.exports = Like;
