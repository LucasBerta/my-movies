const favoriteDataModel = require("../dataModel/favorite.dataModel");
const watchlistDataModel = require("../dataModel/watchlist.dataModel");

async function getUserConfigByMovie(userId, movieId) {
  const watchlist = await watchlistDataModel.findOne({ userId, movies: [movieId] });
  const favorite = await favoriteDataModel.findOne({ userId, movies: [movieId] });

  return {
    userId,
    isOnWatchlist: !!watchlist,
    IsOnFavorites: !!favorite,
  };
}

module.exports = {
  getUserConfigByMovie,
};