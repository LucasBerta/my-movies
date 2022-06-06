const router = require('express').Router();
const axios = require('axios');
const { api } = require('../api');
const { transformImgPaths, handleError, transformImgPath } = require('../common/util');

// Search movies
router.get('/search/movie', (req, res) => {
  api.get(`${req.originalUrl}`).then(response => {
    const _movies = transformImgPaths(response.data);
    res.send(_movies);
  }).catch(err => handleError(res, err));
});

// Movie
router.get('/movie/:id', (req, res) => {
  api.get(`/movie/${req.params.id}`, params = req.params).then(response => {
    const _movie = transformImgPath(response.data);
    res.send(_movie);
  }).catch(err => handleError(res, err));
});

// Credits
router.get('/movie/:id/credits', (req, res) => {
  api.get(`/movie/${req.params.id}/credits`).then(response => {
    res.send(response.data);
  }).catch(err => handleError(res, err));
});

module.exports = router;