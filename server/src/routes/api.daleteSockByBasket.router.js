/* eslint-disable no-else-return */
/* eslint-disable import/newline-after-import */
/* eslint-disable indent */
const express = require('express');
const router = express.Router();
const { Sock, Basket } = require('../../db/models');

router.delete('/api/deleteSock', async (req, res) => {
    try {
        const { sockId, userId } = req.query;
        const basketById = await Basket.findOne({ where: { id: sockId, userId: userId } });
        if (basketById && basketById.dataValues.sockId) {
            const sockById = await Sock.findOne({ where: { id: basketById.dataValues.sockId } });
            if (sockById) {
                sockById.quantity += 1;
                await sockById.save();
            }
            await Basket.destroy({ where: { id: sockId, userId: userId } });
            return res.status(200).json({ message: 'ok', status: 200 });
        } else {
            return res.status(404).json({ message: 'Sock not found', status: 404 });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message, status: 500 });
    }
});

router.delete('/api/clearBasket', async (req, res) => {
    try {
      const { userId } = req.query;
      await Basket.destroy({ where: { userId: userId } });
      return res.status(200).json({ message: 'ok', status: 200 });
    } catch (error) {
      return res.status(500).json({ message: error.message, status: 500 });
    }
  });

module.exports = router;
