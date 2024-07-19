const router = require('express').Router();
const { Sock, Favorite, Basket } = require('../../db/models');
// const { verifyAccessToken } = require('../middlewares/verifyToken');
const { checkFavorites } = require('../middlewares/checkFavorites');

router
  .post('/api/addsock/favorites', checkFavorites, async (req, res) => {
    try {
      const { sockId, userId } = req.body;
      if (!sockId || !userId) {
        return res.status(400).json({ message: 'sockId and userId are required', status: 400 });
      }

      const basket = await Basket.findOne({ where: { sockId, userId } });

      if (basket) {
        return res.status(400).json({ message: 'Sock is already in basket', status: 400 });
      }

      const sock = await Favorite.create({ userId, sockId });
      res.json(sock);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })
  .post('/api/check/favorite', async (req, res) => {
    try {
      const { sockId, userId } = req.body;
      if (!sockId || !userId) {
        return res.status(400).json({ message: 'sockId and userId are required', status: 400 });
      }

      const favorite = await Favorite.findOne({
        where: { sockId, userId },
      });

      res.json({ exists: Boolean(favorite) });
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })
  .delete('/api/deleteFavorites', async (req, res) => {
    try {
      const { sockId, userId } = req.query;
      const favById = await Favorite.findOne({ where: { id: sockId, userId } });
      if (favById && favById.dataValues.sockId) {
        const sockById = await Sock.findOne({ where: { id: favById.dataValues.sockId } });
        if (sockById) {
          sockById.quantity += 1;
          await sockById.save();
        }
        await Favorite.destroy({ where: { id: sockId, userId } });
        return res.status(200).json({ message: 'ok', status: 200 });
      }
      return res.status(404).json({ message: 'Sock not found', status: 404 });
    } catch (error) {
      return res.status(500).json({ message: error.message, status: 500 });
    }
  })
  .get('/api/allFavorites', async (req, res) => {
    try {
      const { userId } = req.query;
      const sox = await Favorite.findAll({ 
        where: { userId: userId },
        include: [{
          model: Sock,
          attributes: ['id', 'img', 'pattern', 'color', 'price', 'quantity'],
        }],
      });
      res.json({ sox, message: 'OK', status: 200});
    } catch (error) {
      res.json({ message: error.message, status: 500});
    }
});

module.exports = router;
