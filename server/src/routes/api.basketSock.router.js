/* eslint-disable import/newline-after-import */
/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
/* eslint-disable indent */
const express = require('express');
const router = express.Router();
const { Basket } = require('../../db/models/index');

router.get('/api/all/basket', async (req, res) => {
    try {
      const { userId } = req.query;
      const baskets = await Basket.findAll({ where: { userId: userId } });
      res.json({ baskets, message: 'OK', status: 200});
    } catch (error) {
        res.json({ message: error, status: 500});
    }
});

module.exports = router;
