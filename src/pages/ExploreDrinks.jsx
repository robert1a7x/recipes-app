import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchAPI from '../helpers/fetchAPI';

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
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
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
