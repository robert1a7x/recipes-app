import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

export default function IngredientCard({ ingredient, index }) {
  const { strIngredient, strIngredient1 } = ingredient;
  const srcMeal = `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`;
  const srcDrink = `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`;
  return (
    <div data-testid={ `${index}-ingredient-card` }>
      {/* <Link
        to={ recipe.idMeal
          ? `/comidas/${recipe.idMeal}`
          : `/bebidas/${recipe.idDrink}` }
      > */}
      <img
        data-testid={ `${index}-card-img` }
        src={ strIngredient ? srcMeal : srcDrink }
        alt="Ingredient Thumb"
      />
      <h3
        data-testid={ `${index}-card-name` }
      >
        { strIngredient || strIngredient1 }
      </h3>
      {/* </Link> */}
    </div>
  );
}

IngredientCard.propTypes = {
  ingredient: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};
