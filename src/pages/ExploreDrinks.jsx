import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchAPI from '../helpers/fetchAPI';
import surprise from '../images/surprise.jpg';
import Ingredients from '../images/ingredientes.jpeg';

export default function ExploreDrinks() {
  const history = useHistory();

  async function generateRandomRecipe() {
    const recipe = await fetchAPI('drinks', 'random');
    const randomId = await `/bebidas/${recipe[0].idDrink}`;
    history.push(randomId);
  }

  return (
    <div>
      <Header title="Explorar Bebidas" />
      <div className="parent-explore">
        <Link
          to="/explorar/bebidas/ingredientes"
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
