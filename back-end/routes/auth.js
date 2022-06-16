const { handleAsyncFunction } = require('../common/util');
const { getUserByKey } = require('../service/user.service');

const router = require('express').Router();

router.get('/auth/:userKey', async (req, res) => {
  await handleAsyncFunction(res, async () => {
    const user = await getUserByKey(req.params.userKey);
    res.send({ userId: user._id });
  });
});

module.exports = router;