const express = require('express');
const router = express.Router();
const { Sock, Basket } = require('../../db/models');

router.put('/api/updateSockQuantity', async (req, res) => {
  try {
    const { sockId, userId, action } = req.body;
    const basketItem = await Basket.findOne({ where: { sockId: sockId, userId: userId } });
    if (basketItem) {
      if (action === 'increment') {
        basketItem.quantity += 1;
      } else if (action === 'decrement') {
        basketItem.quantity -= 1;
      }
      await basketItem.save();
      return res.status(200).json({ message: 'ok', status: 200 });
    } else {
      return res.status(404).json({ message: 'Basket item not found', status: 404 });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
});

module.exports = router;