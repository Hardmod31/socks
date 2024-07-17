/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const generateToken = require('../utils/generateToken');
const cookiesConfig = require('../configs/cookiesConfig');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!(email || password)) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({ message: 'Incorrect user or password' });
  }

  const correctPass = await bcrypt.compare(password, user.password);
  if (!correctPass) {
    return res.status(401).json({ message: 'Incorrect user or password' });
  }

  const plainUser = user.get();
  delete plainUser.password;

  const { accessToken, refreshToken } = generateToken({ user: plainUser });

  res
    .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
    .cookie('accessToken', accessToken, cookiesConfig.access)
    .json({ user: plainUser, accessToken });
});

router.post('/registration', async (req, res) => {
  const { username, email, password} = req.body;

  if (!(username || email || password)) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }

  try {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { username, email, password: await bcrypt.hash(password, 10) },
    });
    if (!created) {
      return res.status(403).json({ message: 'User with this email already exists' });
    }
    const plainUser = user.get();
    delete plainUser.password;
    const { accessToken, refreshToken } = generateToken({ user: plainUser });
    res
      .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
      .cookie('accessToken', accessToken, cookiesConfig.access)
      .json({ user: plainUser, accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/logout', (req, res) => {
  res
    .clearCookie('accessToken').clearCookie('refreshToken').sendStatus(200);
});

module.exports = router;
