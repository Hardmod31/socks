/* eslint-disable import/newline-after-import */
/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
/* eslint-disable indent */
const express = require('express');
const router = express.Router();
const { Sock } = require('../../db/models/index');

router.get('/api/all/socks', async (req, res) => {
    try {
      const socks = await Sock.findAll();
      res.json({ socks, message: 'OK', status: 200});
    } catch (error) {
        res.json({ message: error, status: 500});
    }
});

module.exports = router;