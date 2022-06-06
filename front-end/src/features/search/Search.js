import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import MovieCard from '../../core/components/movieCard/MovieCard';
import { handleFetchDiscover, handleSearchMovie } from '../../redux/actions/movies.action';
import './search.scss';

import axios from "axios";

function Search({ dispatch, movies }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    function handleSearch() {
      if (!query) {
        dispatch(handleFetchDiscover());
      } else {
        dispatch(handleSearchMovie(query, 1));
      }
    }

    const timeoutId = setTimeout(handleSearch, 500);
    return () => clearTimeout(timeoutId);
  }, [query, dispatch]);

  return (
    <div className='search'>
      <form className='search-form' noValidate autoComplete='off'>
        <TextField
          id="search"
          label="Type to search"
          variant="standard"
          fullWidth
          inputProps={{ style: { fontSize: '1.6rem' } }}
          InputLabelProps={{ style: { fontSize: '1.6rem' } }}
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </form>
      <div className='search__movie-list'>
        {movies.results?.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
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