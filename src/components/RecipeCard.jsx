import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeCard({ recipe, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ recipe.strMealThumb
          ? recipe.strMealThumb : recipe.strDrinkThumb }
        alt="Recipe Thumb"
      />
      <h3
        data-testid={ `${index}-card-name` }
      >
        { recipe.strMeal ? recipe.strMeal : recipe.strDrink }
      </h3>
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};
