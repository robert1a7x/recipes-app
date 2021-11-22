import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';

import fetchAPI from '../helpers/fetchAPI';
import location from '../images/localidade.jpeg';
import Ingredients from '../images/ingredientes.jpeg';
import surprise from '../images/surprise.jpg';

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
      <div className="parent-explore">
        <Link
          to="/explorar/comidas/ingredientes"
          className="item-explore"
        >
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            <img src={ Ingredients } alt={ Ingredients } className="img-explore" />
            <br />
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area" className="item-explore">
          <button
            type="button"
            data-testid="explore-by-area"
          >
            <img src={ location } alt={ location } className="img-explore" />
            <br />
            Por Local de Origem
          </button>
        </Link>
        <div className="item-explore">
          <button
            type="button"
            data-testid="explore-surprise"
            onClick={ () => generateRandomRecipe() }
          >
            <img src={ surprise } alt={ surprise } className="img-explore" />
            <br />
            Me Surpreenda!
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
