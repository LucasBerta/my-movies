const favoriteDataModel = require("../dataModel/favorite.dataModel");

async function updateUserFavorite(userId, movieId) {
  const isInFavorite = !!await favoriteDataModel.findOne({ userId, movies: movieId.toString() });
  console.log(isInFavorite);

  const favorite = await favoriteDataModel.findOneAndUpdate(
    { userId },
    { [isInFavorite ? '$pull' : '$push']: { movies: isInFavorite ? movieId.toString() : [movieId.toString()] } },
    { upsert: true, new: true },
  );

  return favorite;
}

module.exports = {
  updateUserFavorite,
};