import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';
import './App.scss';
import Search from './features/search/Search';
import { handleAuth } from './redux/actions/auth.action';

function App({ dispatch }) {
  const [cookies, setCookie] = useCookies([]);
  let date = new Date();
  const expires = new Date(new Date(date.getFullYear() + 10), 0, 1);
  const userKey = cookies.key || Date.now();
  setCookie('key', userKey, { expires });

  useEffect(() => {
    dispatch(handleAuth(userKey));
  }, [dispatch, userKey]);

  return (
    <div className="App">
      <Search />
    </div>
  );
}

const mapStateToProps = ({ dispatch }) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps)(App);
