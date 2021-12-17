import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import fetchAPI from '../helpers/fetchAPI';
import { useAppContext } from '../context/Provider';

import '../style/Footer.css';

export default function Footer() {
  const { setData } = useAppContext();

  const filterFood = async () => {
    setData(await fetchAPI('meals', 'name', ''));
  }
  
  const filterDrink = async () => {
    setData(await fetchAPI('drinks', 'name', ''));
  }

  return (
    <footer className="footer" data-testid="footer">
      <Link
        onClick={ filterDrink }
        to="/bebidas"
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
      >
        <img src={ drinkIcon } alt="drink-icon" />
      </Link>
      <Link
        to="/explorar"
        data-testid="explore-bottom-btn"
        src={ exploreIcon }
      >
        <img src={ exploreIcon } alt="explore-icon" />
      </Link>
      <Link
        onClick={ filterFood }
        to="/comidas"
        data-testid="food-bottom-btn"
        src={ mealIcon }
      >
        <img src={ mealIcon } alt="meal-icon" />
      </Link>
    </footer>
  );
}
