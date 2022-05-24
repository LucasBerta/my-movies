import reactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { API_KEY, BASE_IMAGE_URL_500 } from '../../api';
import './MovieCard.scss';
import { useEffect, useState } from 'react';
import { fetchMovie, fetchMovieCredits } from '../../api/movies';
import Button from '../shared/Button';

function MovieCard({ movie }) {
  const [cardDetailOpen, setCardDetailOpen] = useState(false);
  const releaseDate = new Date(movie.release_date);
  const formattedDate = releaseDate.toLocaleDateString('en-IE', { dateStyle: 'long' })

  console.log(new Date().getMilliseconds());

  function closeCardDetail() {
    removeCardDetailPageStyle();
    setCardDetailOpen(false);
  }

  return (
    <>
      {cardDetailOpen && <MovieCardDetail movie={movie} onBackdropClick={closeCardDetail} />}
      <div className='movie-card' onClick={() => setCardDetailOpen(true)}>
        <div className='movie-card__poster' style={{ backgroundImage: `url(${BASE_IMAGE_URL_500}${movie.poster_path}?api_key=${API_KEY})` }}></div>
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
  );
}

function MovieCardDetail({ movie, onBackdropClick = () => { } }) {
  const [movieDetails, setMovieDetails] = useState({});
  const { topDirector, topWriter, topActor } = getTopCast(movieDetails);
  const formattedRuntime = `${Math.floor(movieDetails.runtime / 60)}h ${(movieDetails.runtime % 60)}m`;
  console.log(movieDetails)

  useEffect(() => {
    fetchMovie(movie.id).then(response => {
      fetchMovieCredits(movie.id).then(credits => {
        setMovieDetails({ ...response.data, credits: credits.data });
      });
    });
  }, []);

  setCardDetailPageStyle();

  return reactDOM.createPortal(
    <div className='movie-card__detail'>
      <div className='movie-card__detail--container'>
        <i className='movie-card__detail--close fa-solid fa-xmark' onClick={onBackdropClick}></i>
        <div className='movie-card__detail--background-poster'
          style={{ backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.97) 22vw, rgba(0, 0, 0, 0.7)), url(${BASE_IMAGE_URL_500}${movie.backdrop_path}?api_key=${API_KEY})` }}
        >
        </div>

        <div className='movie-card__detail--poster'
          style={{ backgroundImage: `url(${BASE_IMAGE_URL_500}${movie.poster_path}?api_key=${API_KEY})` }}
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
          <Button icon><i className='fa-regular fa-bookmark'></i></Button>
          <Button icon><i className='fa-regular fa-eye'></i></Button>
          <Button icon><i className='fa-regular fa-heart'></i></Button>
        </div>

        <h3 className='movie-card__detail--tagline'>{movieDetails.tagline}</h3>

        <div className='movie-card__detail--synopsis'>
          <h3>Synopsis</h3>
          <p>{movieDetails.overview}</p>
        </div>

        <div className='movie-card__detail--cast'>
          <div className='movie-card__detail--director'>
            <h3>{topDirector.name}</h3>
            <p>{topDirector.gender === 1 ? 'Directress' : 'Director'}</p>
          </div>
          <div className='movie-card__detail--writer'>
            <h3>{topWriter.name}</h3>
            <p>Writer</p>
          </div>
          <div className='movie-card__detail--actor'>
            <h3>{topActor.name}</h3>
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

  return movie?.credits?.crew?.reduce((prev, curr) => {
    return curr.department === 'Directing' && curr.popularity > prev.popularity ? curr : prev;
  });
}

function getTopWriter(movie) {
  if (!movie || !movie.credits) return {};

  return movie?.credits?.crew?.reduce((prev, curr) => {
    return curr.department === 'Writing' && curr.popularity > prev.popularity ? curr : prev;
  });
}

function getTopActor(movie) {
  if (!movie || !movie.credits) return {};

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
export default MovieCard;

MovieCard.prototype = {
  movie: PropTypes.object,
};