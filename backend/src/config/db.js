const { Sequelize } = require("sequelize");
require("dotenv").config();

// Always use the Environment Variable first
const dbUrl = "postgresql://postgres:Qwerty%409949719006@db.jbaveqntjbjllwaylzgw.supabase.co:6543/postgres"; //"process.env.DATABASE_URL;

const sequelize = new Sequelize(dbUrl, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Essential for Render -> Supabase
        },
    },
    // Required when using PgBouncer/Transaction mode on Supabase
    minifyAliases: true,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = sequelize;