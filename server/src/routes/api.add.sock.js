/* eslint-disable import/newline-after-import */
/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
/* eslint-disable indent */
const express = require('express');
const router = express.Router();
const { Sock } = require('../../db/models/index');

router.post('/api/add/sock', async (req, res) => {
    try {
      const { color, img, pattern, price, quantity, userId } = req.body.data;
      // if (!color || !img || !pattern || !price || !quantity || !userId) {
      //   console.log(req.body);
      //   return res.status(400).json({ message: 'All fields are required' });
      // }
      const sock = await Sock.create({
        color,
        img,
        pattern,
        price: Number(price),
        quantity,
        userId: Number(userId),
      });
      res.json({ values: sock, message: 'OK', status: 200 });
    } catch (error) {
      console.error('Error creating sock:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  });

module.exports = router;
