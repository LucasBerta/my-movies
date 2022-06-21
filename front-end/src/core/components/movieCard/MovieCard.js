import { connect } from "react-redux";
import reactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './MovieCard.scss';
import { useCallback, useEffect, useState } from 'react';
import { fetchMovie, fetchMovieCredits } from '../../api/movies';
import NoImage from '../../assets/No-Image.png';
import NoImageLandscape from '../../assets/No-Image-Landscape.jpg';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { IconButton, Tooltip } from '@mui/material';
import { updateFavorite, updateWatchlist } from "../../api/watchlist";
import { fetchUserConfigByMovie } from "../../api/userConfigByMovie";

function MovieCard({ auth, movie }) {
  const [cardDetailOpen, setCardDetailOpen] = useState(false);
  const releaseDate = new Date(movie.release_date);
  const formattedDate = releaseDate.toLocaleDateString('en-IE', { dateStyle: 'long' })
  const { loggedUserId } = auth;

  function closeCardDetail() {
    removeCardDetailPageStyle();
    setCardDetailOpen(false);
  }

  return (
    <>
      {cardDetailOpen && <MovieCardDetail movie={movie} onBackdropClick={closeCardDetail} loggedUserId={loggedUserId} />}
      <div className='movie-card' onClick={() => setCardDetailOpen(true)}>
        <div
          className='movie-card__poster'
          style={{ backgroundImage: !!movie.poster_path ? `url(${movie.poster_path})` : `url(${NoImage})` }}
        ></div>
        <div className='movie-card__details'>
          <Rating movie={movie} />
          <h3 className='movie-card__details--title'>{movie.title}</h3>
          <h5 className='movie-card__details--release-date'>{formattedDate}</h5>
        </div>
      </div>
    </>
  )
}

function Rating({ movie }) {
  const circleRadius = (46 / 2) - 6; //Values taken from scss file. 6px stroke width.
  const circlePosition = circleRadius + 3; //6px stroke width / 2.
  const circleDashOffset = 106.7 - (106.7 * (movie.vote_average * 10) / 100); //106.7 offset point.
  const { mainRatingColor, backgroundRatingColor } = getRatingColor(movie);

  return (
    <Tooltip title='Average user rating' disableInteractive>
      <div className='movie-card__details--rating-box'>
        <div className='movie-card__details--rating-percentage'>
          <svg>
            <circle cx={circlePosition} cy={circlePosition} r={circleRadius} style={{ stroke: backgroundRatingColor }}></circle>
            <circle cx={circlePosition} cy={circlePosition} r={circleRadius} style={{ strokeDashoffset: circleDashOffset, stroke: mainRatingColor }}></circle>
            <circle cx={circlePosition} cy={circlePosition} r={circleRadius}></circle>
          </svg>
        </div>
        <div className='movie-card__details--rating-text'>{parseFloat(movie.vote_average).toFixed(1)}</div>
      </div>
    </Tooltip>
  );
}

