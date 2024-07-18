const router = require('express').Router();
const { Sock, Favorite } = require('../../db/models/index');
// const { verifyAccessToken } = require('../middlewares/verifyToken');
// const { checkFavorites } = require('../middlewares/checkFavorites');

router
  .post('/api/addsocks/favorites', async (req, res) => {
    try {
      const { sockId, userId } = req.body;
      if (!sockId || !userId) {
        return res.status(400).json({ message: 'sockId and userId are required', status: 400 });
      }
      const sock = await Favorite.create({ userId, sockId });
      res.json(sock);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })

  .delete('/api/delete/favorites', async (req, res) => {
    const { userId, sockId } = req.body;
    try {
      await Favorite.destroy({ where: { userId, sockId } });
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })

  .get('/api/all/favorites', async (req, res) => {
    try {
      const { userId } = req.query;
      // eslint-disable-next-line object-shorthand
      const sox = await Sock.findAll({ where: { userId: userId } });
      res.json({ sox, message: 'OK', status: 200 });
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

module.exports = router;
