const { Favorite } = require('../../db/models');

// eslint-disable-next-line consistent-return
async function checkFavorites(req, res, next) {
  try {
    const { userId, sockId } = req.body;
    const existingEntry = await Favorite.findOne({
      where: { userId, sockId },
    });

    if (!existingEntry) {
      return next();
    }
  } catch (error) {
    console.log('Носок уже в избранном');
    return res.status(400).json({ error: 'Носок уже в избранном' });
  }
}

module.exports = { checkFavorites };
