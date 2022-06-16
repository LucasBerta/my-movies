const userDataModel = require("../dataModel/user.dataModel");

async function getUserByKey(key) {
  const user = await userDataModel.findOne({ key });
  return user;
}

module.exports = {
  getUserByKey,
};