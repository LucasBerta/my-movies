const { default: mongoose, mongo } = require("mongoose");

const favorite = new mongoose.Schema({
  userId: { type: String, required: true },
  movies: { type: [String], required: true, default: [] },
});

module.exports = mongoose.model('favorite', favorite);