import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useLocation } from 'react-router';
import copy from 'clipboard-copy';
import { useAppContext } from '../context/Provider';

import '../Detail.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import fetchAPI from '../helpers/fetchAPI';

export default function FoodInProgress() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [favorite, setFavorite] = useState();
  const { loading, setLoading } = useAppContext();

  // const usedIngredients = JSON.parse(localStorage.getItem('inProgressRecipes')).meals[id];
  // console.log(usedIngredients);
  // console.log(recipeInfo);

  // const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  // const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const ingredients = Object.entries(recipeInfo)
    .filter((p) => p[0].includes('strIngredient') && p[1])
    .map((arr) => arr[1]);
  const measures = Object.entries(recipeInfo)
    .filter((p) => p[0].includes('strMeasure') && p[1])
    .map((arr) => arr[1]);

  useEffect(() => {
    async function getRecipe() {
      setLoading(true);
      const recipe = await fetchAPI('meals', 'details', Number(id));
      setRecipeInfo(recipe[0]);
      setLoading(false);
    }
    getRecipe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function saveFavorite() {
    const newFavoriteMeal = [
      ...favoriteRecipes,
      {
        id: recipeInfo.idMeal,
        type: 'comida',
        area: recipeInfo.strArea,
        category: recipeInfo.strCategory,
        alcoholicOrNot: '',
        name: recipeInfo.strMeal,
        image: recipeInfo.strMealThumb,
      },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteMeal));
    setFavorite(!favorite);
  }

  const checkedIngredient = () => {

  };

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <h1 data-testid="recipe-title">{ recipeInfo.strMeal }</h1>
      <img
        data-testid="recipe-photo"
        src={ recipeInfo.strMealThumb }
        alt={ `${recipeInfo.strMeal} Recipe` }
        width={ 200 }
      />
      <div>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => {
            copy(`https://localhost:${pathname}`);
            setClicked(true);
          } }
        >
          { clicked ? 'Link copiado!' : <img src={ shareIcon } alt="Share icon" /> }
        </button>
        <button
          type="button"
          onClick={ () => saveFavorite() }
        >
          <img
            data-testid="favorite-btn"
            src={ favorite ? blackHeartIcon : whiteHeartIcon }
            alt="favorite icon"
          />
        </button>
      </div>
      <h2 data-testid="recipe-category">{ recipeInfo.strCategory }</h2>
      <ul>
        { ingredients && ingredients.map((ingredient, index) => (
          <li key={ ingredient } data-testid={ `${index}-ingredient-step` }>
            <label
              htmlFor={ ingredient }
            >
              <input
                className="checkbox"
                type="checkbox"
                id={ ingredient }
                onClick={ checkedIngredient }
              />
              { `${ingredients[index]}  ${measures[index]}` }
            </label>
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{ recipeInfo.strInstructions }</p>
      <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>
  );
}
// function checkedIngredient(ingredientName) {
//   const newIngredients = ingredients.map(({ name, measure, checked }) => {
//     if (name === ingredientName) {
//       return { name, measure, checked: !checked };
//     }
//     return { name, measure, checked };
//   });
//   setIngredients(newIngredients);
//   setLocalStorage(newIngredients);
// }
