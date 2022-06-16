const { updateUserFavorite } = require('../service/favorite.service');
const { getUserConfigByMovie } = require('../service/userConfigByMovie.service');
const { updateUserWatchlist } = require('../service/watchlist.service');

const router = require('express').Router();

router.get('/user/:userId/movie/:movieId/settings', async (req, res) => {
  const config = await getUserConfigByMovie(req.params.userId, req.params.movieId);
  res.send(config);
});

router.put('/user/:id/watchlist', async (req, res) => {
  const userWatchlist = await updateUserWatchlist(req.params.id, req.body.movieId, req.body.value);
  res.send(userWatchlist);
});

router.put('/user/:id/favorite', async (req, res) => {
  const userWatchlist = await updateUserFavorite(req.params.id, req.body.movieId, req.body.value);
  res.send(userWatchlist);
});

module.exports = router;