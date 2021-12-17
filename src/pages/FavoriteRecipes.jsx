/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import Header from '../components/Header';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';
import Footer from '../components/Footer';

export default function FavoriteRecipes() {
  const [favoriteRecipe, setFavoriteRecipe] = useState([]);

  const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  useEffect(() => {
    if (!localStorage.favoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    setFavoriteRecipe(recipes);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterBy = (event) => {
    const { target: { innerText } } = event;
    switch (innerText) {
    case 'Food':
      setFavoriteRecipe(recipes.filter((recipe) => recipe.type === 'comida'));
      break;
    case 'Drink':
      setFavoriteRecipe(recipes.filter((recipe) => recipe.type === 'bebida'));
      break;
    default:
      setFavoriteRecipe(recipes);
      break;
    }
  };
  return (
    <div>
      <Header title="Receitas Favoritas" />
      Tela de receitas favoritas
      <div className="btn-categories">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ (event) => filterBy(event) }
        >
          All
        </button>
        <button
          onClick={ (event) => filterBy(event) }
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ (event) => filterBy(event) }
        >
          Drink
        </button>
      </div>
      <div className="done-recipes-container">
        {favoriteRecipe && favoriteRecipe.map((recipe, index) => (
          <FavoriteRecipeCard key={ index } recipe={ recipe } index={ index } />
        ))}
      </div>
      <Footer />
    </div>
  );
}
