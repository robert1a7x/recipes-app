import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';

import fetchAPI from '../helpers/fetchAPI';

export default function ExploreFoods() {
  const history = useHistory();

  async function generateRandomRecipe() {
    const recipe = await fetchAPI('meals', 'random');
    const randomId = `/comidas/${recipe[0].idMeal}`;
    history.push(randomId);
  }

  return (
    <div>
      <Header title="Explorar Comidas" />
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>
      </Link>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => generateRandomRecipe() }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}
