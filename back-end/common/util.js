const { BASE_IMAGE_URL, API_KEY } = require("../api");

function getPosterPath(movie) {
  if (!!movie.poster_path) {
    return `${BASE_IMAGE_URL}${movie.poster_path}?api_key=${API_KEY}`;
  }
  return movie.poster_path;
}

function getBackdropPath(movie) {
  if (!!movie.backdrop_path) {
    return `${BASE_IMAGE_URL}${movie.backdrop_path}?api_key=${API_KEY}`;
  }
  return movie.backdrop_path;
}

/////////////////////////////////////////////////
function transformImgPaths(movies) {
  let _movies = Object.assign(movies);
  _movies.results = movies.results.map(movie => {
    let _movie = Object.assign(movie);
    _movie.poster_path = getPosterPath(movie);
    _movie.backdrop_path = getBackdropPath(movie);
    return _movie;
  });

  return _movies;
}

function transformImgPath(movie) {
  let _movie = Object.assign(movie);
  _movie.poster_path = getPosterPath(movie);
  _movie.backdrop_path = getBackdropPath(movie);

  return _movie;
}

function handleError(res, err) {
  if (!!err.response) {
    res.status(err.response.status);
    res.statusMessage = err.response.statusText;
    res.send(err.response.data);
  } else {
    res.send(err);
  }
}

module.exports = {
  transformImgPaths,
  transformImgPath,
  handleError,
};