import React, { useState, useEffect } from 'react';
import DoneRecipeCard from '../components/DoneRecipeCard';
import Header from '../components/Header';

const doneRecipesArray = [
  {
    id: '52771',
    type: 'comida',
    area: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

export default function CompleteRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));

  useEffect(() => {
    if (!localStorage.doneRecipes) {
      localStorage.setItem('doneRecipes', JSON.stringify([doneRecipesArray]));
    }
    setDoneRecipes(recipes);
  }, []);

  const filterBy = (event) => {
    const { target: { innerText } } = event;
    switch (innerText) {
    case 'Food':
      setDoneRecipes(recipes.filter((recipe) => recipe.type === 'comida'));
      break;
    case 'Drink':
      setDoneRecipes(recipes.filter((recipe) => recipe.type === 'bebida'));
      break;
    default:
      setDoneRecipes(recipes);
      break;
    }
  };

  return (
    <div>
      <Header title="Receitas Feitas" />
      Tela de receitas prontas
      <div>
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
      { doneRecipes && doneRecipes.map((recipe, index) => (
        <DoneRecipeCard key={ index } recipe={ recipe } index={ index } />
      )) }
    </div>
  );
}
