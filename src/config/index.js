require('dotenv').config();

module.exports = {
    system: {
        url: process.env.SYS_URL || 'http://localhost:8080',
        host: process.env.SYS_HOST || 'localhost',
        port: process.env.SYS_PORT || 8080
    },
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        database: process.env.DB_DATABASE || 'backend',
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || 'root',
        dialect: process.env.DB_DIALECT || 'mysql',
        resetDatabase: process.env.DB_RESET === 'true' || false
    }
};
