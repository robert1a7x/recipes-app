import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/bebidas" data-testid="drinks-bottom-btn">
        <img src="../images/drinkIcon.svg" alt="drink-icon" />
      </Link>
      <Link to="/explorar" data-testid="explore-bottom-btn">
        <img src="../images/exploreIcon.svg" alt="explore-icon" />
      </Link>
      <Link to="/comidas" data-testid="food-bottom-btn">
        <img src="../images/mealIcon.svg" alt="meal-icon" />
      </Link>
    </footer>
  );
}
