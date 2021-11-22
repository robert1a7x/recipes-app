import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useLocation } from 'react-router';
import copy from 'clipboard-copy';
import fetchAPI from '../helpers/fetchAPI';
import { useAppContext } from '../context/Provider';
import Recommendations from '../components/Recommendations';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

import '../style/Detail.css';

export default function FoodDetail() {
  const { loading, setLoading } = useAppContext();
  const { id } = useParams();
  const { pathname } = useLocation();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [clicked, setClicked] = useState(false);
  const [favorite, setFavorite] = useState();
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
      setFavorite(isFavorite);
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
    setFavorite(!favorite);
  }

  function saveInProgressRecipe() {
    const newInProgressMeal = {
      ...inProgressRecipes,
      meals: {
        ...inProgressRecipes.meals,
        [id]: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgressMeal));
  }

  if (loading) {
    return (
      <section className="parente-loading">
        <div className="loading" />
      </section>);
  }
  return (
    <section className="parent-details">
      <h1
        data-testid="recipe-title"
        className="title-detail"
      >
        { recipeDetails.strMeal }
      </h1>
      <section className="container-details">
        <div className="item-details">
          <img
            className="recipe-photo"
            data-testid="recipe-photo"
            src={ recipeDetails.strMealThumb }
            alt={ `${recipeDetails.strMeal} Recipe` }
            width={ 200 }
          />
          <p data-testid="recipe-category">{ recipeDetails.strCategory }</p>
          <br />
          <button
            className="icons"
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
            className="icons"
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
        <ul className="item-details">
          { ingredients && ingredients.map((ingredient, index) => (
            <li
              key={ ingredient }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { `${ingredients[index]} - ${measures[index]}` }
            </li>
          ))}
        </ul>
        <p
          data-testid="instructions"
          className="item-details"
        >
          { recipeDetails.strInstructions }

        </p>
      </section>
      <section className="video-detail">
        { recipeDetails.strYoutube
          && <iframe
            data-testid="video"
            width="560"
            height="315"
            src={ `https://www.youtube.com/embed/${recipeDetails.strYoutube.split('=')[1]}` }
            title="YouTube video player"
          /> }

      </section>
      <Recommendations items={ drinkRecomendations } />
      { isDone && (
        <Link to={ `/comidas/${recipeDetails.idMeal}/in-progress` }>
          <button
            className="btn-action"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => saveInProgressRecipe() }
          >
            { isInProgress ? 'Continuar Receita' : 'Iniciar Receita' }
          </button>
        </Link>)}

    </section>
  );
}
