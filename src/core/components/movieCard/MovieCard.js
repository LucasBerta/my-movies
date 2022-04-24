import PropTypes from 'prop-types';
import { API_KEY, BASE_IMAGE_URL_500 } from '../../api';
import './MovieCard.scss';

function getRatingColor({ vote_average }) {
  if (vote_average < 4) return { mainRatingColor: '#b81d13', backgroundRatingColor: '#f77f77' };
  if (vote_average < 7) return { mainRatingColor: '#efb700', backgroundRatingColor: '#ffecb0' };
  return { mainRatingColor: '#008450', backgroundRatingColor: '#62c49e' };
}

function MovieCard({ movie }) {
  const releaseDate = new Date(movie.release_date);

  return (
    <div className='movie-card'>
      <div className='movie-card__poster' style={{ backgroundImage: `url(${BASE_IMAGE_URL_500}${movie.poster_path}?api_key=${API_KEY})` }}></div>
      <div className='movie-card__details'>
        <Rating movie={movie} />
        <h3 className='movie-card__details--title'>{movie.title}</h3>
        <h5 className='movie-card__details--release-date'>{releaseDate.toLocaleDateString('en-IE', { dateStyle: 'long' })}</h5>
      </div>
    </div>
  )
}

function Rating({ movie }) {
  const circleRadius = (46 / 2) - 6; //Values taken from scss file. 6px stroke width.
  const circlePosition = circleRadius + 3; //6px stroke width / 2.
  const circleDashOffset = 106.7 - (106.7 * (movie.vote_average * 10) / 100); //106.7 offset point.
  const { mainRatingColor, backgroundRatingColor } = getRatingColor(movie);
  console.log(mainRatingColor, backgroundRatingColor);

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

export default MovieCard;

MovieCard.prototype = {
  movie: PropTypes.object,
};