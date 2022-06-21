const watchlistDataModel = require("../dataModel/watchlist.dataModel");

async function updateUserWatchlist(userId, movieId) {
  const isInWatchlist = !!await watchlistDataModel.findOne({ userId, movies: movieId.toString() });

  const watchlist = await watchlistDataModel.findOneAndUpdate(
    { userId },
    { [isInWatchlist ? '$pull' : '$push']: { movies: isInWatchlist ? movieId.toString() : [movieId.toString()] } },
    { upsert: true, new: true },
  );

  return watchlist;
}

module.exports = {
  updateUserWatchlist,
};