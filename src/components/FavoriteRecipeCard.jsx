import React, { useState } from 'react';

import PropTypes from 'prop-types';
import copy from 'clipboard-copy';

import { Link } from 'react-router-dom';

import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipeCard({ recipe, index }) {
  const [clicked, setClicked] = useState(false);
  const [recipes, setFilterRecipe] = useState(JSON.parse(
    localStorage.getItem('favoriteRecipes'),
  ));

  const {
    image,
    name,
    category,
    area,
    alcoholicOrNot,
    id,
    type,
  } = recipe;

  const excludeFavorite = () => {
    const filterRecipe = recipes.filter((r) => r.name !== name);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filterRecipe));
    setFilterRecipe(filterRecipe);
    document.location.reload(true);
  };

  return (
    <div>
      <Link to={ `/${type}s/${id}` }>
        <img
          style={ { width: '200px' } }
          src={ `${image}` }
          data-testid={ `${index}-horizontal-image` }
          alt={ `Imagem de ${type}` }
        />
      </Link>
      <Link to={ `/${type}s/${id}` }>
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>
      </Link>
      {(type === 'comida') ? (
        <div>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${area} - ${category}`}
          </p>
        </div>)
        : (
          <p data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</p>)}
      <button
        type="button"
        src={ shareIcon }
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => {
          copy(`http://localhost:3000/${type}s/${id}`);
          setClicked(true);
        } }
      >
        {clicked ? 'Link copiado!' : <img src={ shareIcon } alt="Share icon" />}
      </button>
      <button
        type="button"
        src={ blackHeartIcon }
        data-testid={ `${index}-horizontal-favorite-btn` }
        onClick={ () => excludeFavorite() }
      >
        <img src={ blackHeartIcon } alt={ blackHeartIcon } />
      </button>
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};
