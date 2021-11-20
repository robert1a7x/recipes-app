import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import '../style/Header.css';

export default function Header({ title, searchButton }) {
  const [button, setButton] = useState(false);
  const history = useHistory();
  return (
    <section className="parent-header">
      <header className="header-nav">
        <h1 data-testid="page-title">{title}</h1>
        <button
          className="btn-profile-search search-profile"
          data-testid="profile-top-btn"
          type="button"
          onClick={ () => history.push('/perfil') }
          src={ profileIcon }
        >
          <img
            src={ profileIcon }
            alt="profile icon"
          />
        </button>
        {searchButton && (
          <button
            className="btn-profile-search search-icon"
            type="button"
            data-testid="search-top-btn"
            onClick={ () => setButton(!button) }
            src={ searchIcon }
          >
            <img
              src={ searchIcon }
              alt="search icon"
            />
          </button>)}

        {button && <SearchBar />}
      </header>
    </section>
  );
}

Header.propTypes = {
  props: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  searchButton: PropTypes.string.isRequired,
};
