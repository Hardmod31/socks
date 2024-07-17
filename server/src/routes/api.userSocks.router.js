/* eslint-disable import/newline-after-import */
/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
/* eslint-disable indent */
const express = require('express');
const router = express.Router();
const { Sock } = require('../../db/models/index');
const { where } = require('sequelize');

router.get('/api/all/usersocks/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const item = await Sock.findAll({ where: { userId: userId } });
      if (item) {
        res.json({ item, message: 'OK', status: 200 });
      };
    } catch (error) {
        res.json({ message: error, status: 500 });
    }
});

module.exports = router;