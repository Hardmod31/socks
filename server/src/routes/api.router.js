const router = require('express').Router();
const tokensRouter = require('./tokens.api.router');
const authRouter = require('./auth.api.router');

router.use('/auth', authRouter);
router.use('/tokens', tokensRouter);

module.exports = router;
