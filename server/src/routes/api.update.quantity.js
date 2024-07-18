const express = require('express');
const router = express.Router();
const { Sock, Basket } = require('../../db/models');

router.put('/api/updateSockQuantity', async (req, res) => {
  try {
    const { sockId, userId, action } = req.body.data;
    const basketItem = await Basket.findOne({ where: { id: sockId, userId: userId } });
    const sockItem = await Sock.findOne({where: { id: basketItem?.dataValues?.sockId, userId: userId}})
    if (basketItem) {
      if (action === 'increment') {
        if (sockItem) {
          sockItem.quantity += 1;
          await sockItem.save();
        }
      } else if (action === 'decrement') {
        if (sockItem) {
          sockItem.quantity -= 1;
          await sockItem.save();
        }
      }
      
      return res.status(200).json({ message: 'ok', dto: sockItem.dataValues, status: 200 });
    } else {
      return res.status(404).json({ message: 'not found', status: 404 });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
});

module.exports = router;