function MovieCardDetail({ loggedUserId, movie, onBackdropClick = () => { } }) {
  const [movieDetails, setMovieDetails] = useState({});
  const [userConfigByMovie, setUserConfigByMovie] = useState({});
  const { topDirector, topWriter, topActor } = getTopCast(movieDetails);
  const formattedRuntime = `${Math.floor(movieDetails.runtime / 60)}h ${(movieDetails.runtime % 60)}m`;

  const getUserConfigByMovie = useCallback(() => {
    fetchUserConfigByMovie(loggedUserId, movie.id).then(response => {
      setUserConfigByMovie(response.data);
    });
  }, [loggedUserId, movie]);

  useEffect(() => {
    fetchMovie(movie.id).then(response => {
      fetchMovieCredits(movie.id).then(credits => {
        setMovieDetails({ ...response.data, credits: credits.data });
        getUserConfigByMovie();
      });
    });

    function handleOnPressEscape(event) {
      if (event.key === 'Escape') {
        onBackdropClick();
      }
    }

    document.addEventListener('keydown', handleOnPressEscape);
    return () => document.removeEventListener('keydown', handleOnPressEscape);
  }, [movie, onBackdropClick, getUserConfigByMovie]);

  setCardDetailPageStyle();

  ///////////////////////////
  function isMovieOnWatchlist() {
    return userConfigByMovie.isOnWatchlist;
  }

  function isMovieOnFavorites() {
    return userConfigByMovie.IsOnFavorites;
  }

  function switchWatchlist(movie) {
    updateWatchlist(loggedUserId, movie.id).then(() => {
      getUserConfigByMovie();
    });
  }

  function switchFavorite(movie) {
    updateFavorite(loggedUserId, movie.id).then(() => {
      getUserConfigByMovie();
    });
  }

  return reactDOM.createPortal(
    <div className='movie-card__detail'>
      <div className='movie-card__detail--container'>
        <i className='movie-card__detail--close fa-solid fa-xmark' onClick={onBackdropClick}></i>
        <div className='movie-card__detail--background-poster'
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.97) 22vw, rgba(0, 0, 0, 0.7)),
                              ${!!movie.backdrop_path ? `url(${movie.backdrop_path})` : `url(${NoImageLandscape})`}`
          }}
        >
        </div>

        <div className='movie-card__detail--poster'
          style={{ backgroundImage: !!movie.poster_path ? `url(${movie.poster_path})` : `url(${NoImage})` }}
        >

        </div>
        <div className='movie-card__detail--title-container'>
          <h2 className='movie-card__detail--title'>
            {movieDetails.title}
            &nbsp;
            <span>({new Date(movieDetails.release_date).getFullYear()})</span>
          </h2>
          <div className='movie-card__detail--subtitle'>
            <h5>{new Date(movieDetails.release_date).toLocaleDateString('en-IE', { dateStyle: 'short' })}</h5>
            <h5>{movieDetails.genres?.map(genre => genre.name).join(', ')}</h5>
            <h5>{formattedRuntime}</h5>
          </div>
        </div>

        <div className='movie-card__detail--actions'>
          {movieDetails.id && <Rating movie={movieDetails} />}
          <IconButton onClick={() => switchWatchlist(movie)}>
            {isMovieOnWatchlist()
              ?
              <Tooltip title='Remove from watchlist' disableInteractive>
                <BookmarkIcon />
              </Tooltip>
              :
              <Tooltip title='Add to watchlist' disableInteractive>
                <BookmarkBorderIcon />
              </Tooltip>
            }
          </IconButton>
          <IconButton onClick={() => switchFavorite(movie)}>
            {isMovieOnFavorites()
              ?
              <Tooltip title='Remove to favorites' disableInteractive>
                <FavoriteIcon />
              </Tooltip>
              :
              <Tooltip title='Add to favorites' disableInteractive>
                <FavoriteBorderIcon />
              </Tooltip>
            }
          </IconButton>
        </div>

        <h3 className='movie-card__detail--tagline'>{movieDetails.tagline}</h3>

        <div className='movie-card__detail--synopsis'>
          <h3>Synopsis</h3>
          <p>{movieDetails.overview}</p>
        </div>

        <div className='movie-card__detail--cast'>
          <div className='movie-card__detail--director'>
            <h3>{topDirector.name || 'N/A'}</h3>
            <p>{topDirector.gender === 1 ? 'Directress' : 'Director'}</p>
          </div>
          <div className='movie-card__detail--writer'>
            <h3>{topWriter.name || 'N/A'}</h3>
            <p>Writer</p>
          </div>
          <div className='movie-card__detail--actor'>
            <h3>{topActor.name || 'N/A'}</h3>
            <p>{topActor.gender === 1 ? 'Actress' : 'Actor'}</p>
          </div>
        </div>

      </div>
      <div
        className='movie-card__detail--backdrop'
        onClick={onBackdropClick}
      ></div>
    </div>,
    document.body
  );
}

// LOCAL FUNCTIONS

function getTopCast(movie) {
  return {
    topDirector: getTopDirector(movie),
    topWriter: getTopWriter(movie),
    topActor: getTopActor(movie)
  }
}

function getTopDirector(movie) {
  if (!movie || !movie.credits) return {};

  if (!movie?.credits?.crew || movie?.credits?.crew.length === 0) return {};

  return movie?.credits?.crew?.reduce((prev, curr) => {
    return curr.department === 'Directing' && curr.popularity > prev.popularity ? curr : prev;
  });
}

function getTopWriter(movie) {
  if (!movie || !movie.credits) return {};

  if (!movie?.credits?.crew || movie?.credits?.crew.length === 0) return {};

  return movie?.credits?.crew?.reduce((prev, curr) => {
    return curr.department === 'Writing' && curr.popularity > prev.popularity ? curr : prev;
  });
}

function getTopActor(movie) {
  if (!movie || !movie.credits) return {};

  if (!movie?.credits?.cast || movie?.credits?.cast.length === 0) return {};

  return movie?.credits?.cast?.reduce((prev, curr) => {
    return curr.department === 'Acting' && curr.popularity > prev.popularity ? curr : prev;
  });
}

function setCardDetailPageStyle() {
  const body = document.body;
  const initialBodyPaddingRight = parseFloat(window.getComputedStyle(body, null).getPropertyValue('padding-right').replace('px', ''));
  const paddingRight = window.innerWidth - document.documentElement.clientWidth + initialBodyPaddingRight;

  if (!!paddingRight) {
    body.style.paddingRight = `${paddingRight}px`;
  }

  body.style.overflow = 'hidden';
}

function removeCardDetailPageStyle() {
  document.body.style.removeProperty('padding-right');
  document.body.style.removeProperty('overflow');
}

function getRatingColor({ vote_average }) {
  if (vote_average < 4) return { mainRatingColor: '#b81d13', backgroundRatingColor: '#f77f77' };
  if (vote_average < 7) return { mainRatingColor: '#efb700', backgroundRatingColor: '#ffecb0' };
  return { mainRatingColor: '#008450', backgroundRatingColor: '#62c49e' };
}

/////////////////////////
const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps)(MovieCard);

MovieCard.prototype = {
  movie: PropTypes.object,
};