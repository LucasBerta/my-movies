import { useEffect } from 'react';
import { connect } from 'react-redux';
import MovieCard from '../../core/components/movieCard/MovieCard';
import { handleFetchDiscover } from '../../redux/actions/movies.action';
import './search.scss';

function Search({ dispatch, movies }) {
  useEffect(() => {
    dispatch(handleFetchDiscover());
  }, []);

  return (
    <div className='search'>
      {movies.results?.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

const mapStateToProps = ({ dispatch, movies }) => {
  return {
    dispatch,
    movies,
  }
};

export default connect(mapStateToProps)(Search);