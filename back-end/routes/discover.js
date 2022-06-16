const router = require('express').Router();

const { api } = require('../api');
const { transformImgPaths, handleError } = require('../common/util');

router.get('/discover/movie', (req, res) => {
  api.get('/discover/movie').then(response => {
    const _movies = transformImgPaths(response.data);
    res.send(_movies);
  }).catch(err => handleError(res, err));
});

module.exports = router;