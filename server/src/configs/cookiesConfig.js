const jwtConfig = require('./jwtConfig');

module.exports = {
  access: {
    maxAge: jwtConfig.access.expiresIn,
    httpOnly: false,
  },
  refresh: {
    maxAge: jwtConfig.refresh.expiresIn,
    httpOnly: false,
  },
};
