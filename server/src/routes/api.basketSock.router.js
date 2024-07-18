/* eslint-disable import/newline-after-import */
/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
/* eslint-disable indent */
const express = require('express');
const router = express.Router();
const { Basket, Sock } = require('../../db/models/index');

router.get('/api/all/basket', async (req, res) => {
    try {
      const { userId } = req.query;
      const baskets = await Basket.findAll({ 
        where: { userId: userId },
        include: [{
          model: Sock,
          attributes: ['id', 'img', 'pattern', 'color', 'price', 'quantity'],
        }],
      });
      res.json({ baskets, message: 'OK', status: 200});
    } catch (error) {
      res.json({ message: error.message, status: 500});
    }
});

module.exports = router;
