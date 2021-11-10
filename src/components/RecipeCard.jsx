import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <Link
        to={ recipe.idMeal
          ? `/comidas/${recipe.idMeal}`
          : `/bebidas/${recipe.idDrink}` }
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt="Recipe Thumb"
        />
        <h3
          data-testid={ `${index}-card-name` }
        >
          { recipe.strMeal || recipe.strDrink }
        </h3>
      </Link>
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};
