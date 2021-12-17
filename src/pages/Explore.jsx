import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import drink from '../images/drink.jpg';
import meal from '../images/meal.jpg';

export default function Explore() {
  return (
    <section>
      <Header title="Explorar" />
      <div className="parent-explore">
        <Link to="/explorar/comidas" className="item-explore">
          <button
            type="button"
            data-testid="explore-food"
          >
            <img src={ meal } alt={ meal } className="img-explore" />
            <br />
            <br />
            Explorar Comidas
          </button>
        </Link>

        <Link to="/explorar/bebidas" className="item-explore">
          <button
            type="button"
            data-testid="explore-drinks"
          >
            <img src={ drink } alt={ drink } className="img-explore" />
            <br />
            <br />
            Explorar Bebidas
          </button>
        </Link>

      </div>
      <Footer />
    </section>
  );
}
