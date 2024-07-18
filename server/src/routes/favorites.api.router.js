const router = require('express').Router();
const { Sock, Favorite, User } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyToken');
const { checkFavorites } = require('../middlewares/checkFavorites');

router
  .post('/api', verifyAccessToken, checkFavorites, async (req, res) => {
    const { userId, sockId } = req.body;
    try {
      const sox = await Favorite.create({ userId, sockId });
      res.json(sox);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })

  .delete('/api', verifyAccessToken, async (req, res) => {
    const { userId, sockId } = req.body;
    try {
      await Favorite.destroy({ where: { userId, sockId } });
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })

  .get('/api/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const sox = await Sock.findAll({
        include: { model: User, where: { id }, required: true },
      });
      const data = sox.map((el) => el.get({ plain: true }));
      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

module.exports = router;
