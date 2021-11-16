import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, useHistory } from 'react-router-dom';
import fetchAPI from '../helpers/fetchAPI';
import { useAppContext } from '../context/Provider';

export default function IngredientCard({ ingredient, index }) {
  const history = useHistory();
  const { pathname } = useLocation();
  const { setData } = useAppContext();
  const { strIngredient, strIngredient1 } = ingredient;
  const srcMeal = `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`;
  const srcDrink = `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`;

  async function filterByIngredient() {
    if (pathname.includes('comidas')) {
      const response = await fetchAPI('meals', 'ingredient', strIngredient);
      await setData(response);
      history.push('/comidas');
    } else {
      const response = await fetchAPI('drinks', 'ingredient', strIngredient1);
      await setData(response);
      history.push('/bebidas');
    }
  }

  return (
    <Link
      to={ ' ' }
      onClick={ () => filterByIngredient() }
    >
      <div data-testid={ `${index}-ingredient-card` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ strIngredient ? srcMeal : srcDrink }
          alt="Ingredient Thumb"
        />
        <h3 data-testid={ `${index}-card-name` }>
          { strIngredient || strIngredient1 }
        </h3>
      </div>
    </Link>
  );
}

IngredientCard.propTypes = {
  ingredient: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};
