require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: 'DB',
  },
  test: {
    username: 'hardmod',
    password: '123',
    database: 'sock',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'hardmod',
    password: '123',
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
