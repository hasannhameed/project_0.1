const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize("postgresql://postgres:Qwerty%409949719006@db.jbaveqntjbjllwaylzgw.supabase.co:5432/postgres"L, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

module.exports = sequelize;