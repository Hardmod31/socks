const router = require('express').Router();
const tokensRouter = require('./tokens.api.router');
const authRouter = require('./auth.api.router');
const favoritesRouter = require('./favorites.api.router');


router.use('/auth', authRouter);
router.use('/tokens', tokensRouter);
router.use('/favorites', favoritesRouter);


module.exports = router;
