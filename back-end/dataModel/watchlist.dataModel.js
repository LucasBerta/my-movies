const { default: mongoose, mongo } = require("mongoose");

const watchlist = new mongoose.Schema({
  userId: { type: String, required: true },
  movies: { type: [String], required: true, default: [] },
});

module.exports = mongoose.model('watchlist', watchlist);