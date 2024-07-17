/* eslint-disable import/newline-after-import */
/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
/* eslint-disable indent */
const express = require('express');
const router = express.Router();
const { Basket, Sock } = require('../../db/models/index');

router.post('/api/addsocks/basket', async (req, res) => {
    try {
        const { sockId, userId } = req.body.data;

        if (!sockId || !userId) {
            return res.status(400).json({ message: 'sockId and userId are required', status: 400 });
        }

        const sockById = await Sock.findOne({ where: { id: sockId } });

        if (!sockById) {
            return res.status(404).json({ message: 'Sock not found', status: 404 });
        }

        if (sockById.quantity > 0) {
            await Basket.create({ userId, sockId });
            sockById.quantity -= 1;
            await sockById.save();
            res.status(200).json({ message: 'ok', status: 200 });
        } else {
            res.status(400).json({ message: 'Sock is out of stock', status: 400 });
        }
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 });
    }
});

module.exports = router;

