import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useLocation } from 'react-router';
import copy from 'clipboard-copy';
import fetchAPI from '../helpers/fetchAPI';
import { useAppContext } from '../context/Provider';
import Recommendations from '../components/Recommendations';

import '../Detail.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FoodDetail() {
  const { loading, setLoading } = useAppContext();
  const { id } = useParams();
  const { pathname } = useLocation();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [clicked, setClicked] = useState(false);
  const [drinkRecomendations, setDrinkRecomendations] = useState([]);

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const isDone = doneRecipes ? doneRecipes
    .filter((obj) => obj.id === id)
    : localStorage.setItem('doneRecipes', JSON.stringify([]));
  const isInProgress = inProgressRecipes ? Object.keys(inProgressRecipes.meals)
    .some((item) => item === id)
    : localStorage
      .setItem('inProgressRecipes', JSON.stringify({ cocktails: {}, meals: {} }));
  const isFavorite = favoriteRecipes ? favoriteRecipes
    .some((obj) => obj.id === id)
    : localStorage.setItem('favoriteRecipes', JSON.stringify([]));

  const ingredients = Object.entries(recipeDetails)
    .filter((p) => p[0].includes('strIngredient') && p[1])
    .map((arr) => arr[1]);
  const measures = Object.entries(recipeDetails)
    .filter((p) => p[0].includes('strMeasure') && p[1])
    .map((arr) => arr[1]);

  useEffect(() => {
    async function getRecipe() {
      const MAX_RECOMENDATIONS = 6;
      setLoading(true);
      const recipe = await fetchAPI('meals', 'details', Number(id));
      const drinksResponse = await fetchAPI('drinks', 'recomendations');
      const recommendedDrinks = await drinksResponse
        .filter((_elem, index) => index < MAX_RECOMENDATIONS);
      setRecipeDetails(recipe[0]);
      setDrinkRecomendations(recommendedDrinks);
      setLoading(false);
    }
    getRecipe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function saveFavorite() {
    const newFavoriteMeal = [
      ...favoriteRecipes,
      {
        id: recipeDetails.idMeal,
        type: 'comida',
        area: recipeDetails.strArea,
        category: recipeDetails.strCategory,
        alcoholicOrNot: '',
        name: recipeDetails.strMeal,
        image: recipeDetails.strMealThumb,
      },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteMeal));
  }

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <h1 data-testid="recipe-title">{ recipeDetails.strMeal }</h1>
      <img
        data-testid="recipe-photo"
        src={ recipeDetails.strMealThumb }
        alt={ `${recipeDetails.strMeal} Recipe` }
        width={ 200 }
      />
      <div>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => {
            copy(`http://localhost:3000${pathname}`);
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
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="favorite icon"
          />
        </button>
      </div>
      <h2 data-testid="recipe-category">{ recipeDetails.strCategory }</h2>
      <ul>
        { ingredients && ingredients.map((ingredient, index) => (
          <li key={ ingredient } data-testid={ `${index}-ingredient-name-and-measure` }>
            { ingredients[index] + measures[index] }
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{ recipeDetails.strInstructions }</p>
      <iframe
        data-testid="video"
        width="560"
        height="315"
        src={ `https://www.youtube.com/embed/${recipeDetails.strYoutube.split('=')[1]}` }
        title="YouTube video player"
      />
      <Recommendations items={ drinkRecomendations } />
      { isDone && (
        <Link to={ `/comidas/${recipeDetails.idMeal}/in-progress` }>
          <button
            className="iniciar-receita"
            type="button"
            data-testid="start-recipe-btn"
          >
            { isInProgress ? 'Continuar Receita' : 'Iniciar Receita' }
          </button>
        </Link>)}
    </div>
  );
}
