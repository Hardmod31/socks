/* eslint-disable import/newline-after-import */
/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
/* eslint-disable indent */
const express = require('express');
const router = express.Router();
const { Sock } = require('../../db/models/index');

router.get('/api/one/sock/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const item = await Sock.findOne({ where: { id: id } });
      if (item) {
        res.json({ item, message: 'OK', status: 200 });
      };
    } catch (error) {
        res.json({ message: error, status: 500 });
    }
});

module.exports = router;