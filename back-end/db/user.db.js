const user = require('../dataModel/user.dataModel');
const watchlistDataModel = require('../dataModel/watchlist.dataModel');

async function createUser({ key }) {
  return await user.findOneAndUpdate(
    { key },
    { key },
    { upsert: true }
  );
}

module.exports = {
  createUser,
};