const { default: mongoose } = require("mongoose");

const user = new mongoose.Schema({
  key: { type: Number },
});

module.exports = mongoose.model('user', user);